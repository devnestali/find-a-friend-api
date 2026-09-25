import { Organization } from "../../enterprise/entities/organization.js";
import type { OrganizationsRepository } from "../repositories/organizations.repository.js";
import { ResourceNotFound } from "./errors/resource-not-found.js";

interface GetOrganizationUseCaseRequest {
  id: string;
}

interface GetOrganizationUseCaseResponse {
  organization: Organization;
}

export class GetOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    id,
  }: GetOrganizationUseCaseRequest): Promise<
    GetOrganizationUseCaseResponse | ResourceNotFound
  > {
    const organization = await this.organizationsRepository.findById(id);

    if (!organization) {
      return new ResourceNotFound();
    }

    return {
      organization,
    };
  }
}
