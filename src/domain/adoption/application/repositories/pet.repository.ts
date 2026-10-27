import type { Pet } from "../../enterprise/entities/pet.js";

export interface FindManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface PetsRepository {
  create: (pet: Pet) => Promise<void>;
  findManyNearby: (params: FindManyNearbyParams) => Promise<Pet[]>;
  findMany: () => Promise<Pet[]>;
}
