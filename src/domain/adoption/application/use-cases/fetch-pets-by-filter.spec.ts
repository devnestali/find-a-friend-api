import { makePet } from "../../../../../test/factories/make-pet.js";
import { InMemoryPetsRepository } from "../../../../../test/repositories/in-memory-pets.repository.js";
import { EnergyLevels } from "../../enterprise/entities/enums/pet-energy-levels.js";
import { IndependenceLevels } from "../../enterprise/entities/enums/pet-independence-levels.js";
import { PetSize } from "../../enterprise/entities/enums/pet-size.js";
import { SuitableEnvironments } from "../../enterprise/entities/enums/pet-suitable-environments.js";
import { FetchPetsByFilterUseCase } from "./fetch-pets-by-filter.js";

let sut: FetchPetsByFilterUseCase;
let inMemoryPetsRepository: InMemoryPetsRepository;

describe("Fetch Pets by Filter Use Case", () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    sut = new FetchPetsByFilterUseCase(inMemoryPetsRepository);
  });

  it("should be able to filter pets by age", async () => {
    const first_pet = makePet({
      age: 2,
    });

    const second_pet = makePet({
      age: 3,
    });

    inMemoryPetsRepository.create(first_pet);
    inMemoryPetsRepository.create(second_pet);

    const result = await sut.execute({
      age: 2,
    });

    expect(result.pets).toHaveLength(1);
    expect(result.pets).toEqual([
      expect.objectContaining({
        age: 2,
      }),
    ]);
    expect(inMemoryPetsRepository.items).toHaveLength(2);
  });

  it("should be able to filter pets by petSize", async () => {
    const first_pet = makePet({
      petSize: PetSize.PUPPY,
    });

    const second_pet = makePet({
      petSize: PetSize.LITTLE_PUPPY,
    });

    inMemoryPetsRepository.create(first_pet);
    inMemoryPetsRepository.create(second_pet);

    const result = await sut.execute({
      petSize: PetSize.LITTLE_PUPPY,
    });

    expect(result.pets).toHaveLength(1);
    expect(result.pets).toEqual([
      expect.objectContaining({
        petSize: PetSize.LITTLE_PUPPY,
      }),
    ]);
    expect(inMemoryPetsRepository.items).toHaveLength(2);
  });

  it("should be able to filter pets by energyLevel", async () => {
    const first_pet = makePet({
      energyLevel: EnergyLevels.HIGH,
    });

    const second_pet = makePet({
      energyLevel: EnergyLevels.LOW,
    });

    inMemoryPetsRepository.create(first_pet);
    inMemoryPetsRepository.create(second_pet);

    const result = await sut.execute({
      energyLevel: EnergyLevels.LOW,
    });

    expect(result.pets).toHaveLength(1);
    expect(result.pets).toEqual([
      expect.objectContaining({
        energyLevel: EnergyLevels.LOW,
      }),
    ]);
    expect(inMemoryPetsRepository.items).toHaveLength(2);
  });

  it("should be able to filter pets by independenceLevel", async () => {
    const first_pet = makePet({
      independenceLevel: IndependenceLevels.HIGH,
    });

    const second_pet = makePet({
      independenceLevel: IndependenceLevels.LOW,
    });

    inMemoryPetsRepository.create(first_pet);
    inMemoryPetsRepository.create(second_pet);

    const result = await sut.execute({
      independenceLevel: IndependenceLevels.HIGH,
    });

    expect(result.pets).toHaveLength(1);
    expect(result.pets).toEqual([
      expect.objectContaining({
        independenceLevel: IndependenceLevels.HIGH,
      }),
    ]);
    expect(inMemoryPetsRepository.items).toHaveLength(2);
  });

  it("should be able to filter pets by suitableEnvironment", async () => {
    const first_pet = makePet({
      suitableEnvironment: SuitableEnvironments.HOUSE,
    });

    const second_pet = makePet({
      suitableEnvironment: SuitableEnvironments.APARTMENT,
    });

    inMemoryPetsRepository.create(first_pet);
    inMemoryPetsRepository.create(second_pet);

    const result = await sut.execute({
      suitableEnvironment: SuitableEnvironments.APARTMENT,
    });

    expect(result.pets).toHaveLength(1);
    expect(result.pets).toEqual([
      expect.objectContaining({
        suitableEnvironment: SuitableEnvironments.APARTMENT,
      }),
    ]);
    expect(inMemoryPetsRepository.items).toHaveLength(2);
  });

  it("should be able to filter pets by multiple filters", async () => {
    const first_pet = makePet({
      age: 2,
      petSize: PetSize.ADULT,
      energyLevel: EnergyLevels.HIGH,
      independenceLevel: IndependenceLevels.MEDIUM,
      suitableEnvironment: SuitableEnvironments.APARTMENT,
    });

    const second_pet = makePet({
      age: 2,
      petSize: PetSize.ADULT,
      energyLevel: EnergyLevels.HIGH,
      independenceLevel: IndependenceLevels.LOW,
      suitableEnvironment: SuitableEnvironments.SPACIOUS_ENVIRONMENT,
    });

    const third_pet = makePet({
      age: 3,
      petSize: PetSize.LITTLE_PUPPY,
      energyLevel: EnergyLevels.VERY_HIGH,
      independenceLevel: IndependenceLevels.HIGH,
      suitableEnvironment: SuitableEnvironments.HOUSE,
    });

    inMemoryPetsRepository.create(first_pet);
    inMemoryPetsRepository.create(second_pet);
    inMemoryPetsRepository.create(third_pet);

    const result = await sut.execute({
      age: 2,
      petSize: PetSize.ADULT,
      energyLevel: EnergyLevels.HIGH,
    });

    expect(result.pets).toHaveLength(2);
    expect(result.pets).toEqual([
      expect.objectContaining({
        age: 2,
        petSize: PetSize.ADULT,
        energyLevel: EnergyLevels.HIGH,
      }),

      expect.objectContaining({
        age: 2,
        petSize: PetSize.ADULT,
        energyLevel: EnergyLevels.HIGH,
      }),
    ]);
    expect(inMemoryPetsRepository.items).toHaveLength(3);
  });

  it("should be able to filter without inform filters", async () => {
    const first_pet = makePet({
      age: 2,
      petSize: PetSize.ADULT,
      energyLevel: EnergyLevels.HIGH,
      independenceLevel: IndependenceLevels.MEDIUM,
      suitableEnvironment: SuitableEnvironments.APARTMENT,
    });

    const second_pet = makePet({
      age: 2,
      petSize: PetSize.ADULT,
      energyLevel: EnergyLevels.HIGH,
      independenceLevel: IndependenceLevels.LOW,
      suitableEnvironment: SuitableEnvironments.SPACIOUS_ENVIRONMENT,
    });

    inMemoryPetsRepository.create(first_pet);
    inMemoryPetsRepository.create(second_pet);

    const result = await sut.execute({});

    expect(result.pets).toHaveLength(2);
    expect(result.pets).toEqual([
      expect.objectContaining({
        age: 2,
      }),

      expect.objectContaining({
        age: 2,
      }),
    ]);
    expect(inMemoryPetsRepository.items).toHaveLength(2);
  });
});
