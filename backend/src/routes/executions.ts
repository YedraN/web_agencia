import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { getAuthContext, requireAuth } from "../lib/auth.js";
import { HttpError } from "../lib/http.js";
import { mapRunStatus } from "../lib/mappers.js";
import { validateOrThrow } from "../lib/validation.js";
import { getServiceSupabaseClient } from "../services/supabase.js";

const querySchema = z.object({
  automationId: z.string().uuid().optional(),
  status: z.string().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

export const executionRoutes: FastifyPluginAsync = async (app) => {
  app.get("/api/executions", { preHandler: requireAuth }, async (request) => {
    const auth = getAuthContext(request);
    const query = validateOrThrow(querySchema, request.query);
    if (!auth.organizationId) {
      throw new HttpError(400, "No organization found for user");
    }

    const serviceClient = getServiceSupabaseClient();
    let dbQuery = serviceClient
      .from("automation_runs")
      .select("id, automation_id, status, started_at, duration_ms, logs, error_message, output, automations(name)")
      .eq("organization_id", auth.organizationId)
      .order("created_at", { ascending: false })
      .limit(query.limit ?? 50);

    if (query.automationId) {
      dbQuery = dbQuery.eq("automation_id", query.automationId);
    }

    if (query.status) {
      dbQuery = dbQuery.eq("status", query.status);
    }

    const { data, error } = await dbQuery;
    if (error) {
      throw new HttpError(500, "Failed to load executions", error.message);
    }

    return (data ?? []).map((run: any) => {
      const firstLog = Array.isArray(run.logs) && run.logs.length > 0 ? run.logs[0] : null;
      const automationName = Array.isArray(run.automations)
        ? run.automations[0]?.name
        : run.automations?.name;

      return {
        id: run.id,
        automationId: run.automation_id,
        automationName: automationName ?? "Automation",
        startTime: run.started_at,
        durationMs: run.duration_ms ?? 0,
        status: mapRunStatus(run.status),
        logPreview: typeof firstLog === "string" ? firstLog : run.error_message ?? "",
        fullLog: run.output ?? { logs: run.logs ?? [] },
      };
    });
  });
};
