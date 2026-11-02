import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { InvalidCredentials } from "@/domain/adoption/application/use-cases/errors/invalid-credentials.js";
import { makeAuthenticateOrganizationController } from "./factories/make-authenticate-organization-controller.factory.js";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  const authenticateOrganizationUseCase =
    makeAuthenticateOrganizationController();

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
