import { compare } from "bcrypt";
import type { Organization } from "../../enterprise/entities/organization.js";
import type { OrganizationsRepository } from "../repositories/organization.repository.js";
import { ResourceNotFound } from "./errors/resource-not-found.js";
import { PasswordDoesNotMatch } from "./errors/password-does-not-match.js";
import { InvalidCredentials } from "./errors/invalid-credentials.js";

interface AuthenticateOrganizationUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateOrganizationUseCaseResponse {
  organization: Organization;
}

export class AuthenticateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrganizationUseCaseRequest): Promise<
    AuthenticateOrganizationUseCaseResponse | InvalidCredentials
  > {
    const organization = await this.organizationsRepository.findByEmail(email);

    if (!organization) {
      return new InvalidCredentials();
    }

    const doesPasswordsMatches = await compare(password, organization.password);

    if (!doesPasswordsMatches) {
      return new InvalidCredentials();
    }

    return {
      organization,
    };
  }
}
