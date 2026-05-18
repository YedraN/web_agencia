---
title: "Strategy Pattern: interchangeable algorithms"
description: "Guide to the Strategy pattern in TypeScript: define interchangeable algorithms at runtime and eliminate complex conditionals."
date: "2025-07-02"
tags: ["Strategy Pattern", "Design Patterns", "TypeScript", "Algorithms"]
---

## What is the Strategy pattern?

Strategy lets you define a family of algorithms, encapsulate each one, and make them interchangeable. The algorithm can vary independently from the clients that use it. It's the solution to massive conditional blocks.

## Structure

```typescript
interface PaymentStrategy {
  pay(amount: number): Promise<PaymentResult>;
}

class CreditCardStrategy implements PaymentStrategy {
  async pay(amount: number): Promise<PaymentResult> {
    // Credit card payment logic
  }
}

class PayPalStrategy implements PaymentStrategy {
  async pay(amount: number): Promise<PaymentResult> {
    // PayPal payment logic
  }
}
```

## When to use it

When you have multiple algorithm variants and use conditionals to select them. When you need to change behavior at runtime. When you want to isolate complex logic for each variant.

## Practical examples

- Multiple payment methods.
- Different sorting algorithms.
- Data validation strategies.
- Price calculation with discounts.

## Strategy vs State

Strategy is often confused with State. In State, an object changes behavior when its internal state changes. In Strategy, the client chooses which strategy to use and passes it to the context.

Want to eliminate conditionals with Strategy? At Vynta we design clean and maintainable software.
