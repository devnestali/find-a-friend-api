export class PhoneNumber {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(phone: string) {
    if (!this.validate(phone)) {
      throw new Error("Phone number must have 11 digits.");
    }

    return new PhoneNumber(phone);
  }

  static validate(phone: string): boolean {
    return /^\d{11}$/.test(phone);
  }
}
