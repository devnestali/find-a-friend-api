import type { DogsRepository } from "@/domain/adoption/application/repositories/dog.repository.js";
import type { Dog } from "@/domain/adoption/enterprise/entities/dog.js";
import { prisma } from "../database/prisma.js";
import { DogMapper } from "../utils/dog-mapper.js";

export class PrismaDogsRepository implements DogsRepository {
  async create(dog: Dog): Promise<void> {
    await prisma.dog.create({
      data: {
        id: dog.id.toString(),
        organizationId: dog.organizationId.toString(),
        name: dog.name,
        about: dog.about,
        age: dog.age,
        latitude: dog.latitude,
        longitude: dog.longitude,
        energyLevel: DogMapper.energyLevelsToPrisma(dog.energyLevel),
        dogSize: DogMapper.dogSizeToPrisma(dog.dogSize),
        independenceLevel: DogMapper.independenceLevelsToPrisma(
          dog.independencyLevel,
        ),
        suitableEnvironment: DogMapper.suitableEnvironmentsToPrisma(
          dog.suitableEnvironment,
        ),
        adoptionRequirements: dog.adoptionRequirements,
        photos: dog.photos,
      },
    });
  }
}
