import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { clearAuthCookies, setAuthCookies } from "../lib/auth.js";
import { slugify } from "../lib/helpers.js";
import { HttpError } from "../lib/http.js";
import { validateOrThrow } from "../lib/validation.js";
import { getServiceSupabaseClient, createAnonSupabaseClient } from "../services/supabase.js";
import { loadFrontendUser } from "../services/users.js";

const registerSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const authRoutes: FastifyPluginAsync = async (app) => {
  app.post("/api/auth/register", { config: { rateLimit: { max: 5, timeWindow: "1 minute" } } }, async (request, reply) => {
    const body = validateOrThrow(registerSchema, request.body);
    const anonClient = createAnonSupabaseClient();
    const serviceClient = getServiceSupabaseClient();

    const { data, error } = await anonClient.auth.signUp({
      email: body.email,
      password: body.password,
      options: {
        data: {
          full_name: body.name,
        },
      },
    });

    if (error || !data.user) {
      throw new HttpError(400, error?.message ?? "Registration failed");
    }

    const userId = data.user.id;

    const { error: profileError } = await serviceClient.from("profiles").upsert({
      id: userId,
      full_name: body.name,
    });

    if (profileError) {
      throw new HttpError(500, "Failed to create profile", profileError.message);
    }

    const slugBase = slugify(body.company) || "workspace";
    const slug = `${slugBase}-${Math.random().toString(36).slice(2, 8)}`;

    const { data: organization, error: organizationError } = await serviceClient
      .from("organizations")
      .insert({
        name: body.company,
        slug,
      })
      .select("id")
      .single();

    if (organizationError) {
      throw new HttpError(500, "Failed to create organization", organizationError.message);
    }

    const { error: memberError } = await serviceClient.from("organization_members").insert({
      organization_id: organization.id,
      user_id: userId,
      accepted_at: new Date().toISOString(),
    });

    if (memberError) {
      throw new HttpError(500, "Failed to create organization membership", memberError.message);
    }

    if (data.session?.access_token && data.session.refresh_token) {
      setAuthCookies(reply, data.session.access_token, data.session.refresh_token);
    }

    const user = await loadFrontendUser(userId, data.user.email);
    reply.code(201);
    return { user };
  });

  app.post("/api/auth/login", { config: { rateLimit: { max: 10, timeWindow: "1 minute" } } }, async (request, reply) => {
    const body = validateOrThrow(loginSchema, request.body);
    const anonClient = createAnonSupabaseClient();
    const { data, error } = await anonClient.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });

    if (error || !data.user || !data.session) {
      throw new HttpError(401, error?.message ?? "Invalid credentials");
    }

    setAuthCookies(reply, data.session.access_token, data.session.refresh_token);
    const user = await loadFrontendUser(data.user.id, data.user.email);
    return { user };
  });

  app.post("/api/auth/logout", async (_request, reply) => {
    clearAuthCookies(reply);
    return { success: true };
  });
};
