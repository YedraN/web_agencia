---
title: "Tactical Domain-Driven Design: entities, value objects and aggregates"
description: "Explore tactical DDD: entities, value objects, aggregates and repositories. Patterns for modeling complex domains with TypeScript."
date: "2025-05-02"
tags: ["DDD", "Domain-Driven Design", "Architecture", "TypeScript"]
---

## Tactical vs Strategic DDD

While strategic DDD focuses on bounded contexts and context maps, tactical DDD provides the building blocks for modeling the domain: entities, value objects, aggregates, repositories, domain services, and events.

## Entities

Entities have their own identity. Two entities with the same attributes but different identity are distinct objects. They are compared by ID, not by value.

```typescript
class User {
  constructor(public readonly id: UserId, public name: string) {}
  equals(other: User): boolean {
    return this.id.equals(other.id);
  }
}
```

## Value Objects

They are immutable and compared by value. They have no identity. Examples: Email, Money, Address.

```typescript
class Email {
  constructor(public readonly value: string) {
    if (!this.isValid(value)) throw new Error('Invalid email');
  }
  private isValid(email: string): boolean { ... }
}
```

## Aggregates

An aggregate is a cluster of entities and value objects treated as a unit. It has a root (aggregate root) that guarantees internal consistency.

## Repositories

They abstract the storage and retrieval of aggregates. The domain defines the interface, infrastructure implements it.

Want to apply tactical DDD in your project? At Vynta we model complex domains with TypeScript.
