import type { Pet } from "../../enterprise/entities/pet.js";
import type { PetsRepository } from "../repositories/pet.repository.js";
import { ResourceNotFound } from "./errors/resource-not-found.js";

interface FetchPetByIdUseCaseRequest {
  id: string;
}

export interface FetchPetByIdUseCaseResponse {
  pet: Pet;
}

export class FetchPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: FetchPetByIdUseCaseRequest): Promise<
    FetchPetByIdUseCaseResponse | ResourceNotFound
  > {
    const pet = await this.petsRepository.findById(id);

    if (!pet) {
      return new ResourceNotFound();
    }

    return {
      pet,
    };
  }
}
