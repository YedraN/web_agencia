---
title: "Clean Architecture: implementación práctica en proyectos web"
description: "Implementa Clean Architecture en proyectos web con Node.js y TypeScript. Aprende a separar capas, dependencias y mantener el código testeable."
date: "2025-04-15"
tags: ["Clean Architecture", "Arquitectura", "TypeScript", "Node.js"]
---

## ¿Qué es Clean Architecture?

Clean Architecture, propuesta por Robert C. Martin, organiza el código en capas concéntricas. Las reglas de negocio están en el centro, independientes de frameworks, bases de datos y UI. El principio clave: las dependencias apuntan hacia adentro.

## Las capas principales

- **Domain**: entidades, value objects y reglas de negocio. Sin dependencias externas.
- **Application**: casos de uso que orquestan el flujo. Dependen solo del domain.
- **Infrastructure**: implementaciones concretas (bases de datos, APIs externas, servicios de email).
- **Presentation**: controllers, handlers, middlewares, grapQL resolvers.

## Inversión de dependencias

La infraestructura depende de interfaces definidas en el domain/application, no al revés. Esto permite cambiar la base de datos sin tocar la lógica de negocio.

```typescript
// Domain define la interfaz
interface UserRepository {
  findById(id: string): Promise<User>;
}

// Infrastructure implementa
class PostgresUserRepository implements UserRepository { ... }
```

## DTOs y mappers

Nunca expongas entidades del dominio directamente en la API. Usa DTOs para la comunicación externa y mappers para transformar entre capas.

## Beneficios

- Código testeable: el domain se prueba sin infraestructura.
- Framework-agnostic: cambia de Express a Fastify sin tocar lógica de negocio.
- Mantenible: cada capa tiene una responsabilidad clara.

¿Necesitas implementar Clean Architecture? En Vynta diseñamos arquitecturas web robustas y sostenibles.
