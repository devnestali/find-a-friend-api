import { NotValid } from "./errors/not-valid.js";

export class PhoneNumber {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(phone: string): PhoneNumber | NotValid {
    if (!this.validate(phone)) {
      return new NotValid("phone", 11);
    }

    return new PhoneNumber(phone);
  }

  static validate(phone: string): boolean {
    return /^\d{11}$/.test(phone);
  }
}
