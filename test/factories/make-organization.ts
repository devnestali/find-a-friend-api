import type { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import {
  Organization,
  type OrganizationProps,
} from "@/domain/adoption/enterprise/entities/organization.js";
import { CepCode } from "@/domain/adoption/enterprise/entities/value-objects/cep-code.js";
import { NotValid } from "@/domain/adoption/enterprise/entities/value-objects/errors/not-valid.js";
import { PhoneNumber } from "@/domain/adoption/enterprise/entities/value-objects/phone-number.js";

export function makeOrganization(
  override: Partial<OrganizationProps> = {},
  id?: UniqueEntityId,
) {
  const defaultPhoneNumber = PhoneNumber.create("11111111111");
  const defaultCep = CepCode.create("12345678");

  if (defaultPhoneNumber instanceof NotValid) {
    return defaultPhoneNumber;
  }

  if (defaultCep instanceof NotValid) {
    return defaultCep;
  }

  const organization = Organization.create(
    {
      responsiblePersonName: "John Doe",
      email: "johndoe@example.com",
      address: "First Street, 123",
      password: "123456",
      phoneNumber: defaultPhoneNumber,
      cep: defaultCep,
      ...override,
    },
    id,
  );

  return organization;
}
