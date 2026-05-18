---
title: "OpenAPI 4: API documentation and standardization"
description: "OpenAPI 4 brings improvements in types, licensing, reusability, and code generation. New features of the API documentation standard."
date: "2026-05-10"
tags: ["OpenAPI", "API", "Documentation", "Standardization"]
---

OpenAPI 4 is the evolution of the most widely used standard for describing REST APIs. This version introduces significant changes to format, data types, and composition capabilities.

## What's new in OpenAPI 4

OpenAPI 4 adopts JSON Schema 2020-12 as the basis for schema description, replacing earlier JSON Schema versions. This unifies data validation between API specification and data schemas.

**Automatic linting and validation**: the new specification includes stricter validation rules that detect inconsistencies before deployment. Tools like Redocly, Spectral, and Stoplight already support OpenAPI 4.

**Enhanced composition**: `$ref` and reusable components have been improved with support for polymorphism, more expressive oneOf/anyOf, and schema inheritance.

## Practical benefits

With OpenAPI 4, you can generate clients in 40+ languages, interactive documentation (Swagger UI, Redoc, Scalar), contract tests, and server mocks. TypeScript type generation from the specification eliminates duplication between documentation and implementation.

## Ecosystem tools

Tools like `openapi-typescript` generate complete types. `OpenAPI-Generator` produces SDKs. `Zod` can validate requests against OpenAPI schemas at runtime.

OpenAPI 4 makes designing, documenting, and maintaining APIs easier than ever. At Vynta, we apply OpenAPI 4 in all our API projects to guarantee consistency and ease of integration.
