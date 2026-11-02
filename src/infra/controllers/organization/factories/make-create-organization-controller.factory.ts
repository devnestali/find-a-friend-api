import { CreateOrganizationUseCase } from "@/domain/adoption/application/use-cases/create-organization.js";
import { PrismaOrganizationsRepository } from "@/infra/repositories/prisma-organizations.repository.js";

export function makeCreateOrganizationController() {
  const organizationsRepository = new PrismaOrganizationsRepository();
  const createOrganizationUseCase = new CreateOrganizationUseCase(
    organizationsRepository,
  );

  return createOrganizationUseCase;
}
