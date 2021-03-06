import { IContactPerson } from 'types';

export interface IEnterprise {
  enterpriseId: string;
  enterpriseName: string;
  enterpriseDescription: string;
  enterpriseUrl: string;
  contactPerson: IContactPerson;
  createdAt: Date;
  updatedAt: Date;
}
