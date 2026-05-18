---
title: "GraphQL Yoga y Pothos: stack moderno para GraphQL"
description: "Guía de GraphQL Yoga y Pothos: el stack moderno para servidores GraphQL con rendimiento, tipado seguro y plugins integrados."
date: "2025-07-12"
tags: ["GraphQL", "Pothos", "Yoga", "API"]
---

GraphQL Yoga y Pothos forman el stack más popular para construir servidores GraphQL en 2026. Yoga es el servidor HTTP y Pothos el schema builder, ofreciendo una combinación potente y flexible.

## GraphQL Yoga

Yoga es un servidor GraphQL construido sobre GraphQL.js que soporta HTTP, WebSocket y SSE. Es compatible con cualquier runtime (Node.js, Deno, Bun, Cloudflare Workers). Yoga incluye soporte nativo para persistir consultas, tracing con OpenTelemetry y plugins oficiales para rate limiting y autenticación.

## Pothos (antes GiraphQL)

Pothos permite definir esquemas GraphQL con tipado TypeScript completo. Su sistema de plugins (prisma, drizzle, dataloader, relay, validation) extiende la funcionalidad sin complejidad. El plugin de Prisma integra tu base de datos directamente en el schema GraphQL, eliminando código boilerplate.

El stack Yoga + Pothos es la opción recomendada por la comunidad GraphQL para proyectos nuevos. En Vynta implementamos APIs GraphQL robustas y escalables con este stack.
