import { EnergyLevels } from "@/domain/adoption/enterprise/entities/enums/pet-energy-levels.js";
import { IndependenceLevels } from "@/domain/adoption/enterprise/entities/enums/pet-independence-levels.js";
import { PetSize } from "@/domain/adoption/enterprise/entities/enums/pet-size.js";
import { SuitableEnvironments } from "@/domain/adoption/enterprise/entities/enums/pet-suitable-environments.js";
import type { FastifySchema } from "fastify";

const petResponseSchema = {
  _id: {
    type: "object",
    properties: {
      value: { type: "string" },
    },
  },

  props: {
    type: "object",
    properties: {
      name: {},
      about: {},

      organizationId: {
        type: "object",
        properties: {
          value: { type: "string" },
        },
      },

      age: { type: "number" },
      latitude: { type: "number" },
      longitude: { type: "number" },

      petSize: {
        type: "string",
        enum: Object.values(PetSize),
      },

      energyLevel: {
        type: "string",
        enum: Object.values(EnergyLevels),
      },

      independenceLevel: {
        type: "string",
        enum: Object.values(IndependenceLevels),
      },

      suitableEnvironment: {
        type: "string",
        enum: Object.values(SuitableEnvironments),
      },

      photos: {
        type: "array",
        items: { type: "string" },
      },

      adoptionRequirements: {
        type: "array",
        items: { type: "string" },
      },
    },
  },
};

export const createPetSchema: FastifySchema = {
  tags: ["Pets"],
  summary: "Create a new pet",
  description:
    "Register a new pet for adoption associated with a authenticated organization",
  security: [{ bearerAuth: [] }],
  body: {
    type: "object",
    required: [
      "name",
      "about",
      "age",
      "latitude",
      "longitude",
      "petSize",
      "energyLevel",
      "independenceLevel",
      "suitableEnvironment",
      "photos",
      "adoptionRequirements",
    ],

    properties: {
      name: {},
      about: {},
      age: { type: "number" },
      latitude: { type: "number" },
      longitude: { type: "number" },
      petSize: { type: "string", enum: Object.values(PetSize) },
      energyLevel: { type: "string", enum: Object.values(EnergyLevels) },
      independenceLevel: {
        type: "string",
        enum: Object.values(IndependenceLevels),
      },
      suitableEnvironment: {
        type: "string",
        enum: Object.values(SuitableEnvironments),
      },
      photos: { type: "array", items: { type: "string" } },
      adoptionRequirements: { type: "array", items: { type: "string" } },
    },
  },

  response: {
    201: {
      description: "Pet created",
      type: "null",
    },
  },
};

export const listNearbyPetsSchema: FastifySchema = {
  tags: ["Pets"],
  summary: "Find nearby pets",
  description: "Retrieve pets within a 10km radius of the provided coordinates",
  security: [{ bearerAuth: [] }],
  querystring: {
    type: "object",
    required: ["latitude", "longitude"],
    properties: {
      latitude: {
        type: "number",
        minimum: -90,
        maximum: 90,
      },
      longitude: {
        type: "number",
        minimum: -180,
        maximum: 180,
      },
    },
  },
  response: {
    200: {
      description: "Nearby pets retrieved.",
      type: "object",
      required: ["result"],
      properties: {
        result: {
          type: "object",
          required: ["pets"],
          properties: {
            pets: {
              type: "array",
              items: {
                type: "object",
                required: ["_id", "props"],
                properties: petResponseSchema,
              },
            },
          },
        },
      },
    },

    404: {
      description: "No pets was found.",
      type: "object",
      required: ["message"],
      properties: {
        message: {
          type: "string",
        },
        error: {
          type: ["string", "null"],
        },
      },
    },
  },
};

export const listPetsSchema: FastifySchema = {
  tags: ["Pets"],
  summary: "Fetch all pets",
  description: "Retrieve all registered pets.",
  security: [{ bearerAuth: [] }],
  response: {
    200: {
      description: "Pets retrieved.",
      type: "object",
      required: ["result"],
      properties: {
        result: {
          type: "object",
          required: ["pets"],
          properties: {
            pets: {
              type: "array",
              items: {
                type: "object",
                required: ["_id", "props"],
                properties: petResponseSchema,
              },
            },
          },
        },
      },
    },
  },
};

export const listPetsByFilterSchema: FastifySchema = {
  tags: ["Pets"],
  summary: "Filter pets",
  description: "Retrieve pets based on optional filters",
  security: [{ bearerAuth: [] }],
  querystring: {
    type: "object",
    properties: {
      age: {
        type: "number",
      },
      petSize: {
        type: "string",
        enum: Object.values(PetSize),
      },
      energyLevel: {
        type: "string",
        enum: Object.values(EnergyLevels),
      },
      independenceLevel: {
        type: "string",
        enum: Object.values(IndependenceLevels),
      },
      suitableEnvironments: {
        type: "string",
        enum: Object.values(SuitableEnvironments),
      },
    },
  },
  response: {
    200: {
      description: "Pets retrieved.",
      type: "object",
      required: ["result"],
      properties: {
        result: {
          type: "object",
          required: ["pets"],
          properties: {
            pets: {
              type: "array",
              items: {
                type: "object",
                required: ["_id", "props"],
                properties: petResponseSchema,
              },
            },
          },
        },
      },
    },
  },
};

export const listPetsByIdSchema: FastifySchema = {
  tags: ["Pets"],
  summary: "Get pet by ID",
  description: "Retrieve a specific pet by its ID",
  security: [{ bearerAuth: [] }],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: {},
    },
  },
  response: {
    200: {
      description: "Pet retrieved successfully",
      type: "object",
      required: ["result"],
      properties: {
        result: {
          type: "object",
          required: ["pet"],
          properties: {
            pet: {
              type: "object",
              required: ["_id", "props"],
              properties: petResponseSchema,
            },
          },
        },
      },
    },
  },
};
