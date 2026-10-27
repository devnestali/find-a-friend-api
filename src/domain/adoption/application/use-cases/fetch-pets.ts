import type { Pet } from "../../enterprise/entities/pet.js";
import type { PetsRepository } from "../repositories/pet.repository.js";

interface FetchPetsUseCaseRequest {}

interface FetchPetsUseCaseResponse {
  pets: Pet[];
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({}: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findMany();

    return {
      pets,
    };
  }
}
