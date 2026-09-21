import { InMemoryOrganizationsRepository } from "../../../../../test/repositories/in-memory-organizations.repository.js";
import { NotValid } from "../../enterprise/entities/value-objects/errors/not-valid.js";
import { PasswordDoesNotMatch } from "../../enterprise/entities/value-objects/errors/password-does-not-match.js";
import { CreateOrganizationUseCase } from "./create-organization.js";

let sut: CreateOrganizationUseCase;
let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;

describe("Create Organization Use Case", () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    sut = new CreateOrganizationUseCase(inMemoryOrganizationsRepository);
  });

  it("should be able create a organization", async () => {
    await sut.execute({
      responsiblePersonName: "John Doe",
      email: "johndoe@example.com",
      cep: "12345678",
      address: "First Street, 123",
      phoneNumber: "11111111111",
      password: "123456",
      confirmPassword: "123456",
    });

    expect(inMemoryOrganizationsRepository.items).toHaveLength(1);
    expect(inMemoryOrganizationsRepository.items).toEqual([
      expect.objectContaining({ email: "johndoe@example.com" }),
    ]);
  });

  it("should not be able create a organization with different passwords", async () => {
    const result = await sut.execute({
      responsiblePersonName: "John Doe",
      email: "johndoe@example.com",
      cep: "12345678",
      address: "First Street, 123",
      phoneNumber: "11111111111",
      password: "123456",
      confirmPassword: "1234567",
    });

    expect(result).toBeInstanceOf(PasswordDoesNotMatch);

    expect(inMemoryOrganizationsRepository.items).toHaveLength(0);
  });

  it("should not be able create a organization with invalid CEP format", async () => {
    const result = await sut.execute({
      responsiblePersonName: "John Doe",
      email: "johndoe@example.com",
      cep: "12345",
      address: "First Street, 123",
      phoneNumber: "11111111111",
      password: "123456",
      confirmPassword: "123456",
    });

    expect(result).toBeInstanceOf(NotValid);
    expect(inMemoryOrganizationsRepository.items).toHaveLength(0);
  });

  it("should not be able create a organization with invalid phone number format", async () => {
    const result = await sut.execute({
      responsiblePersonName: "John Doe",
      email: "johndoe@example.com",
      cep: "12345",
      address: "First Street, 123",
      phoneNumber: "0011111111111",
      password: "123456",
      confirmPassword: "123456",
    });

    expect(result).toBeInstanceOf(NotValid);
    expect(inMemoryOrganizationsRepository.items).toHaveLength(0);
  });
});
