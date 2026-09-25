import type { DogsRepository } from "@/domain/adoption/application/repositories/dog.repository.js";
import type { Dog } from "@/domain/adoption/enterprise/entities/dog.js";

export class InMemoryDogsRepository implements DogsRepository {
  public readonly items: Dog[] = [];

  async create(dog: Dog): Promise<void> {
    this.items.push(dog);
  }
}
