import type { Organization as PrismaOrganization } from "@/generated/prisma/client.js";

import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { Organization } from "@/domain/adoption/enterprise/entities/organization.js";
import { CepCode } from "@/domain/adoption/enterprise/entities/value-objects/cep-code.js";
import { NotValid } from "@/domain/adoption/enterprise/entities/value-objects/errors/not-valid.js";
import { PhoneNumber } from "@/domain/adoption/enterprise/entities/value-objects/phone-number.js";

export class OrganizationMapper {
  static prismaToDomain(raw: PrismaOrganization): Organization {
    const cep = CepCode.create(raw.cep);
    const phoneNumber = PhoneNumber.create(raw.phoneNumber);

    if (cep instanceof NotValid) {
      throw cep;
    }

    if (phoneNumber instanceof NotValid) {
      throw phoneNumber;
    }

    return Organization.create(
      {
        responsiblePersonName: raw.responsiblePersonName,
        email: raw.email,
        address: raw.address,
        cep,
        phoneNumber,
        password: raw.password,
      },
      new UniqueEntityId(raw.id),
    );
  }
}
