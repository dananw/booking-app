import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm/index';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import {
  EmployeeId,
  EmployeeRepository,
  Facility,
  FacilityRepository,
} from '../../../domain';
import { AddEmployeeErrors } from './AddEmployee.errors';
import { AddEmployeeCommand } from './AddEmployee.command';
import { EmployeeMap } from '../../../adapter';
import { FacilityKeys } from '../../../FacilityKeys';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { IAmqpService } from '../../../../../amqp';
import { EmployeeAddedEvent, FacilitiesEvent } from '../../../domain/events';
import { EmployeeTransformer } from '../../../infra';

export type AddEmployeeResponse = Either<
  | AppError.ValidationError
  | AppError.UnexpectedError
  | AddEmployeeErrors.FacilityNotFoundError,
  Result<EmployeeId>
>;

@CommandHandler(AddEmployeeCommand)
export class AddEmployeeHandler
  implements ICommandHandler<AddEmployeeCommand, AddEmployeeResponse> {
  constructor(
    @Inject(InfrastructureKeys.DbService)
    private connection: Connection,
    @Inject(InfrastructureKeys.AmqpService)
    private amqpService: IAmqpService,
    @Inject(FacilityKeys.FacilityRepository)
    private facilityRepository: FacilityRepository,
    @Inject(FacilityKeys.EmployeeRepository)
    private employeeRepository: EmployeeRepository,
  ) {}

  async execute({
    facilityId,
    dto,
  }: AddEmployeeCommand): Promise<AddEmployeeResponse> {
    const queryRunner = this.connection.createQueryRunner();

    let facility: Facility;

    try {
      try {
        facility = await this.facilityRepository.getFacilityById(facilityId);
      } catch {
        return left(new AddEmployeeErrors.FacilityNotFoundError());
      }

      const employeeOrError = EmployeeMap.dtoToDomain(dto, facilityId);

      if (!employeeOrError.isSuccess) {
        return left(Result.fail(employeeOrError.error));
      }

      const employee = employeeOrError.getValue();
      facility.addEmployee(employee);

      await queryRunner.connect();
      await queryRunner.startTransaction();

      const employeeEntity = await this.employeeRepository.persist(employee);
      await queryRunner.manager.save(employeeEntity);
      await queryRunner.manager.save(
        await this.facilityRepository.persist(facility),
      );

      await this.amqpService.sendMessage(
        new EmployeeAddedEvent(EmployeeTransformer.toDto(employeeEntity)),
        FacilitiesEvent.EmployeeAdded,
      );

      await queryRunner.commitTransaction();

      return right(Result.ok(employee.employeeId));
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return left(new AppError.UnexpectedError(err));
    } finally {
      await queryRunner.release();
    }
  }
}
