---
title: "tRPC: end-to-end types without boilerplate code"
description: "tRPC enables type-safe APIs between client and server without code generation. Learn to build TypeScript APIs with automatically shared types."
date: "2025-04-22"
tags: ["tRPC", "TypeScript", "API", "Type Safety"]
---

## Introduction

tRPC is a framework for building RPC-style APIs where types travel from server to client automatically. No REST, no GraphQL, just TypeScript.

## How it works

You define a router on the server with procedures. The client imports the router type and gets full types automatically without code generation.

## Routes and Procedures

Each procedure can be a query (GET), mutation (POST), or subscription (WebSocket). Inputs and outputs are typed with Zod for automatic validation.

## Authentication

Use middlewares in the router to protect routes. tRPC supports contexts passed to all procedures, ideal for user sessions.

## Next.js Integration

tRPC is the perfect companion for Next.js. Server Components can call tRPC procedures directly from the server without REST APIs.

## Advantages over REST/GraphQL

No type duplication, no GraphQL schemas, no code generation. Errors are types. Responses are types. Everything is TypeScript.

## Conclusion

tRPC is the most productive way to build TypeScript APIs. At **Vynta**, we use it to create end-to-end type-safe applications with minimal boilerplate.
