import { FetchNearbyPetsUseCase } from "@/domain/adoption/application/use-cases/fetch-nearby-pets.js";
import { PrismaPetsRepository } from "@/infra/repositories/prisma-pets.repository.js";

export function makeFetchNearbyPetsController() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const fetchNearbyPetsUseCase = new FetchNearbyPetsUseCase(
    prismaPetsRepository,
  );

  return fetchNearbyPetsUseCase;
}
