import { makePet } from "../../../../../test/factories/make-pet.js";
import { InMemoryPetsRepository } from "../../../../../test/repositories/in-memory-pets.repository.js";
import { FetchPetsUseCase } from "./fetch-pets.js";

let sut: FetchPetsUseCase;
let inMemoryPetsRepository: InMemoryPetsRepository;

describe("Fetch Pets Use Case", () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    sut = new FetchPetsUseCase(inMemoryPetsRepository);
  });

  it("should be able list all the pets", async () => {
    const newPet = makePet();

    inMemoryPetsRepository.create(newPet);

    const result = await sut.execute({});

    expect(result.pets).toEqual([newPet]);
    expect(result.pets).toHaveLength(1);
    expect(inMemoryPetsRepository.items).toHaveLength(1);
  });

  it("should be able to list even if the pet list is empty", async () => {
    const result = await sut.execute({});

    expect(result.pets).toHaveLength(0);
    expect(inMemoryPetsRepository.items).toHaveLength(0);
  });
});
