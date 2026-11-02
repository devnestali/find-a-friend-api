import type { FastifyReply, FastifyRequest } from "fastify";

import { makeFetchPetsController } from "./factories/make-fetch-pets-controller.factory.js";

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsUseCase = makeFetchPetsController();

  const result = await fetchPetsUseCase.execute({});

  return reply.status(200).send({
    result,
  });
}
