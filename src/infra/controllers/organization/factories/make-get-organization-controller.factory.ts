import { GetOrganizationUseCase } from "@/domain/adoption/application/use-cases/get-organization.js";
import { PrismaOrganizationsRepository } from "@/infra/repositories/prisma-organizations.repository.js";

export function makeGetOrganizationController() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const getOrganizationUseCase = new GetOrganizationUseCase(
    prismaOrganizationsRepository,
  );

  return getOrganizationUseCase;
}
