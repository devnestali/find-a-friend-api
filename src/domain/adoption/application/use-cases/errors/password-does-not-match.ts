import type { UseCaseError } from "@/core/errors/use-case-error.js";

export class PasswordDoesNotMatch extends Error implements UseCaseError {
  constructor() {
    super("Passwords do not match.");
  }
}
