import type { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import type { EnergyLevels } from "../../enterprise/entities/enums/dog-energy-levels.js";
import type { IndependenceLevels } from "../../enterprise/entities/enums/dog-independence-levels.js";
import type { SuitableEnvironments } from "../../enterprise/entities/enums/dog-suitable-environments.js";
import type { DogSize } from "../../enterprise/entities/enums/dog-size.js";
import type { DogsRepository } from "../repositories/dog.repository.js";
import type { OrganizationsRepository } from "../repositories/organizations.repository.js";
import { ResourceNotFound } from "./errors/resource-not-found.js";
import { Dog } from "../../enterprise/entities/dog.js";

interface CreateDogUseCaseRequest {
  name: string;
  about: string;
  age: number;

  organizationId: string;

  dogSize: DogSize;
  energyLevel: EnergyLevels;
  independenceLevel: IndependenceLevels;
  suitableEnvironment: SuitableEnvironments;
  photos: string[];
  adoptionRequirements: string[];

  latitude: number;
  longitude: number;
}

interface CreateDogUseCaseResponse {}

export class CreateDogUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private dogsRepository: DogsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    dogSize,
    energyLevel,
    organizationId,
    independenceLevel,
    suitableEnvironment,
    photos,
    adoptionRequirements,
    latitude,
    longitude,
  }: CreateDogUseCaseRequest): Promise<CreateDogUseCaseResponse> {
    const organization =
      await this.organizationsRepository.findById(organizationId);

    if (!organization) {
      return new ResourceNotFound();
    }

    const dog = Dog.create({
      name,
      about,
      age,
      dogSize,
      energyLevel,
      organizationId: organization.id,
      independenceLevel,
      suitableEnvironment,
      photos,
      adoptionRequirements,
      latitude,
      longitude,
    });

    await this.dogsRepository.create(dog);

    return {
      dog,
    };
  }
}
