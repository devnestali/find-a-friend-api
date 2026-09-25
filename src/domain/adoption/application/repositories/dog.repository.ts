import type { Dog } from "../../enterprise/entities/dog.js";

export interface DogsRepository {
  create: (dog: Dog) => Promise<void>;
}
