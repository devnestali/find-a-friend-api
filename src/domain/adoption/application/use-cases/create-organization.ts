import { hash } from "bcrypt";
import type { OrganizationsRepository } from "../repositories/organization.repository.js";

import { EmailAlreadyExists } from "./errors/email-already-exists.js";

import { Organization } from "../../enterprise/entities/organization.js";
import { CepCode } from "../../enterprise/entities/value-objects/cep-code.js";
import { NotValid } from "../../enterprise/entities/value-objects/errors/not-valid.js";
import { PhoneNumber } from "../../enterprise/entities/value-objects/phone-number.js";

interface CreateOrganizationUseCaseRequest {
  responsiblePersonName: string;
  email: string;
  cep: string;
  address: string;
  phoneNumber: string;
  password: string;
}

interface CreateOrganizationUseCaseResponse {}

export class CreateOrganizationUseCase {
  constructor(private organizationRepository: OrganizationsRepository) {}

  async execute({
    responsiblePersonName,
    email,
    cep,
    address,
    phoneNumber,
    password,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const emailAlreadyExists =
      await this.organizationRepository.findByEmail(email);

    if (emailAlreadyExists) {
      return new EmailAlreadyExists();
    }

    const cepCode = CepCode.create(cep);

    if (cepCode instanceof NotValid) {
      return cepCode;
    }

    const phone = PhoneNumber.create(phoneNumber);

    if (phone instanceof NotValid) {
      return phone;
    }

    const hashedPassword = await hash(password, 8);

    const organization = Organization.create({
      responsiblePersonName,
      email,
      cep: cepCode,
      address,
      phoneNumber: phone,
      password: hashedPassword,
    });

    await this.organizationRepository.create(organization);

    return {
      organization,
    };
  }
}
