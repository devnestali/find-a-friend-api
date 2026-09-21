import type { OrganizationsRepository } from "@/domain/adoption/application/repositories/organization.repository.js";
import type { Organization } from "@/domain/adoption/enterprise/entities/organization.js";

export class InMemoryOrganizationsRepository implements OrganizationsRepository {
  public items: Organization[] = [];

  async create(organization: Organization): Promise<void> {
    this.items.push(organization);
  }

  async findById(id: string): Promise<Organization | null> {
    const item = this.items.find((item) => item.id.toString() === id);

    if (!item) return null;

    return item;
  }
}
