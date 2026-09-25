import type { FastifyInstance } from "fastify";
import { create } from "./create.controller.js";

export async function organizationRoutes(app: FastifyInstance) {
  app.post("/organization", create);
}
