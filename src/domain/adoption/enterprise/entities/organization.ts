import { Entity } from "@/core/entities/entity.js";
import type { CepCode } from "./value-objects/cep-code.js";
import type { PhoneNumber } from "./value-objects/phone-number.js";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id.js";

export interface OrganizationProps {
  responsiblePersonName: string;
  email: string;
  cep: CepCode;
  address: string;
  phoneNumber: PhoneNumber;
  password: string;
  confirmPassword: string;
}

export class Organization extends Entity<OrganizationProps> {
  get responsiblePersonName() {
    return this.props.responsiblePersonName;
  }

  get email() {
    return this.props.email;
  }

  get cep() {
    return this.props.cep;
  }

  get address() {
    return this.props.address;
  }

  get phoneNumber() {
    return this.props.phoneNumber;
  }

  get password() {
    return this.props.password;
  }

  get confirmPassword() {
    return this.props.confirmPassword;
  }

  static create(props: OrganizationProps, id?: UniqueEntityId) {
    const organization = new Organization(props, id);

    return organization;
  }
}
