---
title: "Mocking: effective patterns for unit tests"
description: "Mocking patterns for unit tests in TypeScript: mocks, stubs, spies and fakes. When to use them and how to avoid over-mocking."
date: "2025-12-16"
tags: ["Mocking", "Testing", "TypeScript", "Patterns"]
---

## What is mocking?

Mocking is the technique of replacing real dependencies with simulated objects during tests. It lets you isolate the unit under test and control external behaviors.

## Types of test doubles

- **Stub**: provides pre-set answers. No logic.
- **Mock**: verifies interactions (how many times called, with what arguments).
- **Spy**: wraps a real object and records calls.
- **Fake**: simplified but functional implementation (e.g., in-memory database).

## Example with Vitest

```typescript
import { vi } from 'vitest';

const mockEmailService = {
  send: vi.fn().mockResolvedValue(true),
};

const service = new NotificationService(mockEmailService);
await service.sendWelcome('user@test.com');
expect(mockEmailService.send).toHaveBeenCalledWith(
  'user@test.com',
  expect.stringContaining('Welcome')
);
```

## Over-mocking: the anti-pattern

Mocking too much makes tests fragile. If you mock 5 dependencies to test a simple function, something is wrong. Ask yourself: am I testing behavior or implementation?

## When not to mock

- Domain value objects and entities.
- Pure functions without side effects.
- Standard language libraries.

## Best practices

- Mock at the outermost possible level.
- Prefer interfaces over concrete classes for easier mocking.
- Use fakes for complex dependencies like databases.

Want to improve your mocking strategy? At Vynta we write effective tests without over-mocking.
