import type { FastifyReply, FastifyRequest } from "fastify";

import { makeGetOrganizationController } from "./factories/make-get-organization-controller.factory.js";
import { ResourceNotFound } from "@/domain/adoption/application/use-cases/errors/resource-not-found.js";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getOrganizationUseCase = makeGetOrganizationController();

  const { sub: id } = request.user;

  const result = await getOrganizationUseCase.execute({
    id,
  });

  if (result instanceof ResourceNotFound) {
    return reply.status(404).send({
      message: result.message,
      error: result.cause,
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
