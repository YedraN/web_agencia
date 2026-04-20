import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { getAuthContext, requireAuth } from "../lib/auth.js";
import { HttpError } from "../lib/http.js";
import { validateOrThrow } from "../lib/validation.js";
import { getServiceSupabaseClient } from "../services/supabase.js";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

export const notificationRoutes: FastifyPluginAsync = async (app) => {
  app.get("/api/notifications", { preHandler: requireAuth }, async (request) => {
    const auth = getAuthContext(request);
    if (!auth.organizationId) {
      throw new HttpError(400, "No organization found for user");
    }

    const serviceClient = getServiceSupabaseClient();
    const { data, error } = await serviceClient
      .from("notifications")
      .select("id, title, body, severity, created_at, read_at")
      .eq("organization_id", auth.organizationId)
      .eq("user_id", auth.userId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new HttpError(500, "Failed to load notifications", error.message);
    }

    return (data ?? []).map((notification) => ({
      id: notification.id,
      title: notification.title,
      message: notification.body ?? "",
      severity: notification.severity,
      createdAt: notification.created_at,
      read: Boolean(notification.read_at),
    }));
  });

  app.patch("/api/notifications/:id/read", { preHandler: requireAuth }, async (request) => {
    const auth = getAuthContext(request);
    const params = validateOrThrow(paramsSchema, request.params);
    if (!auth.organizationId) {
      throw new HttpError(400, "No organization found for user");
    }

    const serviceClient = getServiceSupabaseClient();
    const { error } = await serviceClient
      .from("notifications")
      .update({ read_at: new Date().toISOString() })
      .eq("organization_id", auth.organizationId)
      .eq("user_id", auth.userId)
      .eq("id", params.id);

    if (error) {
      throw new HttpError(500, "Failed to mark notification as read", error.message);
    }

    return { success: true };
  });

  app.patch("/api/notifications/read-all", { preHandler: requireAuth }, async (request) => {
    const auth = getAuthContext(request);
    if (!auth.organizationId) {
      throw new HttpError(400, "No organization found for user");
    }

    const serviceClient = getServiceSupabaseClient();
    const { error } = await serviceClient
      .from("notifications")
      .update({ read_at: new Date().toISOString() })
      .eq("organization_id", auth.organizationId)
      .eq("user_id", auth.userId)
      .is("read_at", null);

    if (error) {
      throw new HttpError(500, "Failed to mark all notifications as read", error.message);
    }

    return { success: true };
  });
};
