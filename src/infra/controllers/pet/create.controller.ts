import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreatePetController } from "./factories/make-create-pet-controller.factory.js";

import { PetSize } from "@/domain/adoption/enterprise/entities/enums/pet-size.js";
import { EnergyLevels } from "@/domain/adoption/enterprise/entities/enums/pet-energy-levels.js";
import { IndependenceLevels } from "@/domain/adoption/enterprise/entities/enums/pet-independence-levels.js";
import { SuitableEnvironments } from "@/domain/adoption/enterprise/entities/enums/pet-suitable-environments.js";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const petBodySchema = z.object({
    name: z.string().max(20),
    about: z.string(),
    age: z.number().min(0.1).max(20),
    latitude: z.number(),
    longitude: z.number(),
    petSize: z.enum(PetSize),
    energyLevel: z.enum(EnergyLevels),
    independenceLevel: z.enum(IndependenceLevels),
    suitableEnvironment: z.enum(SuitableEnvironments),
    photos: z.array(z.string()),
    adoptionRequirements: z.array(z.string()),
  });

  const {
    name,
    about,
    age,
    latitude,
    longitude,
    petSize,
    energyLevel,
    independenceLevel,
    suitableEnvironment,
    adoptionRequirements,
    photos,
  } = petBodySchema.parse(request.body);

  const createPetUseCase = makeCreatePetController();

  const { sub } = request.user;

  await createPetUseCase.execute({
    organizationId: sub,
    name,
    about,
    age,
    latitude,
    longitude,
    petSize,
    energyLevel,
    independenceLevel,
    suitableEnvironment,
    photos,
    adoptionRequirements,
  });

  return reply.status(201).send();
}
