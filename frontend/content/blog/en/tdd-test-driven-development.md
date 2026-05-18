---
title: "TDD: test-driven development from scratch"
description: "Practical guide to TDD (Test-Driven Development) with TypeScript: Red-Green-Refactor cycle, real examples, and benefits for code quality."
date: "2025-10-02"
tags: ["TDD", "Testing", "TypeScript", "Methodology"]
---

## What is TDD?

Test-Driven Development (TDD) is a methodology where you write tests before production code. The cycle is simple: write a failing test (Red), write the minimum code to pass (Green), and refactor (Refactor).

## The Red-Green-Refactor cycle

1. **Red**: write a test describing the desired behavior. The test fails because the code doesn't exist.
2. **Green**: write the minimum code needed to pass the test. Don't worry about quality yet.
3. **Refactor**: improve the code while keeping tests green. Apply patterns and clean up.

## Practical example

```typescript
// Red: test fails
it('should calculate total with tax', () => {
  expect(calculateTotal(100, 0.21)).toBe(121);
});

// Green: minimum code
function calculateTotal(amount: number, tax: number): number {
  return amount + amount * tax;
}

// Refactor: cleaner expression
function calculateTotal(amount: number, tax: number): number {
  return amount * (1 + tax);
}
```

## Proven benefits

- **Fewer bugs**: testing from the start.
- **Better design**: tests force you to think about the interface before implementation.
- **Refactoring confidence**: tests are your safety net.
- **Living documentation**: tests describe expected behavior.

## TDD is not for everything

TDD shines in complex business logic. It doesn't make sense for simple CRUD or exploratory prototypes.

Want to adopt TDD in your team? At Vynta we train teams in test-driven development.
