import type { Pet as PrismaPet } from "@/generated/prisma/client.js";

import {
  PetSize as PrismaPetSize,
  EnergyLevels as PrismaEnergyLevels,
  IndependenceLevels as PrismaIndependenceLevels,
  SuitableEnvironments as PrismaSuitableEnvironments,
} from "@/generated/prisma/enums.js";

import { PetSize } from "@/domain/adoption/enterprise/entities/enums/pet-size.js";
import { EnergyLevels } from "@/domain/adoption/enterprise/entities/enums/pet-energy-levels.js";
import { IndependenceLevels } from "@/domain/adoption/enterprise/entities/enums/pet-independence-levels.js";
import { SuitableEnvironments } from "@/domain/adoption/enterprise/entities/enums/pet-suitable-environments.js";
import { Pet } from "@/domain/adoption/enterprise/entities/pet.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";

export class PetMapper {
  static prismaToDomain(raw: PrismaPet): Pet {
    return Pet.create({
      name: raw.name,
      about: raw.about,
      organizationId: new UniqueEntityId(raw.organizationId),
      age: raw.age,
      latitude: raw.latitude,
      longitude: raw.longitude,
      petSize: this.petSizeToEntity(raw.petSize),
      energyLevel: this.energyLevelsToEntity(raw.energyLevel),
      independenceLevel: this.independenceLevelsToEntity(raw.independenceLevel),
      suitableEnvironment: this.suitableEnvironmentsToEntity(
        raw.suitableEnvironment,
      ),
      photos: raw.photos,
      adoptionRequirements: raw.adoptionRequirements,
    });
  }

  static petSizeToPrisma(raw: PetSize): PrismaPetSize {
    switch (raw) {
      case PetSize.ADULT: {
        return PrismaPetSize.ADULT;
      }

      case PetSize.PUPPY: {
        return PrismaPetSize.PUPPY;
      }

      case PetSize.LITTLE_PUPPY: {
        return PrismaPetSize.LITTLE_PUPPY;
      }
    }
  }

  static petSizeToEntity(raw: PrismaPetSize): PetSize {
    switch (raw) {
      case PrismaPetSize.ADULT: {
        return PetSize.ADULT;
      }

      case PrismaPetSize.PUPPY: {
        return PetSize.PUPPY;
      }

      case PrismaPetSize.LITTLE_PUPPY: {
        return PetSize.LITTLE_PUPPY;
      }
    }
  }

  static energyLevelsToPrisma(raw: EnergyLevels): PrismaEnergyLevels {
    switch (raw) {
      case EnergyLevels.VERY_HIGH: {
        return PrismaEnergyLevels.VERY_HIGH;
      }
      case EnergyLevels.HIGH: {
        return PrismaEnergyLevels.HIGH;
      }
      case EnergyLevels.MEDIUM: {
        return PrismaEnergyLevels.MEDIUM;
      }
      case EnergyLevels.LOW: {
        return PrismaEnergyLevels.LOW;
      }
      case EnergyLevels.VERY_LOW: {
        return PrismaEnergyLevels.VERY_LOW;
      }
    }
  }

  static energyLevelsToEntity(raw: PrismaEnergyLevels): EnergyLevels {
    switch (raw) {
      case PrismaEnergyLevels.VERY_HIGH: {
        return EnergyLevels.VERY_HIGH;
      }
      case PrismaEnergyLevels.HIGH: {
        return EnergyLevels.HIGH;
      }
      case PrismaEnergyLevels.MEDIUM: {
        return EnergyLevels.MEDIUM;
      }
      case PrismaEnergyLevels.LOW: {
        return EnergyLevels.LOW;
      }
      case PrismaEnergyLevels.VERY_LOW: {
        return EnergyLevels.VERY_LOW;
      }
    }
  }

  static independenceLevelsToPrisma(
    raw: IndependenceLevels,
  ): PrismaIndependenceLevels {
    switch (raw) {
      case IndependenceLevels.HIGH: {
        return PrismaIndependenceLevels.HIGH;
      }
      case IndependenceLevels.MEDIUM: {
        return PrismaIndependenceLevels.MEDIUM;
      }
      case IndependenceLevels.LOW: {
        return PrismaIndependenceLevels.LOW;
      }
    }
  }

  static independenceLevelsToEntity(
    raw: PrismaIndependenceLevels,
  ): IndependenceLevels {
    switch (raw) {
      case PrismaIndependenceLevels.HIGH: {
        return IndependenceLevels.HIGH;
      }
      case PrismaIndependenceLevels.MEDIUM: {
        return IndependenceLevels.MEDIUM;
      }
      case PrismaIndependenceLevels.LOW: {
        return IndependenceLevels.LOW;
      }
    }
  }

  static suitableEnvironmentsToPrisma(
    raw: SuitableEnvironments,
  ): PrismaSuitableEnvironments {
    switch (raw) {
      case SuitableEnvironments.APARTMENT: {
        return PrismaSuitableEnvironments.APARTMENT;
      }
      case SuitableEnvironments.HOUSE: {
        return PrismaSuitableEnvironments.HOUSE;
      }
      case SuitableEnvironments.SPACIOUS_ENVIRONMENT: {
        return PrismaSuitableEnvironments.SPACIOUS_ENVIRONMENT;
      }
    }
  }
  static suitableEnvironmentsToEntity(
    raw: PrismaSuitableEnvironments,
  ): SuitableEnvironments {
    switch (raw) {
      case PrismaSuitableEnvironments.APARTMENT: {
        return SuitableEnvironments.APARTMENT;
      }
      case PrismaSuitableEnvironments.HOUSE: {
        return SuitableEnvironments.HOUSE;
      }
      case PrismaSuitableEnvironments.SPACIOUS_ENVIRONMENT: {
        return SuitableEnvironments.SPACIOUS_ENVIRONMENT;
      }
    }
  }
}
