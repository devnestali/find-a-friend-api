import type { EnergyLevels } from "../../enterprise/entities/enums/pet-energy-levels.js";
import type { IndependenceLevels } from "../../enterprise/entities/enums/pet-independence-levels.js";
import type { PetSize } from "../../enterprise/entities/enums/pet-size.js";
import type { SuitableEnvironments } from "../../enterprise/entities/enums/pet-suitable-environments.js";
import type { Pet } from "../../enterprise/entities/pet.js";
import type { PetsRepository } from "../repositories/pet.repository.js";

interface FetchPetsByFilterRequest {
  age?: number;
  petSize?: PetSize;
  energyLevel?: EnergyLevels;
  independenceLevel?: IndependenceLevels;
  suitableEnvironment?: SuitableEnvironments;
}

interface FetchPetsByFilterResponse {
  pets: Pet[];
}

export class FetchPetsByFilterUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    params: FetchPetsByFilterRequest,
  ): Promise<FetchPetsByFilterResponse> {
    const pets = await this.petsRepository.findManyByFilter(params);

    return {
      pets,
    };
  }
}
