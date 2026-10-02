import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { InMemoryDogsRepository } from "../../../../../test/repositories/in-memory-dogs.repository.js";
import { InMemoryOrganizationsRepository } from "../../../../../test/repositories/in-memory-organizations.repository.js";
import { CreateDogUseCase } from "./create-dog.js";
import { EnergyLevels } from "../../enterprise/entities/enums/dog-energy-levels.js";
import { IndependenceLevels } from "../../enterprise/entities/enums/dog-independence-levels.js";
import { SuitableEnvironments } from "../../enterprise/entities/enums/dog-suitable-environments.js";
import { makeOrganization } from "../../../../../test/factories/make-organization.js";
import { NotValid } from "../../enterprise/entities/value-objects/errors/not-valid.js";
import { ResourceNotFound } from "./errors/resource-not-found.js";
import { DogSize } from "../../enterprise/entities/enums/dog-size.js";

let sut: CreateDogUseCase;

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let inMemoryDogsRepository: InMemoryDogsRepository;

describe("Create Dog Use Case", async () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    inMemoryDogsRepository = new InMemoryDogsRepository();

    sut = new CreateDogUseCase(
      inMemoryOrganizationsRepository,
      inMemoryDogsRepository,
    );
  });

  it("should be able create a dog", async () => {
    const newOrganization = makeOrganization();

    if (newOrganization instanceof NotValid) {
      return newOrganization;
    }

    inMemoryOrganizationsRepository.create(newOrganization);

    await sut.execute({
      organizationId: newOrganization.id,
      name: "Leko",
      about: "It's a dog with a high energy level",
      age: 0.6,
      dogSize: DogSize.LITTLE_PUPPY,
      energyLevel: EnergyLevels.VERY_HIGH,
      independenceLevel: IndependenceLevels.MEDIUM,
      suitableEnvironment: SuitableEnvironments.APARTMENT,
      photos: ["photo-link-01", "photo-link-02"],
      adoptionRequirements: [
        "The dog must have a big space to play",
        "The person should live in the same city",
        "The dog doesn't have a passport.",
      ],
      latitude: 40.4168,
      longitude: -3.7038,
    });

    expect(inMemoryDogsRepository.items).toHaveLength(1);
    expect(inMemoryDogsRepository.items).toEqual([
      expect.objectContaining({ name: "Leko" }),
    ]);
  });

  it("should not be able create a dog with a inexistent organization", async () => {
    const result = await sut.execute({
      organizationId: new UniqueEntityId("organization-01"),
      name: "Leko",
      about: "It's a dog with a high energy level",
      age: 0.6,
      dogSize: DogSize.LITTLE_PUPPY,
      energyLevel: EnergyLevels.VERY_HIGH,
      independenceLevel: IndependenceLevels.MEDIUM,
      suitableEnvironment: SuitableEnvironments.APARTMENT,
      photos: ["photo-link-01", "photo-link-02"],
      adoptionRequirements: [
        "The dog must have a big space to play",
        "The person should live in the same city",
        "The dog doesn't have a passport.",
      ],
      latitude: 40.4168,
      longitude: -3.7038,
    });

    expect(result).toBeInstanceOf(ResourceNotFound);
  });
});
