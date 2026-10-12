import type { Pet } from "../../enterprise/entities/pet.js";
import type { PetsRepository } from "../repositories/pet.repository.js";
import { NotFoundPetsNearby } from "./errors/not-found-pets-nearby.js";

interface FetchNearbyPetsUseCaseRequest {
  cityLatitude: number;
  cityLongitude: number;
}

interface FetchNearbyPetsUseCaseResponse {
  pets: Pet[];
}

export class FetchNearbyPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    cityLatitude,
    cityLongitude,
  }: FetchNearbyPetsUseCaseRequest): Promise<
    FetchNearbyPetsUseCaseResponse | NotFoundPetsNearby
  > {
    const pets = await this.petsRepository.findManyNearby({
      latitude: cityLatitude,
      longitude: cityLongitude,
    });

    if (pets.length === 0) {
      return new NotFoundPetsNearby();
    }

    return {
      pets,
    };
  }
}
