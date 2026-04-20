import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { env } from "../config/env.js";
import { splitFullName } from "../lib/helpers.js";
import { HttpError } from "../lib/http.js";
import { validateOrThrow } from "../lib/validation.js";
import { getServiceSupabaseClient } from "../services/supabase.js";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional().or(z.literal("")),
  service: z.string().min(1),
  budget: z.string().min(1),
  message: z.string().min(20),
});

const bookingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  topic: z.string().optional().or(z.literal("")),
  date: z.string().min(1),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  timezone: z.string().default("Europe/Madrid"),
  duration: z.number().int().positive().max(240).default(30),
});

function combineDateAndTime(dateValue: string, timeValue: string) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    throw new HttpError(400, "Invalid booking date");
  }

  const [hours, minutes] = timeValue.split(":").map(Number);
  date.setUTCHours(hours, minutes, 0, 0);
  return date.toISOString();
}

export const publicRoutes: FastifyPluginAsync = async (app) => {
  app.post("/api/contact", async (request, reply) => {
    const body = validateOrThrow(contactSchema, request.body);
    const { firstName, lastName } = splitFullName(body.name);
    const serviceClient = getServiceSupabaseClient();

    const { error } = await serviceClient.from("leads").insert({
      organization_id: env.PUBLIC_ORGANIZATION_ID,
      first_name: firstName,
      last_name: lastName,
      email: body.email,
      company: body.company || null,
      message: body.message,
      source: `website:${body.service}`,
      notes: `Service: ${body.service}\nBudget: ${body.budget}`,
      tags: [body.service, `budget:${body.budget}`],
    });

    if (error) {
      throw new HttpError(500, "Failed to create lead", error.message);
    }

    reply.code(201);
    return { success: true };
  });

  app.post("/api/bookings", async (request, reply) => {
    const body = validateOrThrow(bookingSchema, request.body);
    const { firstName, lastName } = splitFullName(body.name);
    const serviceClient = getServiceSupabaseClient();

    const { data: existingLead, error: leadLookupError } = await serviceClient
      .from("leads")
      .select("id")
      .eq("organization_id", env.PUBLIC_ORGANIZATION_ID)
      .eq("email", body.email)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (leadLookupError) {
      throw new HttpError(500, "Failed to lookup lead", leadLookupError.message);
    }

    let leadId = existingLead?.id ?? null;

    if (!leadId) {
      const { data: createdLead, error: createLeadError } = await serviceClient
        .from("leads")
        .insert({
          organization_id: env.PUBLIC_ORGANIZATION_ID,
          first_name: firstName,
          last_name: lastName,
          email: body.email,
          message: body.topic || null,
          source: "website:booking",
          tags: ["booking"],
        })
        .select("id")
        .single();

      if (createLeadError) {
        throw new HttpError(500, "Failed to create lead for booking", createLeadError.message);
      }

      leadId = createdLead.id;
    }

    const { error } = await serviceClient.from("bookings").insert({
      organization_id: env.PUBLIC_ORGANIZATION_ID,
      lead_id: leadId,
      first_name: firstName,
      last_name: lastName,
      email: body.email,
      scheduled_at: combineDateAndTime(body.date, body.time),
      duration_minutes: body.duration,
      timezone: body.timezone,
      notes: body.topic || null,
      company: null,
    });

    if (error) {
      throw new HttpError(500, "Failed to create booking", error.message);
    }

    reply.code(201);
    return { success: true };
  });
};
