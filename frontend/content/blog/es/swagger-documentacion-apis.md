---
title: "Swagger: documentación interactiva de APIs"
description: "Documenta tus APIs REST con Swagger. Configuración, personalización, integración con Express y mejores prácticas para documentación efectiva."
date: "2026-02-10"
tags: ["Swagger", "OpenAPI", "Documentación", "API"]
---

## ¿Qué es Swagger?

Swagger es un conjunto de herramientas alrededor de la especificación OpenAPI. Permite diseñar, documentar y consumir APIs REST. swagger-ui genera una interfaz interactiva donde los usuarios pueden probar los endpoints directamente.

## Instalación con Express

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

## Documentando endpoints

```typescript
/**
 * @openapi
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/users', (req, res) => { ... });
```

## swagger-ui-express vs swagger-inline

swagger-ui-express sirve swagger-ui desde Express. swagger-inline coloca la documentación junto al código. Ambos son complementarios.

## Personalización

Swagger UI permite personalizar colores, logo, y branding. También soporta autenticación para probar endpoints protegidos.

## Beneficios

- Documentación siempre actualizada.
- Interfaz interactiva para probar APIs.
- Reducción de preguntas del equipo sobre endpoints.
- Onboarding más rápido para nuevos desarrolladores.

¿Quieres documentar tus APIs con Swagger? En Vynta creamos documentación interactiva para tu API.
