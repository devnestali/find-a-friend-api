import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchPetsByFilterController } from "./factories/make-fetch-pets-by-filter-controller.factory.js";

import { EnergyLevels } from "@/domain/adoption/enterprise/entities/enums/pet-energy-levels.js";
import { PetSize } from "@/domain/adoption/enterprise/entities/enums/pet-size.js";
import { SuitableEnvironments } from "@/domain/adoption/enterprise/entities/enums/pet-suitable-environments.js";
import { IndependenceLevels } from "@/domain/adoption/enterprise/entities/enums/pet-independence-levels.js";

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

  const fetchPetsByFilterUseCase = makeFetchPetsByFilterController();

  const result = await fetchPetsByFilterUseCase.execute(filters);

  return reply.status(200).send({
    result,
  });
}
