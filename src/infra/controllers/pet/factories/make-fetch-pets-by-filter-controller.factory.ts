import { FetchPetsByFilterUseCase } from "@/domain/adoption/application/use-cases/fetch-pets-by-filter.js";
import { PrismaPetsRepository } from "@/infra/repositories/prisma-pets.repository.js";

export function makeFetchPetsByFilterController() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const fetchPetsByFilterUseCase = new FetchPetsByFilterUseCase(
    prismaPetsRepository,
  );

  return fetchPetsByFilterUseCase;
}
