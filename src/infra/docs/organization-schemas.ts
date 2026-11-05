import type { FastifySchema } from "fastify";

export const createOrganizationSchema: FastifySchema = {
  tags: ["Organization"],
  summary: "Create a new organization",
  description:
    "Register a new organization responsible for managing pets available for adoption",
  body: {
    type: "object",
    required: [
      "responsiblePersonName",
      "email",
      "cep",
      "address",
      "phoneNumber",
      "password",
      "confirmPassword",
    ],

    properties: {
      responsiblePersonName: {},
      email: {},
      cep: {},
      address: {},
      phoneNumber: {},
      password: {},
      confirmPassword: {},
    },
  },

  response: {
    201: {
      description: "Organization created",
      type: "null",
    },
    400: {
      description: "Passwords do not match",
      type: "object",
      properties: {
        message: { type: "string" },
        error: { type: ["string", "null"] },
      },
    },
    409: {
      description: "Email already exists",
      type: "object",
      properties: {
        message: { type: "string" },
        error: { type: ["string", "null"] },
      },
    },
  },
};

export const authenticateOrganizationSchema: FastifySchema = {
  tags: ["Organization"],
  summary: "Authenticate a organization",
  description: "Authenticate a organization using JWT token",
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {},
      password: {},
    },
  },
  response: {
    401: {
      description: "Invalid Credentials",
      type: "object",
      properties: {
        message: { type: "string" },
        error: { type: ["string", "null"] },
      },
    },

    200: {
      description: "Organization authenticated",
      type: "object",
      properties: {
        token: { type: "string" },
      },
    },
  },
};

export const refreshTokenOrganizationSchema: FastifySchema = {
  tags: ["Organization"],
  summary: "Refresh access token",
  description:
    "Generate a new token and refresh token using the refreshToken cookie",
  security: [{ cookieAuth: [] }],
  response: {
    200: {
      description: "Tokens refreshed",
      type: "object",
      required: ["token"],
      properties: {
        token: { type: "string" },
      },
    },
  },
};

export const getOrganizationProfileSchema: FastifySchema = {
  tags: ["Organization"],
  summary: "Get organization profile",
  description:
    "Retrieve the information of the current organization authenticated",
  security: [{ bearerAuth: [] }],
  response: {
    200: {
      description: "Organization retrieved",
      type: "object",
      required: ["organization"],
      properties: {
        organization: {
          type: "object",
          required: [
            "responsiblePersonName",
            "email",
            "address",
            "cep",
            "phoneNumber",
          ],
          properties: {
            responsiblePersonName: {},
            email: {},
            address: {},
            cep: {},
            phoneNumber: {},
          },
        },
      },
    },

    401: {
      description: "Unauthorized",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },

    404: {
      description: "Not found",
      type: "object",
      properties: {
        message: { type: "string" },
        error: { type: ["string", "null"] },
      },
    },
  },
};
