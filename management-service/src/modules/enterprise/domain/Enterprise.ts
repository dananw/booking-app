import { Entity, UniqueEntityID, Link, ContactPerson } from 'shared/domain';
import { Result } from 'shared/core';

import { EnterpriseName } from './EnterpriseName';
import { EnterpriseDescription } from './EnterpriseDescription';
import { EnterpriseId } from './EnterpriseId';

interface IProps {
  // isActive: boolean;
  enterpriseName: EnterpriseName;
  enterpriseDescription: EnterpriseDescription;
  enterpriseUrl: Link;
  contactPerson: ContactPerson;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Enterprise extends Entity<IProps> {
  get enterpriseId() {
    return EnterpriseId.create(this._id).getValue();
  }

  get enterpriseName() {
    return this.props.enterpriseName;
  }

  get enterpriseDescription() {
    return this.props.enterpriseDescription;
  }

  get enterpriseUrl() {
    return this.props.enterpriseUrl;
  }

  get contactPerson() {
    return this.props.contactPerson;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  public static create(props: IProps, id?: UniqueEntityID): Result<Enterprise> {
    return Result.ok(new Enterprise(props, id));
  }
}
