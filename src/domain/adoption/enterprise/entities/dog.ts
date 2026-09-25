import { Entity } from "@/core/entities/entity.js";
import { EnergyLevels } from "./enums/dog-energy-levels.js";

import type { UniqueEntityId } from "@/core/entities/unique-entity-id.js";

import type { DogSizeParams } from "./types/dog-size.js";
import type { IndependenceLevels } from "./enums/dog-independence-levels.js";
import type { SuitableEnvironments } from "./enums/dog-suitable-environments.js";

export interface DogProps {
  name: string;
  about: string;
  organizationId: UniqueEntityId;
  age: number;
  latitude: number;
  longitude: number;
  dogSize?: DogSizeParams;
  energyLevel?: EnergyLevels;
  independenceLevel?: IndependenceLevels;
  suitableEnvironment?: SuitableEnvironments;
  photos: string[];
  adoptionRequirements: string[];
  createdAt?: Date;
  updatedAt?: Date | null;
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

  get latitude() {
    return this.props.latitude;
  }

  get longitude() {
    return this.props.longitude;
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

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: DogProps, id?: UniqueEntityId) {
    const dog = new Dog(props, id);

    return dog;
  }
}
