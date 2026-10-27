import { FetchPetsUseCase } from "@/domain/adoption/application/use-cases/fetch-pets.js";
import { PrismaPetsRepository } from "@/infra/repositories/prisma-pets.repository.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const prismaPetsRepository = new PrismaPetsRepository();
  const fetchPetsUseCase = new FetchPetsUseCase(prismaPetsRepository);

  const result = await fetchPetsUseCase.execute({});

  return reply.status(200).send({
    result,
  });
}
