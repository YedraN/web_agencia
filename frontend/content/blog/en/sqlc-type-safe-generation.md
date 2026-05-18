---
title: "SQLC: type-safe code generation for SQL"
description: "SQLC generates type-safe TypeScript/Go code from SQL queries. Practical guide for integrating SQLC into your backend development pipeline."
date: "2025-12-05"
tags: ["SQLC", "TypeScript", "SQL", "Backend"]
---

SQLC is a tool that generates type-safe code from SQL queries. Write plain SQL, SQLC analyzes the queries against your schema and generates fully typed functions in Go, TypeScript, Python, Rust, and more.

## How SQLC works

Define your schema in standard `.sql` migration files. Then write SQL queries with meaningful names. SQLC analyzes them, validates them against the schema, and generates code with automatically inferred types.

For example: `SELECT id, name, email FROM users WHERE id = $1` generates a function `getUser(id: number): Promise<{id: number, name: string, email: string}>`. If the schema changes and the query becomes invalid, SQLC fails at compile time, not in production.

## Advantages over ORMs

SQLC doesn't abstract SQL, it celebrates it. No object-relational mapping layer, no magic methods, no unexpected N+1 queries. Performance equals hand-optimized SQL with the safety of typed languages.

## Integration in TypeScript projects

SQLC integrates easily with any Node.js project. It runs in the build pipeline, generating `.ts` files you import directly. Works with PostgreSQL, MySQL, and SQLite.

If you value control over SQL queries but don't want to lose type safety, SQLC is the tool you've been waiting for. At Vynta, we apply SQLC in projects where database performance is critical.
