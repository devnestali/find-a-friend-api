import {
  DogSize as PrismaDogSize,
  EnergyLevels as PrismaEnergyLevels,
  IndependenceLevels as PrismaIndependenceLevels,
  SuitableEnvironments as PrismaSuitableEnvironments,
} from "@/generated/prisma/enums.js";

import { DogSize } from "@/domain/adoption/enterprise/entities/enums/dog-size.js";
import { EnergyLevels } from "@/domain/adoption/enterprise/entities/enums/dog-energy-levels.js";
import { IndependenceLevels } from "@/domain/adoption/enterprise/entities/enums/dog-independence-levels.js";
import { SuitableEnvironments } from "@/domain/adoption/enterprise/entities/enums/dog-suitable-environments.js";

export class DogMapper {
  static dogSizeToPrisma(raw?: DogSize): PrismaDogSize | null {
    switch (raw) {
      case DogSize.ADULT: {
        return PrismaDogSize.ADULT;
      }

      case DogSize.PUPPY: {
        return PrismaDogSize.PUPPY;
      }

      case DogSize.LITTLE_PUPPY: {
        return PrismaDogSize.LITTLE_PUPPY;
      }

      default: {
        return null;
      }
    }
  }

  static energyLevelsToPrisma(raw?: EnergyLevels): PrismaEnergyLevels | null {
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
      default: {
        return null;
      }
    }
  }

  static independenceLevelsToPrisma(
    raw?: IndependenceLevels,
  ): PrismaIndependenceLevels | null {
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
      default: {
        return null;
      }
    }
  }

  static suitableEnvironmentsToPrisma(
    raw?: SuitableEnvironments,
  ): PrismaSuitableEnvironments | null {
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
      default: {
        return null;
      }
    }
  }
}
