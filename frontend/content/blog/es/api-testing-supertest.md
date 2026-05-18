---
title: "API Testing con Supertest: guía práctica"
description: "Guía práctica de API testing con Supertest y Jest. Aprende a testear endpoints HTTP, validar respuestas y simular autenticación."
date: "2025-11-15"
tags: ["API Testing", "Supertest", "Testing", "Node.js"]
---

## ¿Qué es Supertest?

Supertest es una librería para testear APIs HTTP en Node.js. Se integra con cualquier framework de testing (Jest, Vitest, Mocha) y permite hacer peticiones HTTP a tu aplicación sin necesidad de levantar un servidor real.

## Configuración básica

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

## Testeando diferentes métodos

```typescript
await request(app).post('/api/users').send(userData).expect(201);
await request(app).put(`/api/users/${id}`).send(updateData).expect(200);
await request(app).delete(`/api/users/${id}`).expect(204);
```

## Simulando autenticación

Usa el método `set()` para añadir headers de autenticación:

```typescript
const token = generateTestToken();
await request(app)
  .get('/api/protected')
  .set('Authorization', `Bearer ${token}`)
  .expect(200);
```

## Validación de respuestas

Supertest se integra con expectativas de Jest. Valida status, body, headers y timing.

## Organización de tests

Agrupa tests por recurso. Usa `beforeEach` para resetear datos entre tests.

¿Quieres implementar API testing? En Vynta construimos suites de tests para tus APIs.
