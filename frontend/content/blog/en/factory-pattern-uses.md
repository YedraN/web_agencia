---
title: "Factory Pattern: flexible object creation"
description: "Learn the Factory Pattern in TypeScript: Factory Method and Abstract Factory for flexible, decoupled, and extensible object creation."
date: "2025-06-02"
tags: ["Factory Pattern", "Design Patterns", "TypeScript", "OOP"]
---

## Why use Factory?

When object creation becomes complex, with conditional logic or variable configurations, the Factory pattern encapsulates that complexity. Client code doesn't need to know about concrete classes.

## Simple Factory

Not a GoF pattern, but useful. A function or class centralizes object creation based on a parameter.

```typescript
function createNotification(type: 'email' | 'sms' | 'push'): Notification {
  switch (type) {
    case 'email': return new EmailNotification();
    case 'sms': return new SMSNotification();
    case 'push': return new PushNotification();
  }
}
```

## Factory Method

Defines an interface for creating objects but lets subclasses decide which class to instantiate. Useful when a class can't anticipate the class of objects it must create.

## Abstract Factory

Provides an interface for creating families of related objects without specifying their concrete classes. Perfect when your app needs to work with multiple product variants.

```typescript
interface UIFactory {
  createButton(): Button;
  createInput(): Input;
  createModal(): Modal;
}
```

## Advantages

- Decouples client code from concrete implementations.
- Centralizes creation logic.
- Makes it easy to add new types without modifying existing code (OCP).

Want to improve your design with Factory Pattern? At Vynta we apply patterns that scale.
