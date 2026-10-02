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

export class PetMapper {
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
}
