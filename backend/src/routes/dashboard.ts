import type { FastifyPluginAsync } from "fastify";
import { getAuthContext, requireAuth } from "../lib/auth.js";
import { HttpError } from "../lib/http.js";
import { getServiceSupabaseClient } from "../services/supabase.js";

export const dashboardRoutes: FastifyPluginAsync = async (app) => {
  app.get("/api/dashboard/stats", { preHandler: requireAuth }, async (request) => {
    const auth = getAuthContext(request);
    if (!auth.organizationId) {
      throw new HttpError(400, "No organization found for user");
    }

    const serviceClient = getServiceSupabaseClient();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const [automationsResult, runsResult, notificationsResult] = await Promise.all([
      serviceClient
        .from("automations")
        .select("id", { count: "exact", head: true })
        .eq("organization_id", auth.organizationId)
        .eq("status", "active"),
      serviceClient
        .from("automation_runs")
        .select("status, started_at")
        .eq("organization_id", auth.organizationId)
        .gte("started_at", todayStart.toISOString()),
      serviceClient
        .from("notifications")
        .select("id", { count: "exact", head: true })
        .eq("organization_id", auth.organizationId)
        .eq("user_id", auth.userId)
        .is("read_at", null),
    ]);

    if (automationsResult.error) {
      throw new HttpError(500, "Failed to load active automations", automationsResult.error.message);
    }

    if (runsResult.error) {
      throw new HttpError(500, "Failed to load executions", runsResult.error.message);
    }

    if (notificationsResult.error) {
      throw new HttpError(500, "Failed to load notifications", notificationsResult.error.message);
    }

    const finishedRuns = (runsResult.data ?? []).filter((run) => ["success", "error"].includes(String(run.status)));
    const successfulRuns = finishedRuns.filter((run) => run.status === "success");
    const successRate = finishedRuns.length > 0 ? Number(((successfulRuns.length / finishedRuns.length) * 100).toFixed(1)) : 0;

    return {
      activeAutomations: automationsResult.count ?? 0,
      executionsToday: runsResult.data?.length ?? 0,
      successRate,
      pendingAlerts: notificationsResult.count ?? 0,
    };
  });
};
