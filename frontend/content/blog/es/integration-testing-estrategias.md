---
title: "Integration Testing: estrategias para testear integraciones"
description: "Estrategias de integration testing para testear la interacción entre módulos, bases de datos y APIs externas. Ejemplos prácticos con Supertest y TestContainers."
date: "2025-11-01"
tags: ["Integration Testing", "Testing", "Base de datos", "API"]
---

## ¿Qué es integration testing?

Los tests de integración verifican que los diferentes módulos de tu aplicación funcionen correctamente juntos. A diferencia de los unit tests, aquí pruebas la interacción real con bases de datos, APIs externas y otros servicios.

## Estrategias comunes

- **Base de datos real**: usa TestContainers para levantar bases de datos en contenedores Docker.
- **API mocking**: herramientas como nock o MSW interceptan peticiones HTTP.
- **Test slices**: Spring Boot popularizó este enfoque; testea solo la capa que te interesa (ej: solo repositorio, solo controlador).

## Ejemplo con Supertest

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

## Base de datos con TestContainers

```typescript
const { PostgreSqlContainer } = require('@testcontainers/postgresql');

const container = await new PostgreSqlContainer().start();
const connectionString = container.getConnectionUri();
```

## Pirámide de testing

Los integration tests ocupan el nivel medio de la pirámide. Deberías tener menos que unit tests pero más que E2E. Son más lentos que unitarios pero más confiables que mocks.

¿Necesitas integration testing robusto? En Vynta diseñamos estrategias de testing para tu aplicación.
