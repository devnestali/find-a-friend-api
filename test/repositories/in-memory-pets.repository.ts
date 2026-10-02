import type { PetsRepository } from "@/domain/adoption/application/repositories/pet.repository.js";
import type { Pet } from "@/domain/adoption/enterprise/entities/pet.js";

export class InMemoryPetsRepository implements PetsRepository {
  public readonly items: Pet[] = [];

  async create(pet: Pet): Promise<void> {
    this.items.push(pet);
  }
}
