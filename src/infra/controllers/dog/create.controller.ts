import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { CreateDogUseCase } from "@/domain/adoption/application/use-cases/create-dog.js";
import { PrismaDogsRepository } from "@/infra/repositories/prisma-dogs.repository.js";
import { PrismaOrganizationsRepository } from "@/infra/repositories/prisma-organizations.repository.js";

import { DogSize } from "@/domain/adoption/enterprise/entities/enums/dog-size.js";
import { EnergyLevels } from "@/domain/adoption/enterprise/entities/enums/dog-energy-levels.js";
import { IndependenceLevels } from "@/domain/adoption/enterprise/entities/enums/dog-independence-levels.js";
import { SuitableEnvironments } from "@/domain/adoption/enterprise/entities/enums/dog-suitable-environments.js";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const dogBodySchema = z.object({
    name: z.string().max(20),
    about: z.string(),
    age: z.number().min(0.1).max(20),
    latitude: z.number(),
    longitude: z.number(),
    dogSize: z.enum(DogSize),
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
    dogSize,
    energyLevel,
    independenceLevel,
    suitableEnvironment,
    adoptionRequirements,
    photos,
  } = dogBodySchema.parse(request.body);

  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const prismaDogsRepository = new PrismaDogsRepository();

  const createDogUseCase = new CreateDogUseCase(
    prismaOrganizationsRepository,
    prismaDogsRepository,
  );

  const { sub } = request.user;

  await createDogUseCase.execute({
    organizationId: sub,
    name,
    about,
    age,
    latitude,
    longitude,
    dogSize,
    energyLevel,
    independenceLevel,
    suitableEnvironment,
    photos,
    adoptionRequirements,
  });

  return reply.status(201).send();
}
