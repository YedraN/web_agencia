---
title: "Swagger: interactive API documentation"
description: "Document your REST APIs with Swagger. Configuration, customization, Express integration, and best practices for effective documentation."
date: "2026-02-11"
tags: ["Swagger", "OpenAPI", "Documentation", "API"]
---

## What is Swagger?

Swagger is a set of tools around the OpenAPI specification. It lets you design, document, and consume REST APIs. swagger-ui generates an interactive interface where users can test endpoints directly.

## Express setup

```bash
npm install swagger-jsdoc swagger-ui-express
```

```typescript
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'API Docs', version: '1.0.0' },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

## Documenting endpoints

```typescript
/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/users', (req, res) => { ... });
```

## Benefits

- Always up-to-date documentation.
- Interactive interface for testing APIs.
- Reduced team questions about endpoints.
- Faster onboarding for new developers.

Want to document your APIs with Swagger? At Vynta we create interactive API documentation.
