import { PrismaOrganizationsRepository } from "@/infra/repositories/prisma-organizations.repository.js";
import { AuthenticateOrganizationUseCase } from "@/domain/adoption/application/use-cases/authenticate-organization.js";

export function makeAuthenticateOrganizationController() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const authenticateOrganizationUseCase = new AuthenticateOrganizationUseCase(
    prismaOrganizationsRepository,
  );

  return authenticateOrganizationUseCase;
}
