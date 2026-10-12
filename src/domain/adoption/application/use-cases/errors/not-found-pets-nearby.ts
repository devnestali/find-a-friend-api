import type { UseCaseError } from "@/core/errors/use-case-error.js";

export class NotFoundPetsNearby extends Error implements UseCaseError {
  constructor() {
    super("There is no pets nearby the location.");
  }
}
