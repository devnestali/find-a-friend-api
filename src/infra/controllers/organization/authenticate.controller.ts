import { AuthenticateOrganizationUseCase } from "@/domain/adoption/application/use-cases/authenticate-organization.js";
import { InvalidCredentials } from "@/domain/adoption/application/use-cases/errors/invalid-credentials.js";
import { PrismaOrganizationsRepository } from "@/infra/repositories/prisma-organizations.repository.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const authenticateOrganizationUseCase = new AuthenticateOrganizationUseCase(
    prismaOrganizationsRepository,
  );

  const result = await authenticateOrganizationUseCase.execute({
    email,
    password,
  });

  if (result instanceof InvalidCredentials) {
    return reply.status(401).send({
      message: result.message,
    });
  }

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: result.organization.id.toString(),
      },
    },
  );

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: result.organization.id.toString(),
        expiresIn: "7d",
      },
    },
  );

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    });
}
