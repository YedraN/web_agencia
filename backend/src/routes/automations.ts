import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { getAuthContext, requireAuth } from "../lib/auth.js";
import { HttpError } from "../lib/http.js";
import { mapAutomationStatus } from "../lib/mappers.js";
import { validateOrThrow } from "../lib/validation.js";
import { getServiceSupabaseClient } from "../services/supabase.js";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

const toggleSchema = z.object({
  active: z.boolean(),
});

const configSchema = z.object({
  config: z.record(z.string(), z.unknown()),
});

function buildSuccessRate(runs: Array<{ status: string | null }>) {
  const finishedRuns = runs.filter((run) => ["success", "error"].includes(String(run.status)));
  if (finishedRuns.length === 0) {
    return 0;
  }

  const successfulRuns = finishedRuns.filter((run) => run.status === "success");
  return Number(((successfulRuns.length / finishedRuns.length) * 100).toFixed(1));
}

export const automationRoutes: FastifyPluginAsync = async (app) => {
  app.get("/api/automations", { preHandler: requireAuth }, async (request) => {
    const auth = getAuthContext(request);
    if (!auth.organizationId) {
      throw new HttpError(400, "No organization found for user");
    }

    const serviceClient = getServiceSupabaseClient();
    const { data: automations, error } = await serviceClient
      .from("automations")
      .select("id, name, description, status, config, last_run_at, next_run_at")
      .eq("organization_id", auth.organizationId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new HttpError(500, "Failed to load automations", error.message);
    }

    const automationIds = (automations ?? []).map((automation) => automation.id);
    const { data: runs, error: runsError } = automationIds.length
      ? await serviceClient
          .from("automation_runs")
          .select("automation_id, status")
          .in("automation_id", automationIds)
      : { data: [], error: null };

    if (runsError) {
      throw new HttpError(500, "Failed to load automation runs", runsError.message);
    }

    return (automations ?? []).map((automation) => {
      const relatedRuns = (runs ?? []).filter((run) => run.automation_id === automation.id);
      return {
        id: automation.id,
        name: automation.name,
        description: automation.description ?? "",
        status: mapAutomationStatus(automation.status),
        lastExecution: automation.last_run_at,
        nextExecution: automation.next_run_at,
        successRate: buildSuccessRate(relatedRuns),
        config: automation.config ?? {},
      };
    });
  });

  app.get("/api/automations/:id", { preHandler: requireAuth }, async (request) => {
    const auth = getAuthContext(request);
    const params = validateOrThrow(paramsSchema, request.params);
    if (!auth.organizationId) {
      throw new HttpError(400, "No organization found for user");
    }

    const serviceClient = getServiceSupabaseClient();
    const { data: automation, error } = await serviceClient
      .from("automations")
      .select("id, name, description, status, config, last_run_at, next_run_at")
      .eq("organization_id", auth.organizationId)
      .eq("id", params.id)
      .maybeSingle();

    if (error) {
      throw new HttpError(500, "Failed to load automation", error.message);
    }

    if (!automation) {
      throw new HttpError(404, "Automation not found");
    }

    const { data: runs, error: runsError } = await serviceClient
      .from("automation_runs")
      .select("status")
      .eq("automation_id", automation.id);

    if (runsError) {
      throw new HttpError(500, "Failed to load automation runs", runsError.message);
    }

    return {
      id: automation.id,
      name: automation.name,
      description: automation.description ?? "",
      status: mapAutomationStatus(automation.status),
      lastExecution: automation.last_run_at,
      nextExecution: automation.next_run_at,
      successRate: buildSuccessRate(runs ?? []),
      config: automation.config ?? {},
    };
  });

  app.patch("/api/automations/:id/status", { preHandler: requireAuth }, async (request) => {
    const auth = getAuthContext(request);
    const params = validateOrThrow(paramsSchema, request.params);
    const body = validateOrThrow(toggleSchema, request.body);
    if (!auth.organizationId) {
      throw new HttpError(400, "No organization found for user");
    }

    const serviceClient = getServiceSupabaseClient();
    const newStatus = body.active ? "active" : "paused";
    const { data, error } = await serviceClient
      .from("automations")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("organization_id", auth.organizationId)
      .eq("id", params.id)
      .select("id, name, description, status, config, last_run_at, next_run_at")
      .maybeSingle();

    if (error) {
      throw new HttpError(500, "Failed to update automation status", error.message);
    }

    if (!data) {
      throw new HttpError(404, "Automation not found");
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description ?? "",
      status: mapAutomationStatus(data.status),
      lastExecution: data.last_run_at,
      nextExecution: data.next_run_at,
      successRate: 0,
      config: data.config ?? {},
    };
  });

  app.patch("/api/automations/:id/config", { preHandler: requireAuth }, async (request) => {
    const auth = getAuthContext(request);
    const params = validateOrThrow(paramsSchema, request.params);
    const body = validateOrThrow(configSchema, request.body);
    if (!auth.organizationId) {
      throw new HttpError(400, "No organization found for user");
    }

    const serviceClient = getServiceSupabaseClient();
    const { data, error } = await serviceClient
      .from("automations")
      .update({ config: body.config, updated_at: new Date().toISOString() })
      .eq("organization_id", auth.organizationId)
      .eq("id", params.id)
      .select("id, name, description, status, config, last_run_at, next_run_at")
      .maybeSingle();

    if (error) {
      throw new HttpError(500, "Failed to update automation config", error.message);
    }

    if (!data) {
      throw new HttpError(404, "Automation not found");
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description ?? "",
      status: mapAutomationStatus(data.status),
      lastExecution: data.last_run_at,
      nextExecution: data.next_run_at,
      successRate: 0,
      config: data.config ?? {},
    };
  });
};
