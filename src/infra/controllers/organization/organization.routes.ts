import type { FastifyInstance } from "fastify";
import { create } from "./create.controller.js";
import { authenticate } from "./authenticate.controller.js";
import { refresh } from "./refresh.controller.js";
import { verifyJWT } from "@/infra/middlewares/verify-jwt.middleware.js";
import { profile } from "./profile.controller.js";
import {
  authenticateOrganizationSchema,
  createOrganizationSchema,
  getOrganizationProfileSchema,
  refreshTokenOrganizationSchema,
} from "@/infra/docs/organization-schemas.js";

export async function organizationRoutes(app: FastifyInstance) {
  app.post("/organization", { schema: createOrganizationSchema }, create);
  app.post(
    "/session",
    { schema: authenticateOrganizationSchema },
    authenticate,
  );
  app.patch(
    "/token/refresh",
    { schema: refreshTokenOrganizationSchema },
    refresh,
  );

  // Authenticated Routes
  app.get(
    "/me",
    { onRequest: [verifyJWT], schema: getOrganizationProfileSchema },
    profile,
  );
}
