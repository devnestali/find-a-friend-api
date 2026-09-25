import type { UseCaseError } from "@/core/errors/use-case-error.js";

export class EmailAlreadyExists extends Error implements UseCaseError {
  constructor() {
    super("E-mail already exists.");
  }
}
