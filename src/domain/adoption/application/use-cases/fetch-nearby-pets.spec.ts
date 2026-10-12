import { makePet } from "../../../../../test/factories/make-pet.js";
import { InMemoryPetsRepository } from "../../../../../test/repositories/in-memory-pets.repository.js";
import { NotFoundPetsNearby } from "./errors/not-found-pets-nearby.js";
import { FetchNearbyPetsUseCase } from "./fetch-nearby-pets.js";

let sut: FetchNearbyPetsUseCase;
let inMemoryPetsRepository: InMemoryPetsRepository;

describe("Fetch Nearby Use Case", async () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    sut = new FetchNearbyPetsUseCase(inMemoryPetsRepository);
  });

  it("should be able to find pets in a distance of 10 kilometers", async () => {
    const firstNewPet = makePet({
      latitude: 42.1491,
      longitude: -0.4089,
    });

    inMemoryPetsRepository.create(firstNewPet);

    const secondNewPet = makePet({
      latitude: 42.2031,
      longitude: -0.4089,
    });

    inMemoryPetsRepository.create(secondNewPet);

    const result = await sut.execute({
      cityLatitude: 42.1401,
      cityLongitude: -0.4089,
    });

    if (result instanceof NotFoundPetsNearby) {
      return result;
    }

    expect(result.pets).toHaveLength(2);

    expect(result.pets[0]).toEqual(
      expect.objectContaining({
        latitude: 42.1491,
        longitude: -0.4089,
      }),
    );
    expect(result.pets[1]).toEqual(
      expect.objectContaining({
        latitude: 42.2031,
        longitude: -0.4089,
      }),
    );
  });

  it("should return pets sorted by a lower distance in a range of 10 kilometers", async () => {
    const farPet = makePet({
      latitude: 42.2031,
      longitude: -0.4089,
    });

    inMemoryPetsRepository.create(farPet);

    const closePet = makePet({
      latitude: 42.1491,
      longitude: -0.4089,
    });

    inMemoryPetsRepository.create(closePet);

    const result = await sut.execute({
      cityLatitude: 42.1401,
      cityLongitude: -0.4089,
    });

    if (result instanceof NotFoundPetsNearby) {
      return result;
    }

    expect(result.pets[0]).toEqual(
      expect.objectContaining({
        latitude: 42.1491,
        longitude: -0.4089,
      }),
    );

    expect(result.pets[1]).toEqual(
      expect.objectContaining({
        latitude: 42.2031,
        longitude: -0.4089,
      }),
    );
  });

  it("should not be able to find pets whose are far than 10 kilometers", async () => {
    const newPet = makePet({
      latitude: 42.2751,
      longitude: -0.4089,
    });

    inMemoryPetsRepository.create(newPet);

    const result = await sut.execute({
      cityLatitude: 42.1401,
      cityLongitude: -0.4089,
    });

    expect(result).toBeInstanceOf(NotFoundPetsNearby);
  });
});
