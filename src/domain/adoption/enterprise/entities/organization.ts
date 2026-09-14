import { Entity } from "@/core/entities/entity.js";
import type { CepCode } from "./value-objects/cep-code.js";
import type { PhoneNumber } from "./value-objects/phone-number.js";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id.js";

interface OrganizationProps {
  responsiblePersonName: string;
  email: string;
  cep: CepCode;
  address: string;
  phoneNumber: PhoneNumber;
  password: string;
  confirmPassword: string;
}

export class Organization extends Entity<OrganizationProps> {
  static create(props: OrganizationProps, id?: UniqueEntityId) {
    const organization = new Organization(props, id);

    return organization;
  }
}
