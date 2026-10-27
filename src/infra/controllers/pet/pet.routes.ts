import type { FastifyInstance } from "fastify";
import { create } from "./create.controller.js";
import { verifyJWT } from "@/infra/middlewares/verify-jwt.middleware.js";
import { listNearby } from "./list-nearby.controller.js";
import { list } from "./list.controller.js";

export async function petRoutes(app: FastifyInstance) {
  app.post("/pet", { onRequest: [verifyJWT] }, create);
  app.get("/pets/nearby", { onRequest: [verifyJWT] }, listNearby);
  app.get("/pets", { onRequest: [verifyJWT] }, list);
}
