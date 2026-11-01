import { Entity } from "@/core/entities/entity.js";
import { EnergyLevels } from "./enums/pet-energy-levels.js";

import type { UniqueEntityId } from "@/core/entities/unique-entity-id.js";

import type { PetSize } from "./enums/pet-size.js";
import type { IndependenceLevels } from "./enums/pet-independence-levels.js";
import type { SuitableEnvironments } from "./enums/pet-suitable-environments.js";
import type { Optional } from "@/core/types/optional.js";

export interface PetProps {
  name: string;
  about: string;
  organizationId: UniqueEntityId;
  age: number;
  latitude: number;
  longitude: number;
  petSize: PetSize;
  energyLevel: EnergyLevels;
  independenceLevel: IndependenceLevels;
  suitableEnvironment: SuitableEnvironments;
  photos: string[];
  adoptionRequirements: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class Pet extends Entity<PetProps> {
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

  get petSize() {
    return this.props.petSize;
  }

  get energyLevel() {
    return this.props.energyLevel;
  }

  get independenceLevel() {
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

  static create(
    props: Optional<PetProps, "createdAt" | "updatedAt">,
    id?: UniqueEntityId,
  ) {
    const pet = new Pet(props, id);

    return pet;
  }
}
