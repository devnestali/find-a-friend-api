import type { ValueObjectsError } from "@/core/errors/value-objects-error.js";

export class NotValid extends Error implements ValueObjectsError {
  constructor(fieldName: string, value: number) {
    super(`${fieldName} must have ${value} digits.`);
  }
}
