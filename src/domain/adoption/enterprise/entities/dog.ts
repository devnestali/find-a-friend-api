import { Entity } from "@/core/entities/entity.js";
import { EnergyLevels } from "./enums/dog-energy-levels.js";

import type { UniqueEntityId } from "@/core/entities/unique-entity-id.js";

import type { DogSizeParams } from "./types/dog-size.js";
import type { IndependenceLevels } from "./enums/dog-independence-levels.js";
import type { SuitableEnvironments } from "./enums/dog-suitable-environments.js";

interface DogProps {
  organizationId: UniqueEntityId;
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
  get organizationId() {
    return this.props.organizationId;
  }

  get name() {
    return this.props.name;
  }

  get about() {
    return this.props.about;
  }

  get age() {
    return this.props.age;
  }

  get dogSize() {
    return this.props.dogSize;
  }

  get energyLevel() {
    return this.props.energyLevel;
  }

  get independencyLevel() {
    return this.props.independenceLevel;
  }

  get suitableEnvironment() {
    return this.props.suitableEnvironment;
  }

  get photos() {
    return this.props.photos;
  }

  get adoptionRequirements() {
    return this.props.adoptionRequirements;
  }

  static create(props: DogProps, id?: UniqueEntityId) {
    const dog = new Dog(props, id);

    return dog;
  }
}
