import fastify from "fastify";
import { organizationRoutes } from "./infra/controllers/organization/organization.routes.js";

export const app = fastify();

app.register(organizationRoutes);
