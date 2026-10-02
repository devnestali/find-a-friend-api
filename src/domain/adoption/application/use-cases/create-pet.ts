import type { EnergyLevels } from "../../enterprise/entities/enums/pet-energy-levels.js";
import type { IndependenceLevels } from "../../enterprise/entities/enums/pet-independence-levels.js";
import type { SuitableEnvironments } from "../../enterprise/entities/enums/pet-suitable-environments.js";
import type { PetSize } from "../../enterprise/entities/enums/pet-size.js";
import type { PetsRepository } from "../repositories/pet.repository.js";
import type { OrganizationsRepository } from "../repositories/organizations.repository.js";
import { ResourceNotFound } from "./errors/resource-not-found.js";
import { Pet } from "../../enterprise/entities/pet.js";

interface CreatePetUseCaseRequest {
  name: string;
  about: string;
  age: number;

  organizationId: string;

  petSize: PetSize;
  energyLevel: EnergyLevels;
  independenceLevel: IndependenceLevels;
  suitableEnvironment: SuitableEnvironments;
  photos: string[];
  adoptionRequirements: string[];

  latitude: number;
  longitude: number;
}

interface CreatePetUseCaseResponse {}

export class CreatePetUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    petSize,
    energyLevel,
    organizationId,
    independenceLevel,
    suitableEnvironment,
    photos,
    adoptionRequirements,
    latitude,
    longitude,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const organization =
      await this.organizationsRepository.findById(organizationId);

    if (!organization) {
      return new ResourceNotFound();
    }

    const pet = Pet.create({
      name,
      about,
      age,
      petSize,
      energyLevel,
      organizationId: organization.id,
      independenceLevel,
      suitableEnvironment,
      photos,
      adoptionRequirements,
      latitude,
      longitude,
    });

    await this.petsRepository.create(pet);

    return {
      pet,
    };
  }
}
