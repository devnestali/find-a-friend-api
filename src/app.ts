import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { z, ZodError } from "zod";

import { organizationRoutes } from "./infra/controllers/organization/organization.routes.js";
import { petRoutes } from "./infra/controllers/pet/pet.routes.js";

import { env } from "./core/env/index.js";
import { swaggerDocs } from "./infra/plugins/swagger.js";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

app.register(swaggerDocs);

app.register(organizationRoutes);
app.register(petRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error",
      issues: z.treeifyError(error),
    });
  }
});
