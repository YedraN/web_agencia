import Fastify from "fastify";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import { ZodError } from "zod";
import { env } from "./config/env.js";
import { HttpError } from "./lib/http.js";
import { RequestValidationError } from "./lib/validation.js";
import { healthRoutes } from "./routes/health.js";
import { authRoutes } from "./routes/auth.js";
import { userRoutes } from "./routes/users.js";
import { publicRoutes } from "./routes/public.js";
import { dashboardRoutes } from "./routes/dashboard.js";
import { automationRoutes } from "./routes/automations.js";
import { executionRoutes } from "./routes/executions.js";
import { notificationRoutes } from "./routes/notifications.js";

export async function buildApp() {
  const app = Fastify({ logger: true });

  await app.register(cookie);
  await app.register(cors, {
    origin: env.FRONTEND_URL,
    credentials: true,
  });

  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof RequestValidationError) {
      return reply.status(400).send({
        message: error.message,
        issues: error.issues,
      });
    }

    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: "Validation failed",
        issues: error.issues,
      });
    }

    if (error instanceof HttpError) {
      return reply.status(error.statusCode).send({
        message: error.message,
        details: error.details,
      });
    }

    app.log.error(error);
    return reply.status(500).send({
      message: "Internal server error",
    });
  });

  await app.register(healthRoutes);
  await app.register(authRoutes);
  await app.register(userRoutes);
  await app.register(publicRoutes);
  await app.register(dashboardRoutes);
  await app.register(automationRoutes);
  await app.register(executionRoutes);
  await app.register(notificationRoutes);

  return app;
}
