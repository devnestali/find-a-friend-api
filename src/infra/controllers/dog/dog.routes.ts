import type { FastifyInstance } from "fastify";
import { create } from "./create.controller.js";
import { verifyJWT } from "@/infra/middlewares/verify-jwt.middleware.js";

export async function dogRoutes(app: FastifyInstance) {
  app.post("/dog", { onRequest: [verifyJWT] }, create);
}
