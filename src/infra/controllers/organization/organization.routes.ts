import type { FastifyInstance } from "fastify";
import { create } from "./create.controller.js";
import { authenticate } from "./authenticate.controller.js";

export async function organizationRoutes(app: FastifyInstance) {
  app.post("/organization", create);
  app.post("/session", authenticate);
}
