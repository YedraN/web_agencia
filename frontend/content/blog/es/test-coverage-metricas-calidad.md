---
title: "Test Coverage: métricas de calidad de código"
description: "Aprende sobre test coverage: qué mide, cómo interpretarlo, herramientas de reporte y por qué 100% de cobertura no significa código libre de bugs."
date: "2025-10-15"
tags: ["Test Coverage", "Testing", "Calidad de código", "Métricas"]
---

## ¿Qué es el test coverage?

El test coverage (cobertura de pruebas) mide qué porcentaje del código fuente se ejecuta durante los tests. Se divide en cuatro métricas: cobertura de líneas, ramas, funciones y statements.

## Tipos de cobertura

- **Líneas**: porcentaje de líneas ejecutadas.
- **Ramas**: porcentaje de ramas condicionales (if/else, switch) cubiertas.
- **Funciones**: porcentaje de funciones invocadas.
- **Statements**: porcentaje de sentencias ejecutadas.

```bash
-----------------------------|---------|---------|-------------------
File                         | % Stmts | % Branch| % Funcs | % Lines
-----------------------------|---------|---------|-------------------
 src/services/user.service.ts |   85.71 |   66.66 |   80.00 |   87.50
 src/controllers/auth.ts      |   92.30 |  100.00 |  100.00 |   92.30
-----------------------------|---------|---------|-------------------
```

## Herramientas populares

- **Istanbul/nyc**: el estándar para Node.js.
- **Vitest v8**: cobertura nativa con provider v8.
- **c8**: alternativa moderna a nyc.

## La trampa del 100%

100% de cobertura no significa código perfecto. Puedes tener todos los caminos cubiertos pero no testear valores límite, condiciones de carrera o integraciones reales. La cobertura es una guía, no un objetivo.

## Buenas prácticas

Define un umbral mínimo (70-80%) y haz que el pipeline falle si no se alcanza. Céntrate en cubrir las ramas más críticas: lógica de negocio, validaciones y manejo de errores.

¿Quieres mejorar tu estrategia de cobertura? En Vynta configuramos pipelines con métricas de calidad.
