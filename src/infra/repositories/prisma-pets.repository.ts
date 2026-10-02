import type { PetsRepository } from "@/domain/adoption/application/repositories/pet.repository.js";
import type { Pet } from "@/domain/adoption/enterprise/entities/pet.js";
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
}
