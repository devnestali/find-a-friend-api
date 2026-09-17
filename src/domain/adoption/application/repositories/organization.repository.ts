import type { Organization } from "../../enterprise/entities/organization.js";

export interface OrganizationsRepository {
  create: (organization: Organization) => Promise<void>;
  delete: (organization: Organization) => Promise<void>;
  save: (organization: Organization) => Promise<void>;
  findById: (id: string) => Promise<Organization | null>;
}
