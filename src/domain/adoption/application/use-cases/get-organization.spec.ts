import { makeOrganization } from "../../../../../test/factories/make-organization.js";
import { InMemoryOrganizationsRepository } from "../../../../../test/repositories/in-memory-organizations.repository.js";
import { CepCode } from "../../enterprise/entities/value-objects/cep-code.js";
import { NotValid } from "../../enterprise/entities/value-objects/errors/not-valid.js";
import { PhoneNumber } from "../../enterprise/entities/value-objects/phone-number.js";
import { ResourceNotFound } from "./errors/resource-not-found.js";
import { GetOrganizationUseCase } from "./get-organization.js";

let sut: GetOrganizationUseCase;
let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;

describe("Get Organization Use Case", () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    sut = new GetOrganizationUseCase(inMemoryOrganizationsRepository);
  });

  it("should be able to get a organization", async () => {
    const newOrganization = makeOrganization({
      email: "johndoe@example.com",
    });

    if (newOrganization instanceof NotValid) {
      return newOrganization;
    }

    await inMemoryOrganizationsRepository.create(newOrganization);

    const result = await sut.execute({
      id: newOrganization.id.toString(),
    });

    if (result instanceof ResourceNotFound) {
      return result;
    }

    expect(inMemoryOrganizationsRepository.items[0]?.id.toString()).toBe(
      newOrganization.id.toString(),
    );
    expect(inMemoryOrganizationsRepository.items[0]).toEqual(
      expect.objectContaining({
        email: "johndoe@example.com",
      }),
    );
  });

  it("should not be able to get a organization if the id is different", async () => {
    const newOrganization = makeOrganization();

    if (newOrganization instanceof NotValid) {
      return newOrganization;
    }

    await inMemoryOrganizationsRepository.create(newOrganization);

    const organization = await sut.execute({
      id: "organization-01",
    });

    expect(organization).toBeInstanceOf(ResourceNotFound);
  });
});
