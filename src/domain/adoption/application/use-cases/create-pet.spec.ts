import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { InMemoryPetsRepository } from "../../../../../test/repositories/in-memory-pets.repository.js";
import { InMemoryOrganizationsRepository } from "../../../../../test/repositories/in-memory-organizations.repository.js";
import { CreatePetUseCase } from "./create-pet.js";
import { EnergyLevels } from "../../enterprise/entities/enums/pet-energy-levels.js";
import { IndependenceLevels } from "../../enterprise/entities/enums/pet-independence-levels.js";
import { SuitableEnvironments } from "../../enterprise/entities/enums/pet-suitable-environments.js";
import { makeOrganization } from "../../../../../test/factories/make-organization.js";
import { NotValid } from "../../enterprise/entities/value-objects/errors/not-valid.js";
import { ResourceNotFound } from "./errors/resource-not-found.js";
import { PetSize } from "../../enterprise/entities/enums/pet-size.js";

let sut: CreatePetUseCase;

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let inMemoryPetsRepository: InMemoryPetsRepository;

describe("Create Pet Use Case", async () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository();

    sut = new CreatePetUseCase(
      inMemoryOrganizationsRepository,
      inMemoryPetsRepository,
    );
  });

  it("should be able create a pet", async () => {
    const newOrganization = makeOrganization();

    if (newOrganization instanceof NotValid) {
      return newOrganization;
    }

    inMemoryOrganizationsRepository.create(newOrganization);

    await sut.execute({
      organizationId: newOrganization.id.toString(),
      name: "Leko",
      about: "It's a pet with a high energy level",
      age: 0.6,
      petSize: PetSize.LITTLE_PUPPY,
      energyLevel: EnergyLevels.VERY_HIGH,
      independenceLevel: IndependenceLevels.MEDIUM,
      suitableEnvironment: SuitableEnvironments.APARTMENT,
      photos: ["photo-link-01", "photo-link-02"],
      adoptionRequirements: [
        "The pet must have a big space to play",
        "The person should live in the same city",
        "The pet doesn't have a passport.",
      ],
      latitude: 40.4168,
      longitude: -3.7038,
    });

    expect(inMemoryPetsRepository.items).toHaveLength(1);
    expect(inMemoryPetsRepository.items).toEqual([
      expect.objectContaining({ name: "Leko" }),
    ]);
  });

  it("should not be able create a pet with a inexistent organization", async () => {
    const result = await sut.execute({
      organizationId: "organization-01",
      name: "Leko",
      about: "It's a pet with a high energy level",
      age: 0.6,
      petSize: PetSize.LITTLE_PUPPY,
      energyLevel: EnergyLevels.VERY_HIGH,
      independenceLevel: IndependenceLevels.MEDIUM,
      suitableEnvironment: SuitableEnvironments.APARTMENT,
      photos: ["photo-link-01", "photo-link-02"],
      adoptionRequirements: [
        "The pet must have a big space to play",
        "The person should live in the same city",
        "The pet doesn't have a passport.",
      ],
      latitude: 40.4168,
      longitude: -3.7038,
    });

    expect(result).toBeInstanceOf(ResourceNotFound);
  });
});
