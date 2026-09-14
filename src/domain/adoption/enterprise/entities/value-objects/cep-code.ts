export class CepCode {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(cep: string): CepCode {
    if (!this.validate(cep)) {
      throw new Error("CEP must have 8 digits.");
    }

    return new CepCode(cep);
  }

  static validate(cep: string): boolean {
    return /^\d{8}$/.test(cep);
  }
}
