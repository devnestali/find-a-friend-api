import { Entity } from "@/core/entities/entity.js";
import { EnergyLevels } from "./enums/dog-energy-levels.js";

import type { UniqueEntityId } from "@/core/entities/unique-entity-id.js";

import type { DogSizeParams } from "./types/dog-size.js";
import type { IndependenceLevels } from "./enums/dog-independence-levels.js";
import type { SuitableEnvironments } from "./enums/dog-suitable-environments.js";

interface DogProps {
  name: string;
  about: string;
  age: number;
  dogSize: DogSizeParams;
  energyLevel: EnergyLevels;
  independenceLevel: IndependenceLevels;
  suitableEnvironment: SuitableEnvironments;
  photos: string[];
  adoptionRequirements: string[];
}

export class Dog extends Entity<DogProps> {
  static create(props: DogProps, id?: UniqueEntityId) {
    const dog = new Dog(props, id);

    return dog;
  }
}
