import { Entity } from "@/core/entities/entity.js";
import type { CepCode } from "./value-objects/cep-code.js";
import type { PhoneNumber } from "./value-objects/phone-number.js";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import type { Optional } from "@/core/types/optional.js";

export interface OrganizationProps {
  responsiblePersonName: string;
  email: string;
  cep: CepCode;
  address: string;
  phoneNumber: PhoneNumber;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
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

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set responsiblePersonName(responsiblePersonName: string) {
    this.props.responsiblePersonName = responsiblePersonName;
  }

  set email(email: string) {
    this.props.email = email;
  }

  static create(
    props: Optional<OrganizationProps, "createdAt" | "updatedAt">,
    id?: UniqueEntityId,
  ) {
    const organization = new Organization(props, id);

    return organization;
  }
}
