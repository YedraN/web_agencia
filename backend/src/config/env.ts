import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(8000),
  HOST: z.string().default("0.0.0.0"),
  TRUST_PROXY: z.coerce.boolean().default(true),
  ALLOWED_ORIGINS: z
    .string()
    .default("http://localhost:3000")
    .transform((value) => value.split(",").map((item) => item.trim()).filter(Boolean)),
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  PUBLIC_ORGANIZATION_ID: z.string().uuid(),
  AUTH_ACCESS_COOKIE: z.string().default("wa_access_token"),
  AUTH_REFRESH_COOKIE: z.string().default("wa_refresh_token"),
  AUTH_COOKIE_SECURE: z.coerce.boolean().default(false),
  AUTH_COOKIE_SAME_SITE: z.enum(["strict", "lax", "none"]).default("lax"),
  AUTH_COOKIE_DOMAIN: z.string().optional().transform((value) => value || undefined),
});

export type AppEnv = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
