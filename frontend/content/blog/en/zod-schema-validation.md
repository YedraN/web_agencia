---
title: "Zod: TypeScript schema validation at runtime"
description: "Zod is a TypeScript schema validation library with automatic type inference. Learn to validate data at runtime with full type safety."
date: "2025-04-15"
tags: ["Zod", "TypeScript", "Validation", "Schemas"]
---

## Introduction

Zod is a schema validation library for TypeScript that automatically infers types from your schemas. Forget about writing duplicate types.

## Why Zod

Unlike Yup or Joi, Zod is designed for TypeScript from the start. Types are automatically inferred with `z.infer<typeof schema>`, no duplicated types.

## Basic Schemas

`z.string()`, `z.number()`, `z.object({ name: z.string() })`. Zod supports all JavaScript types plus complex types like unions, tuples, and discriminated unions.

## API Validation

Use Zod to validate API responses, forms, or environment variables. A Zod schema gives you type safety and runtime validation in one place.

## Refinements and Transforms

`z.string().email()` validates emails. `z.string().transform(s => s.trim())` transforms data. Create custom validations with `.refine()`.

## Framework Integration

Zod integrates with tRPC, Next.js Server Actions, and React forms. It's the most popular validation library in the TypeScript ecosystem.

## Conclusion

Zod simplifies data validation with automatically inferred types. At **Vynta**, we use it in all our TypeScript projects for added safety.
