import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.coerce.string(),
  JWT_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid environment variable.", _env.error);

  throw new Error("Invalid environment variable.");
}

export const env = _env.data;
