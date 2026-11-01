import type { EnergyLevels } from "../../enterprise/entities/enums/pet-energy-levels.js";
import type { IndependenceLevels } from "../../enterprise/entities/enums/pet-independence-levels.js";
import type { PetSize } from "../../enterprise/entities/enums/pet-size.js";
import type { SuitableEnvironments } from "../../enterprise/entities/enums/pet-suitable-environments.js";
import type { Pet } from "../../enterprise/entities/pet.js";

export interface FindManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface FindManyByFilterParams {
  age?: number;
  petSize?: PetSize;
  energyLevel?: EnergyLevels;
  independenceLevel?: IndependenceLevels;
  suitableEnvironment?: SuitableEnvironments;
}

export interface PetsRepository {
  create: (pet: Pet) => Promise<void>;
  findManyNearby: (params: FindManyNearbyParams) => Promise<Pet[]>;
  findMany: () => Promise<Pet[]>;
  findManyByFilter: (params: FindManyByFilterParams) => Promise<Pet[]>;
}
