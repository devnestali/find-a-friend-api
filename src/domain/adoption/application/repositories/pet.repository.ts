import type { Pet } from "../../enterprise/entities/pet.js";

export interface PetsRepository {
  create: (pet: Pet) => Promise<void>;
}
