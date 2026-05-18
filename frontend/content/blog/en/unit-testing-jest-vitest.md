---
title: "Unit testing with Jest and Vitest: complete guide"
description: "Complete guide to unit testing with Jest and Vitest. Configuration, mocks, coverage, and best practices for effective unit tests."
date: "2025-08-02"
tags: ["Testing", "Jest", "Vitest", "Code Quality"]
---

## Jest vs Vitest

Jest has been the dominant JavaScript testing framework for years. Vitest is its modern competitor, compatible with Vite configuration and significantly faster. Both share a similar API, making migration straightforward.

## Basic setup with Vitest

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
});
```

## Test structure

```typescript
describe('UserService', () => {
  it('should create a valid user', async () => {
    const user = await userService.create({ email: 'test@test.com' });
    expect(user.email).toBe('test@test.com');
    expect(user.id).toBeDefined();
  });
});
```

## Mocks and spies

Mocks isolate the unit under test. Vitest provides `vi.mock()`, `vi.spyOn()`, and `vi.fn()` to simulate dependencies.

```typescript
vi.mock('../database');
const mockDb = vi.mocked(database);
mockDb.save.mockResolvedValue({ id: '1' });
```

## Coverage

Coverage measures what percentage of code runs during tests. Use it as a guide, not a target. 100% coverage doesn't guarantee correct code.

Need to set up testing in your project? At Vynta we establish quality pipelines with Jest and Vitest.
