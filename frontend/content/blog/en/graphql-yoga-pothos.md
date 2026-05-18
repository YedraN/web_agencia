---
title: "GraphQL Yoga and Pothos: modern GraphQL stack"
description: "Guide to GraphQL Yoga and Pothos: the modern GraphQL server stack with performance, type-safe schemas, and built-in plugins."
date: "2025-07-12"
tags: ["GraphQL", "Pothos", "Yoga", "API"]
---

GraphQL Yoga and Pothos form the most popular stack for building GraphQL servers in 2026. Yoga is the HTTP server and Pothos is the schema builder, offering a powerful and flexible combination.

## GraphQL Yoga

Yoga is a GraphQL server built on top of GraphQL.js that supports HTTP, WebSocket, and SSE. It's compatible with any runtime (Node.js, Deno, Bun, Cloudflare Workers). Yoga includes native support for persisted queries, OpenTelemetry tracing, and official plugins for rate limiting and authentication.

## Pothos (formerly GiraphQL)

Pothos lets you define GraphQL schemas with full TypeScript type safety. Its plugin system (prisma, drizzle, dataloader, relay, validation) extends functionality without complexity. The Prisma plugin integrates your database directly into the GraphQL schema, eliminating boilerplate.

The Yoga + Pothos stack is the community-recommended choice for new GraphQL projects. At Vynta, we build robust and scalable GraphQL APIs with this stack.
