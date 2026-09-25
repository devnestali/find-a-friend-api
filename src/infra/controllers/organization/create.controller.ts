import { CreateOrganizationUseCase } from "@/domain/adoption/application/use-cases/create-organization.js";
import { EmailAlreadyExists } from "@/domain/adoption/application/use-cases/errors/email-already-exists.js";
import { PasswordDoesNotMatch } from "@/domain/adoption/application/use-cases/errors/password-does-not-match.js";
import { PrismaOrganizationsRepository } from "@/infra/repositories/prisma-organizations.repository.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrganizationBodySchema = z.object({
    responsiblePersonName: z.string(),
    email: z.email(),
    cep: z.string().min(8).max(8),
    address: z.string(),
    phoneNumber: z.string().min(11).max(11),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  });

  const {
    responsiblePersonName,
    email,
    address,
    cep,
    phoneNumber,
    password,
    confirmPassword,
  } = createOrganizationBodySchema.parse(request.body);

  if (password !== confirmPassword) {
    const passwordDoesNotMatch = new PasswordDoesNotMatch();

    return reply.status(400).send({
      message: passwordDoesNotMatch.message,
    });
  }

  const organizationsRepository = new PrismaOrganizationsRepository();
  const createOrganizationUseCase = new CreateOrganizationUseCase(
    organizationsRepository,
  );

  const result = await createOrganizationUseCase.execute({
    responsiblePersonName,
    email,
    address,
    cep,
    phoneNumber,
    password,
  });

  if (result instanceof EmailAlreadyExists) {
    return reply.status(409).send({
      message: result.message,
    });
  }

  return reply.status(201).send();
}
