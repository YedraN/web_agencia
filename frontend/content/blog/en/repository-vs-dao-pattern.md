---
title: "Repository vs DAO: differences and when to use each pattern"
description: "Repository and DAO are different data access patterns. Learn their differences, advantages, and when to use each one in your projects."
date: "2025-05-16"
tags: ["Repository", "DAO", "Design Patterns", "Database"]
---

## Common confusion

Repository and DAO are often used interchangeably, but they are different patterns with different intentions. DAO persists complete objects. Repository abstracts storage and only works with domain aggregates.

## DAO (Data Access Object)

DAO encapsulates access to a data source. There's typically one DAO per database entity. It exposes CRUD operations directly.

```typescript
interface UserDao {
  findById(id: number): UserRow;
  save(user: UserRow): void;
  delete(id: number): void;
}
```

## Repository

Repository acts as an in-memory collection of domain aggregates. Only aggregate roots have a repository. The language is domain-oriented, not database-oriented.

```typescript
interface UserRepository {
  findByEmail(email: Email): User;
  add(user: User): void;
  remove(userId: UserId): void;
}
```

## When to use each

Use DAO when working with ActiveRecord or simple CRUD without complex domain logic. Use Repository when you have DDD, Clean Architecture, or rich business logic.

## You can combine them

It's common for a Repository to internally use one or more DAOs to populate complex aggregates from multiple tables.

Unsure which pattern to use? At Vynta we advise on data access architecture.
