import type {
  FindManyNearbyParams,
  PetsRepository,
} from "@/domain/adoption/application/repositories/pet.repository.js";
import type { Pet } from "@/domain/adoption/enterprise/entities/pet.js";
import { prisma } from "../database/prisma.js";
import { PetMapper } from "../utils/pet-mapper.js";
import { getDistanceBetweenCoordinates } from "@/core/utils/get-distance-between-coordinates.js";

export class PrismaPetsRepository implements PetsRepository {
  async create(pet: Pet): Promise<void> {
    await prisma.pet.create({
      data: {
        id: pet.id.toString(),
        organizationId: pet.organizationId.toString(),
        name: pet.name,
        about: pet.about,
        age: pet.age,
        latitude: pet.latitude,
        longitude: pet.longitude,
        energyLevel: PetMapper.energyLevelsToPrisma(pet.energyLevel),
        petSize: PetMapper.petSizeToPrisma(pet.petSize),
        independenceLevel: PetMapper.independenceLevelsToPrisma(
          pet.independencyLevel,
        ),
        suitableEnvironment: PetMapper.suitableEnvironmentsToPrisma(
          pet.suitableEnvironment,
        ),
        adoptionRequirements: pet.adoptionRequirements,
        photos: pet.photos,
      },
    });
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<Pet[]> {
    const nearbyPets = (await prisma.pet.findMany())
      .filter((animal) => {
        const distance = getDistanceBetweenCoordinates(
          {
            latitude: params.latitude,
            longitude: params.longitude,
          },
          {
            latitude: animal.latitude,
            longitude: animal.longitude,
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

    const pets = nearbyPets.map((pet) => {
      return PetMapper.prismaToDomain(pet);
    });

    return pets;
  }
}
