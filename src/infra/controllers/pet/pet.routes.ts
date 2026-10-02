import type { FastifyInstance } from "fastify";
import { create } from "./create.controller.js";
import { verifyJWT } from "@/infra/middlewares/verify-jwt.middleware.js";

export async function petRoutes(app: FastifyInstance) {
  app.post("/pet", { onRequest: [verifyJWT] }, create);
}
