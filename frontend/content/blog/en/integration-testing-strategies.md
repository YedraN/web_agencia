---
title: "Integration Testing: strategies for testing integrations"
description: "Integration testing strategies for testing interactions between modules, databases, and external APIs. Practical examples with Supertest and TestContainers."
date: "2025-11-02"
tags: ["Integration Testing", "Testing", "Database", "API"]
---

## What is integration testing?

Integration tests verify that different modules of your application work together correctly. Unlike unit tests, you test real interactions with databases, external APIs, and other services.

## Common strategies

- **Real database**: use TestContainers to spin up databases in Docker containers.
- **API mocking**: tools like nock or MSW intercept HTTP requests.
- **Test slices**: test only the layer you're interested in (e.g., repository only, controller only).

## Example with Supertest

```typescript
import request from 'supertest';
import { app } from '../app';

describe('POST /api/users', () => {
  it('should create a user and return 201', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ email: 'test@test.com', name: 'John' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});
```

## Database with TestContainers

```typescript
const { PostgreSqlContainer } = require('@testcontainers/postgresql');

const container = await new PostgreSqlContainer().start();
const connectionString = container.getConnectionUri();
```

## Testing pyramid

Integration tests occupy the middle level of the pyramid. You should have fewer than unit tests but more than E2E tests. They're slower than unit tests but more reliable than mocks.

Need robust integration testing? At Vynta we design testing strategies for your application.
