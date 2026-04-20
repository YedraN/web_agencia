import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { getAuthContext, requireAuth } from "../lib/auth.js";
import { validateOrThrow } from "../lib/validation.js";
import { updateFrontendUser, loadFrontendUser } from "../services/users.js";

const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  company: z.string().min(1).optional(),
  avatarUrl: z.string().url().optional(),
}).refine((value) => Object.keys(value).length > 0, {
  message: "At least one field must be provided",
});

export const userRoutes: FastifyPluginAsync = async (app) => {
  app.get("/api/users/me", { preHandler: requireAuth }, async (request) => {
    const auth = getAuthContext(request);
    return loadFrontendUser(auth.userId, auth.email);
  });

  app.patch("/api/users/me", { preHandler: requireAuth }, async (request) => {
    const body = validateOrThrow(updateProfileSchema, request.body);
    const auth = getAuthContext(request);
    return updateFrontendUser(auth.userId, body, auth.email);
  });
};
