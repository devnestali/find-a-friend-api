import { FetchPetsUseCase } from "@/domain/adoption/application/use-cases/fetch-pets.js";
import { PrismaPetsRepository } from "@/infra/repositories/prisma-pets.repository.js";

export function makeFetchPetsController() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const fetchPetsUseCase = new FetchPetsUseCase(prismaPetsRepository);

  return fetchPetsUseCase;
}
