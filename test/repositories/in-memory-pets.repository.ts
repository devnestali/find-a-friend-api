import { getDistanceBetweenCoordinates } from "@/core/utils/get-distance-between-coordinates.js";
import type {
  FindManyByFilterParams,
  FindManyNearbyParams,
  PetsRepository,
} from "@/domain/adoption/application/repositories/pet.repository.js";
import type { Pet } from "@/domain/adoption/enterprise/entities/pet.js";

export class InMemoryPetsRepository implements PetsRepository {
  public readonly items: Pet[] = [];

  async create(pet: Pet): Promise<void> {
    this.items.push(pet);
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<Pet[]> {
    return this.items
      .filter((item) => {
        const distance = getDistanceBetweenCoordinates(
          {
            latitude: params.latitude,
            longitude: params.longitude,
          },
          {
            latitude: item.latitude,
            longitude: item.longitude,
          },
        );

        return distance < 10;
      })
      .sort((a, b) => {
        const distance_a = getDistanceBetweenCoordinates(
          {
            latitude: params.latitude,
            longitude: params.longitude,
          },
          {
            latitude: a.latitude,
            longitude: a.longitude,
          },
        );

        const distance_b = getDistanceBetweenCoordinates(
          {
            latitude: params.latitude,
            longitude: params.longitude,
          },
          {
            latitude: b.latitude,
            longitude: b.longitude,
          },
        );

        return distance_a - distance_b;
      });
  }

  async findMany(): Promise<Pet[]> {
    return this.items;
  }

  async findManyByFilter(params: FindManyByFilterParams): Promise<Pet[]> {
    return this.items.filter((item) => {
      if (params.age !== undefined && item.age !== params.age) {
        return false;
      }

      if (
        params.energyLevel !== undefined &&
        item.energyLevel !== params.energyLevel
      ) {
        return false;
      }

      if (
        params.independenceLevel !== undefined &&
        item.independenceLevel !== params.independenceLevel
      ) {
        return false;
      }

      if (params.petSize !== undefined && item.petSize !== params.petSize) {
        return false;
      }

      if (
        params.suitableEnvironment !== undefined &&
        item.suitableEnvironment !== params.suitableEnvironment
      ) {
        return false;
      }

      return true;
    });
  }
}
