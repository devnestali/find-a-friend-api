import { Organization } from "../../enterprise/entities/organization.js";
import { CepCode } from "../../enterprise/entities/value-objects/cep-code.js";
import { NotValid } from "../../enterprise/entities/value-objects/errors/not-valid.js";
import { PasswordDoesNotMatch } from "./errors/password-does-not-match.js";
import { PhoneNumber } from "../../enterprise/entities/value-objects/phone-number.js";
import type { OrganizationsRepository } from "../repositories/organization.repository.js";

interface CreateOrganizationUseCaseRequest {
  responsiblePersonName: string;
  email: string;
  cep: string;
  address: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
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
    confirmPassword,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const cepCode = CepCode.create(cep);

    if (cepCode instanceof NotValid) {
      return cepCode;
    }

    const phone = PhoneNumber.create(phoneNumber);

    if (phone instanceof NotValid) {
      return phone;
    }

    if (password !== confirmPassword) {
      return new PasswordDoesNotMatch();
    }

    const organization = Organization.create({
      responsiblePersonName,
      email,
      cep: cepCode,
      address,
      phoneNumber: phone,
      password,
      confirmPassword,
    });

    if (organization instanceof PasswordDoesNotMatch) {
      return organization;
    }

    await this.organizationRepository.create(organization);

    return {
      organization,
    };
  }
}
