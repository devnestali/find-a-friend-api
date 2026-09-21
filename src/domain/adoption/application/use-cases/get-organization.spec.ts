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
    const phoneNumber = PhoneNumber.create("11111111111");
    const cep = CepCode.create("12345678");

    if (phoneNumber instanceof NotValid) {
      return phoneNumber;
    }

    if (cep instanceof NotValid) {
      return cep;
    }

    const newOrganization = makeOrganization({
      responsiblePersonName: "John Doe",
      email: "johndoe@example.com",
      address: "first street 1",
      cep,
      phoneNumber,
      password: "123456",
      confirmPassword: "123456",
    });

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
    const phoneNumber = PhoneNumber.create("11111111111");
    const cep = CepCode.create("12345678");

    if (phoneNumber instanceof NotValid) {
      return phoneNumber;
    }

    if (cep instanceof NotValid) {
      return cep;
    }

    const newOrganization = makeOrganization({
      responsiblePersonName: "John Doe",
      email: "johndoe@example.com",
      address: "first street 1",
      cep,
      phoneNumber,
      password: "123456",
      confirmPassword: "123456",
    });

    await inMemoryOrganizationsRepository.create(newOrganization);

    const organization = await sut.execute({
      id: "organization-01",
    });

    expect(organization).toBeInstanceOf(ResourceNotFound);
  });
});
