import type { UseCaseError } from "@/core/errors/use-case-error.js";

export class InvalidCredentials extends Error implements UseCaseError {
  constructor() {
    super("Invalid credentials.");
  }
}
