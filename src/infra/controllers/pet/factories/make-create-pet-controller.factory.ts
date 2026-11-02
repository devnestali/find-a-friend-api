import { CreatePetUseCase } from "@/domain/adoption/application/use-cases/create-pet.js";
import { PrismaOrganizationsRepository } from "@/infra/repositories/prisma-organizations.repository.js";
import { PrismaPetsRepository } from "@/infra/repositories/prisma-pets.repository.js";

export function makeCreatePetController() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const prismaPetsRepository = new PrismaPetsRepository();

  const createPetUseCase = new CreatePetUseCase(
    prismaOrganizationsRepository,
    prismaPetsRepository,
  );

  return createPetUseCase;
}
