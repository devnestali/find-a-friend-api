import { makeOrganization } from "../../../../../test/factories/make-organization.js";
import { InMemoryOrganizationsRepository } from "../../../../../test/repositories/in-memory-organizations.repository.js";
import { Organization } from "../../enterprise/entities/organization.js";
import { NotValid } from "../../enterprise/entities/value-objects/errors/not-valid.js";
import { AuthenticateOrganizationUseCase } from "./authenticate-organization.js";
import { InvalidCredentials } from "./errors/invalid-credentials.js";

let sut: AuthenticateOrganizationUseCase;
let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;

describe("Authenticate Use Case", async () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    sut = new AuthenticateOrganizationUseCase(inMemoryOrganizationsRepository);
  });

  it("should be able to authenticate a organization", async () => {
    const newOrganization = makeOrganization({
      email: "johndoe@example.com",
      password: "123456",
    });

    if (newOrganization instanceof NotValid) {
      return newOrganization;
    }

    await inMemoryOrganizationsRepository.create(newOrganization);

    const result = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    if (result instanceof InvalidCredentials) {
      return result;
    }

    expect(result.organization).toEqual(
      expect.objectContaining({
        email: "johndoe@example.com",
      }),
    );
    expect(result.organization).toBeInstanceOf(Organization);
  });

  it("should not be able to authenticate with invalid email", async () => {
    const newOrganization = makeOrganization({
      email: "johndoe@example.com",
    });

    if (newOrganization instanceof NotValid) {
      return newOrganization;
    }

    await inMemoryOrganizationsRepository.create(newOrganization);

    const result = await sut.execute({
      email: "wrongemail@example.com",
      password: "123456",
    });

    expect(result).toBeInstanceOf(InvalidCredentials);
  });

  it("should not be able to authenticate with invalid password", async () => {
    const newOrganization = makeOrganization({
      email: "johndoe@example.com",
      password: "1234567",
    });

    if (newOrganization instanceof NotValid) {
      return newOrganization;
    }

    await inMemoryOrganizationsRepository.create(newOrganization);

    const result = await sut.execute({
      email: "johndoe@example.com",
      password: "12345678",
    });

    expect(result).toBeInstanceOf(InvalidCredentials);
  });
});
