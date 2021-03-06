import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseModule } from 'database';
import { AmqpModule } from 'amqp';

import { providers } from './facility.providers';
import { EnterpriseModule } from '../enterprise/enterprise.module';

import { CreateFacilityHandler } from './application/command/createFacility';
import { UpdateFacilityHandler } from './application/command/updateFacility';
import { RemoveFacilityHandler } from './application/command/removeFacility';
import { AddOfferHandler } from './application/command/addOffer';
import { RemoveOfferHandler } from './application/command/removeOffer';
import { AddEmployeeHandler } from './application/command/addEmployee';
import { RemoveEmployeeHandler } from './application/command/removeEmployee';
import { ActivateOfferHandler } from './application/command/activateOffer';
import { DeactivateOfferHandler } from './application/command/deactivateOffer';
import { ActivateEmployeeHandler } from './application/command/activateEmployee';
import { DeactivateEmployeeHandler } from './application/command/deactivateEmployee';

import { GetEmployeeHandler } from './application/query/getEmployee';
import { GetEmployeesHandler } from './application/query/getEmployees';
import { GetFacilityByIdHandler } from './application/query/getFacilityById';
import { GetFacilityBySlugHandler } from './application/query/getFacilityBySlug';
import { GetFacilitiesHandler } from './application/query/getFacilities';
import { GetOfferHandler } from './application/query/getOffer';
import { GetOffersHandler } from './application/query/getOffers';

import {
  ActivateEmployeeController,
  ActivateOfferController,
  AddEmployeeController,
  AddOfferController,
  CreateFacilityController,
  DeactivateEmployeeController,
  DeactivateOfferController,
  RemoveEmployeeController,
  RemoveFacilityController,
  RemoveOfferController,
  UpdateFacilityController,
} from './api/controllers/command';

import {
  GetEmployeeController,
  GetEmployeesController,
  GetFacilitiesController,
  GetFacilityByIdController,
  GetFacilityBySlugController,
  GetOfferController,
  GetOffersController,
} from './api/controllers/query';

@Module({
  imports: [CqrsModule, EnterpriseModule, DatabaseModule, AmqpModule],
  controllers: [
    CreateFacilityController,
    UpdateFacilityController,
    RemoveFacilityController,
    AddOfferController,
    RemoveOfferController,
    AddEmployeeController,
    RemoveEmployeeController,
    ActivateOfferController,
    DeactivateOfferController,
    ActivateEmployeeController,
    DeactivateEmployeeController,
    GetFacilityByIdController,
    GetFacilityBySlugController,
    GetFacilitiesController,
    GetOfferController,
    GetOffersController,
    GetEmployeesController,
    GetEmployeeController,
  ],
  providers: [
    CreateFacilityHandler,
    UpdateFacilityHandler,
    RemoveFacilityHandler,
    AddOfferHandler,
    RemoveOfferHandler,
    AddEmployeeHandler,
    RemoveEmployeeHandler,
    ActivateOfferHandler,
    DeactivateOfferHandler,
    ActivateEmployeeHandler,
    DeactivateEmployeeHandler,
    GetEmployeeHandler,
    GetEmployeesHandler,
    GetFacilityByIdHandler,
    GetFacilityBySlugHandler,
    GetFacilitiesHandler,
    GetOfferHandler,
    GetOffersHandler,
    ...providers,
  ],
  exports: [providers[0]],
})
export class FacilityModule {}
