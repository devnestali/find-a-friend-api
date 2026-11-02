import { FetchPetByIdUseCase } from "@/domain/adoption/application/use-cases/fetch-pet-by-id.js";
import { PrismaPetsRepository } from "@/infra/repositories/prisma-pets.repository.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFetchByIdController } from "./factories/make-fetch-by-id-controller.factory.js";
import { ResourceNotFound } from "@/domain/adoption/application/use-cases/errors/resource-not-found.js";

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const petIdParamSchema = z.object({
    id: z.string().min(1, "Pet ID is required"),
  });

  const { id } = petIdParamSchema.parse(request.params);

  const fetchByIdUseCase = makeFetchByIdController();

  const result = await fetchByIdUseCase.execute({
    id,
  });

  if (result instanceof ResourceNotFound) {
    return reply.status(404).send({
      message: result.message,
      error: result.cause,
    });
  }

  return reply.status(200).send({
    result,
  });
}
