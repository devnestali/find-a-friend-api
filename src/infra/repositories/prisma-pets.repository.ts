import type {
  FindManyByFilterParams,
  FindManyNearbyParams,
  PetsRepository,
} from "@/domain/adoption/application/repositories/pet.repository.js";
import type { Pet } from "@/domain/adoption/enterprise/entities/pet.js";
import type { Pet as PrismaPet } from "@/generated/prisma/client.js";
import { prisma } from "../database/prisma.js";
import { PetMapper } from "../utils/pet-mapper.js";

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
          pet.independenceLevel,
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
    const pets = await prisma.$queryRaw<PrismaPet[]>`
      SELECT *
          FROM (
            SELECT
            p.*,
            (
              DEGREES(
                ACOS(
                  LEAST(1, GREATEST(-1,
                    SIN(RADIANS(${params.latitude}::double precision)) *
                    SIN(RADIANS(p.latitude)) +
                    COS(RADIANS(${params.latitude}::double precision)) *
                    COS(RADIANS(p.latitude)) *
                    COS(RADIANS(
                      ${params.longitude}::double precision - p.longitude
                    ))
                  ))
                )
              ) * 60 * 1.1515 * 1.609344
            ) AS distance
            FROM "pet" p  
          ) AS nearby_pets
          WHERE distance < 10
          ORDER BY distance ASC
    `;

    const petsMapper = pets.map((item) => {
      return PetMapper.prismaToDomain(item);
    });

    return petsMapper;
  }

  async findMany(): Promise<Pet[]> {
    const pets = (await prisma.pet.findMany()).map((each) => {
      return PetMapper.prismaToDomain(each);
    });

    return pets;
  }

  async findManyByFilter(params: FindManyByFilterParams): Promise<Pet[]> {
    const filteredPets = await prisma.pet.findMany({
      where: {
        ...(params.age !== undefined && {
          age: params.age,
        }),

        ...(params.petSize !== undefined && {
          petSize: PetMapper.petSizeToPrisma(params.petSize),
        }),

        ...(params.energyLevel !== undefined && {
          energyLevel: PetMapper.energyLevelsToPrisma(params.energyLevel),
        }),

        ...(params.independenceLevel !== undefined && {
          independenceLevel: PetMapper.independenceLevelsToPrisma(
            params.independenceLevel,
          ),
        }),

        ...(params.suitableEnvironment !== undefined && {
          suitableEnvironment: PetMapper.suitableEnvironmentsToPrisma(
            params.suitableEnvironment,
          ),
        }),
      },
    });

    return filteredPets.map((pet) => {
      return PetMapper.prismaToDomain(pet);
    });
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findFirst({
      where: {
        id,
      },
    });

    if (!pet) {
      return null;
    }

    return PetMapper.prismaToDomain(pet);
  }
}
