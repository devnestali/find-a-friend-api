import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchNearbyPetsController } from "./factories/make-fetch-nearby-pets-controller.factory.js";
import { NotFoundPetsNearby } from "@/domain/adoption/application/use-cases/errors/not-found-pets-nearby.js";

export async function listNearby(request: FastifyRequest, reply: FastifyReply) {
  const locationQuerySchema = z.object({
    latitude: z.coerce.number().min(-90).max(90),
    longitude: z.coerce.number().min(-180).max(180),
  });

  const { latitude, longitude } = locationQuerySchema.parse(request.query);

  const fetchNearbyPetsUseCase = makeFetchNearbyPetsController();

  const result = await fetchNearbyPetsUseCase.execute({
    cityLatitude: latitude,
    cityLongitude: longitude,
  });

  if (result instanceof NotFoundPetsNearby) {
    return reply.status(404).send({
      message: result.message,
      error: result.cause,
    });
  }

  return reply.status(200).send({
    result,
  });
}
