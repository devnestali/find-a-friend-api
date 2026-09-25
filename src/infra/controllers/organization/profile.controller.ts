import { ResourceNotFound } from "@/domain/adoption/application/use-cases/errors/resource-not-found.js";
import { GetOrganizationUseCase } from "@/domain/adoption/application/use-cases/get-organization.js";
import { PrismaOrganizationsRepository } from "@/infra/repositories/prisma-organizations.repository.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const getOrganizationUseCase = new GetOrganizationUseCase(
    prismaOrganizationsRepository,
  );

  const { sub: id } = request.user;

  const result = await getOrganizationUseCase.execute({
    id,
  });

  if (result instanceof ResourceNotFound) {
    return reply.status(404).send({
      message: result.message,
    });
  }

  const { organization } = result;

  return reply.status(200).send({
    organization: {
      responsiblePersonName: organization.responsiblePersonName,
      email: organization.email,
      address: organization.address,
      cep: organization.cep.toString(),
      phoneNumber: organization.phoneNumber.toString(),
    },
  });
}
