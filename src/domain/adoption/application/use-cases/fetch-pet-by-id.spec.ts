import { makePet } from "../../../../../test/factories/make-pet.js";
import { InMemoryPetsRepository } from "../../../../../test/repositories/in-memory-pets.repository.js";
import { ResourceNotFound } from "./errors/resource-not-found.js";
import { FetchPetByIdUseCase } from "./fetch-pet-by-id.js";

let sut: FetchPetByIdUseCase;
let inMemoryPetsRepository: InMemoryPetsRepository;

describe("Fetch Pet by Id Use Case", () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    sut = new FetchPetByIdUseCase(inMemoryPetsRepository);
  });

  it("should be able to fetch for a pet based on his own id", async () => {
    const newPet = makePet();

    inMemoryPetsRepository.create(newPet);

    const result = await sut.execute({
      id: newPet.id.toString(),
    });

    if (result instanceof ResourceNotFound) {
      return result;
    }

    expect(result.pet.id).toEqual(newPet.id);
    expect(inMemoryPetsRepository.items).toHaveLength(1);
  });

  it("should return ResourceNotFound when pet does not exist", async () => {
    const newPet = makePet();

    inMemoryPetsRepository.create(newPet);

    const result = await sut.execute({
      id: "test-01",
    });

    expect(result).toBeInstanceOf(ResourceNotFound);
    expect(inMemoryPetsRepository.items).toHaveLength(1);
  });
});
