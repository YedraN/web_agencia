import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(8000),
  HOST: z.string().default("0.0.0.0"),
  FRONTEND_URL: z.string().url().default("http://localhost:3000"),
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  PUBLIC_ORGANIZATION_ID: z.string().uuid(),
  AUTH_ACCESS_COOKIE: z.string().default("wa_access_token"),
  AUTH_REFRESH_COOKIE: z.string().default("wa_refresh_token"),
});

export type AppEnv = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
