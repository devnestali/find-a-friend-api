import type { UseCaseError } from "@/core/errors/use-case-error.js";

export class ResourceNotFound extends Error implements UseCaseError {
  constructor() {
    super("Resource Not Found.");
  }
}
