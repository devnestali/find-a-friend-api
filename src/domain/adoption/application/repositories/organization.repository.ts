import type { Organization } from "../../enterprise/entities/organization.js";

export interface OrganizationsRepository {
  create: (organization: Organization) => Promise<void>;
  findById: (id: string) => Promise<Organization | null>;
  findByEmail: (email: string) => Promise<Organization | null>;
}
