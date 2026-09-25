import type { FastifyInstance } from "fastify";
import { create } from "./create.controller.js";
import { authenticate } from "./authenticate.controller.js";
import { refresh } from "./refresh.controller.js";
import { verifyJWT } from "@/infra/middlewares/verify-jwt.middleware.js";
import { profile } from "./profile.controller.js";

export async function organizationRoutes(app: FastifyInstance) {
  app.post("/organization", create);
  app.post("/session", authenticate);
  app.patch("/token/refresh", refresh);

  // Authenticated Routes
  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
