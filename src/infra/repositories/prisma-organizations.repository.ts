import type { OrganizationsRepository } from "@/domain/adoption/application/repositories/organization.repository.js";
import type { Organization } from "@/domain/adoption/enterprise/entities/organization.js";
import { prisma } from "../database/prisma.js";
import { OrganizationMapper } from "../utils/organization-mapper.js";

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create(organization: Organization): Promise<void> {
    await prisma.organization.create({
      data: {
        id: organization.id.toString(),
        responsiblePersonName: organization.responsiblePersonName,
        email: organization.email,
        address: organization.address,
        cep: organization.cep.toString(),
        phoneNumber: organization.phoneNumber.toString(),
        password: organization.password,
      },
    });
  }
  async findById(id: string): Promise<Organization | null> {}

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = await prisma.organization.findFirst({
      where: {
        email,
      },
    });

    if (!organization) return null;

    return OrganizationMapper.prismaToDomain(organization);
  }
}
