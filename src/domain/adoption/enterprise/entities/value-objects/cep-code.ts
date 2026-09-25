import { NotValid } from "./errors/not-valid.js";

export class CepCode {
  public readonly value: string;

  toString() {
    return this.value;
  }

  private constructor(value: string) {
    this.value = value;
  }

  static create(cep: string): CepCode | NotValid {
    if (!this.validate(cep)) {
      return new NotValid("cep", 8);
    }

    return new CepCode(cep);
  }

  static validate(cep: string): boolean {
    return /^\d{8}$/.test(cep);
  }
}
