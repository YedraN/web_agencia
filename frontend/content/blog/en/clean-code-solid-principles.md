---
title: "Clean Code: SOLID principles applied"
description: "Practical guide to SOLID principles applied to TypeScript and JavaScript. Real examples of Single Responsibility, Open/Close, Liskov, Interface Segregation and Dependency Inversion."
date: "2025-04-02"
tags: ["Clean Code", "SOLID", "TypeScript", "Architecture"]
---

## What are the SOLID principles?

SOLID is a set of five object-oriented design principles that help you write maintainable, scalable, and testable code. Robert C. Martin popularized them, and today they're fundamental in modern software architecture.

## Single Responsibility (SRP)

A class should have only one reason to change. If a class handles persistence, business logic, and formatting, it has too many responsibilities. Split into specialized classes.

```typescript
// Bad: handles persistence, validation, and email sending
class UserService {
  saveUser(user: User) { ... }
  validateUser(user: User) { ... }
  sendWelcomeEmail(user: User) { ... }
}
```

## Open/Closed (OCP)

Entities should be open for extension but closed for modification. Use interfaces and inheritance to add behavior without modifying existing code.

## Liskov Substitution (LSP)

Subtypes must be substitutable for their base types. If a subclass breaks the expected behavior of the parent class, you're violating LSP.

## Interface Segregation (ISP)

No client should be forced to depend on interfaces they don't use. Prefer small, specific interfaces over a general-purpose one.

## Dependency Inversion (DIP)

High-level modules should not depend on low-level modules. Both should depend on abstractions. Inject dependencies instead of creating them.

Want to apply SOLID in your project? At Vynta we design clean and maintainable architectures.
