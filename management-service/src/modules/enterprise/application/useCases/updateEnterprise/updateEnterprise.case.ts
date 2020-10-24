import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { UpdateEnterpriseErrors } from './updateEnterprise.errors';
import { UpdateEnterpriseDto } from './updateEnterprise.dto';
import { EnterpriseRepository } from '../../../adapter';

export type UpdateEnterpriseResponse = Either<
  | AppError.UnexpectedError
  | AppError.ValidationError
  | UpdateEnterpriseErrors.EnterpriseNotFoundError,
  Result<void>
>;

@Injectable()
export class UpdateEnterpriseCase
  implements UseCase<UpdateEnterpriseDto, Promise<UpdateEnterpriseResponse>> {
  constructor(
    @InjectRepository(EnterpriseRepository)
    private repository: EnterpriseRepository,
  ) {}

  async execute(
    dto: UpdateEnterpriseDto,
    enterpriseId: string,
  ): Promise<UpdateEnterpriseResponse> {
    try {
      try {
        await this.repository.exists(enterpriseId);
      } catch {
        return left(
          new UpdateEnterpriseErrors.EnterpriseNotFoundError(enterpriseId),
        );
      }

      await this.repository.persistDto(enterpriseId, dto);
      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}