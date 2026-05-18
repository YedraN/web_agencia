---
title: "Clean Architecture: practical implementation in web projects"
description: "Implement Clean Architecture in web projects with Node.js and TypeScript. Learn to separate layers, manage dependencies, and keep code testable."
date: "2025-04-16"
tags: ["Clean Architecture", "Architecture", "TypeScript", "Node.js"]
---

## What is Clean Architecture?

Clean Architecture, proposed by Robert C. Martin, organizes code in concentric layers. Business rules sit at the center, independent of frameworks, databases, and UI. The key principle: dependencies point inward.

## The main layers

- **Domain**: entities, value objects, and business logic. No external dependencies.
- **Application**: use cases that orchestrate the flow. Depend only on domain.
- **Infrastructure**: concrete implementations (databases, external APIs, email services).
- **Presentation**: controllers, handlers, middlewares, GraphQL resolvers.

## Dependency inversion

Infrastructure depends on interfaces defined in domain/application, not the other way around. This lets you swap databases without touching business logic.

```typescript
// Domain defines the interface
interface UserRepository {
  findById(id: string): Promise<User>;
}

// Infrastructure implements
class PostgresUserRepository implements UserRepository { ... }
```

## DTOs and mappers

Never expose domain entities directly in the API. Use DTOs for external communication and mappers to transform between layers.

## Benefits

- Testable code: domain can be tested without infrastructure.
- Framework-agnostic: switch from Express to Fastify without touching business logic.
- Maintainable: each layer has a clear responsibility.

Need to implement Clean Architecture? At Vynta we design robust and sustainable web architectures.
