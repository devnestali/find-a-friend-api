import type { FastifyInstance } from "fastify";
import { create } from "./create.controller.js";
import { verifyJWT } from "@/infra/middlewares/verify-jwt.middleware.js";
import { listNearby } from "./list-nearby.controller.js";
import { list } from "./list.controller.js";
import { listByFilter } from "./list-by-filter.controller.js";
import { getPet } from "./get-pet.controller.js";
import {
  createPetSchema,
  listPetsByFilterSchema,
  listNearbyPetsSchema,
  listPetsSchema,
  listPetsByIdSchema,
} from "@/infra/docs/pet-schemas.js";

export async function petRoutes(app: FastifyInstance) {
  app.post("/pet", { onRequest: [verifyJWT], schema: createPetSchema }, create);
  app.get(
    "/pets/nearby",
    { onRequest: [verifyJWT], schema: listNearbyPetsSchema },
    listNearby,
  );
  app.get("/pets", { onRequest: [verifyJWT], schema: listPetsSchema }, list);
  app.get(
    "/pets/filter",
    { onRequest: [verifyJWT], schema: listPetsByFilterSchema },
    listByFilter,
  );
  app.get(
    "/pet/:id",
    { onRequest: [verifyJWT], schema: listPetsByIdSchema },
    getPet,
  );
}
