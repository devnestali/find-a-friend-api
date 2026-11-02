import { FetchPetByIdUseCase } from "@/domain/adoption/application/use-cases/fetch-pet-by-id.js";
import { PrismaPetsRepository } from "@/infra/repositories/prisma-pets.repository.js";

export function makeFetchByIdController() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const fetchByIdUseCase = new FetchPetByIdUseCase(prismaPetsRepository);

  return fetchByIdUseCase;
}
