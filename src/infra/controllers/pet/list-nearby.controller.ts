import { NotFoundPetsNearby } from "@/domain/adoption/application/use-cases/errors/not-found-pets-nearby.js";
import { FetchNearbyPetsUseCase } from "@/domain/adoption/application/use-cases/fetch-nearby-pets.js";
import { PrismaPetsRepository } from "@/infra/repositories/prisma-pets.repository.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listNearby(request: FastifyRequest, reply: FastifyReply) {
  const locationQuerySchema = z.object({
    latitude: z.coerce.number().min(-90).max(90),
    longitude: z.coerce.number().min(-180).max(180),
  });

  const { latitude, longitude } = locationQuerySchema.parse(request.query);

  const prismaPetsRepository = new PrismaPetsRepository();
  const fetchNearbyPetsUseCase = new FetchNearbyPetsUseCase(
    prismaPetsRepository,
  );

  const result = await fetchNearbyPetsUseCase.execute({
    cityLatitude: latitude,
    cityLongitude: longitude,
  });

  if (result instanceof NotFoundPetsNearby) {
    return reply.status(404).send({
      message: result.message,
    });
  }

  return reply.status(200).send({
    result,
  });
}
