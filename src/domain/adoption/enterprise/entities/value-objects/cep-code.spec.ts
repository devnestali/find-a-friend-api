import { CepCode } from "./cep-code.js";
import { NotValid } from "./errors/not-valid.js";

it("should validate a CEP code with exactly 8 digits", () => {
  const cepNumber = "12345678";

  const isCepValid = CepCode.validate(cepNumber);

  expect(isCepValid).toBe(true);
});

it("should not be able to create CEP code that don't have 8 digits.", () => {
  const cepNumber = "123456";

  const createCepCode = CepCode.create(cepNumber);

  expect(createCepCode).toBeInstanceOf(NotValid);
});

it("should be able to create CEP code with 8 digits.", () => {
  const cepNumber = "12345678";

  const createCepCode = CepCode.create(cepNumber);

  expect(createCepCode).toBeInstanceOf(CepCode);
});
