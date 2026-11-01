import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { PrismaPetsRepository } from "@/infra/repositories/prisma-pets.repository.js";

import { EnergyLevels } from "@/domain/adoption/enterprise/entities/enums/pet-energy-levels.js";
import { PetSize } from "@/domain/adoption/enterprise/entities/enums/pet-size.js";
import { SuitableEnvironments } from "@/domain/adoption/enterprise/entities/enums/pet-suitable-environments.js";
import { IndependenceLevels } from "@/domain/adoption/enterprise/entities/enums/pet-independence-levels.js";
import { FetchPetsByFilterUseCase } from "@/domain/adoption/application/use-cases/fetch-pets-by-filter.js";

export async function listByFilter(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const filterQuerySchema = z.object({
    age: z.coerce.number().min(0).exactOptional(),
    petSize: z.enum(PetSize).exactOptional(),
    energyLevel: z.enum(EnergyLevels).exactOptional(),
    independenceLevel: z.enum(IndependenceLevels).exactOptional(),
    suitableEnvironment: z.enum(SuitableEnvironments).exactOptional(),
  });

  const filters = filterQuerySchema.parse(request.query);

  const prismaPetsRepository = new PrismaPetsRepository();
  const fetchPetsByFilterUseCase = new FetchPetsByFilterUseCase(
    prismaPetsRepository,
  );

  const result = await fetchPetsByFilterUseCase.execute(filters);

  return reply.status(200).send({
    result,
  });
}
