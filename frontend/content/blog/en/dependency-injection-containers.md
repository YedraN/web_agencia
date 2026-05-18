---
title: "Dependency Injection: DI containers in TypeScript"
description: "Implement Dependency Injection in TypeScript with DI containers like tsyringe and inversify. Learn to decouple components and simplify testing."
date: "2025-07-16"
tags: ["Dependency Injection", "TypeScript", "Architecture", "Testing"]
---

## What is Dependency Injection?

Dependency Injection is a pattern where a class's dependencies are provided from outside, not created internally. This decouples components, facilitates testing, and makes code more flexible.

## Without DI

```typescript
class UserService {
  private db = new PostgresDatabase(); // Coupled
}
```

## With DI

```typescript
class UserService {
  constructor(private db: Database) {} // Decoupled
}
```

## DI Containers

DI containers automate dependency creation and resolution. You register interfaces with implementations, and the container resolves the entire dependency tree.

## tsyringe

A lightweight container from Microsoft:

```typescript
import { container, injectable, inject } from 'tsyringe';

@injectable()
class UserService {
  constructor(@inject('Database') private db: Database) {}
}
```

## InversifyJS

The most complete container for TypeScript. Supports decorators, middleware, contexts, and more.

## Benefits

- Testing: easily inject mocks.
- Flexibility: swap implementations without modifying code.
- Lifecycle: control whether dependencies are singleton, transient, or scoped.

Want to implement DI in your project? At Vynta we design decoupled and testable architectures.
