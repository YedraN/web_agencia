---
title: "API Testing with Supertest: practical guide"
description: "Practical guide to API testing with Supertest and Jest. Learn to test HTTP endpoints, validate responses, and simulate authentication."
date: "2025-11-16"
tags: ["API Testing", "Supertest", "Testing", "Node.js"]
---

## What is Supertest?

Supertest is a library for testing HTTP APIs in Node.js. It integrates with any testing framework (Jest, Vitest, Mocha) and lets you make HTTP requests to your application without starting a real server.

## Basic setup

```typescript
import request from 'supertest';
import { app } from '../app';

describe('GET /api/health', () => {
  it('should return 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
```

## Testing different methods

```typescript
await request(app).post('/api/users').send(userData).expect(201);
await request(app).put(`/api/users/${id}`).send(updateData).expect(200);
await request(app).delete(`/api/users/${id}`).expect(204);
```

## Simulating authentication

Use the `set()` method to add authentication headers:

```typescript
const token = generateTestToken();
await request(app)
  .get('/api/protected')
  .set('Authorization', `Bearer ${token}`)
  .expect(200);
```

## Response validation

Supertest integrates with Jest matchers. Validate status, body, headers, and timing.

Want to implement API testing? At Vynta we build test suites for your APIs.
