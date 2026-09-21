import type { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import {
  Organization,
  type OrganizationProps,
} from "@/domain/adoption/enterprise/entities/organization.js";

export function makeOrganization(
  override: OrganizationProps,
  id?: UniqueEntityId,
) {
  const organization = Organization.create(
    {
      ...override,
    },
    id,
  );

  return organization;
}
