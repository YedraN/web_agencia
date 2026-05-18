---
title: "Dependency Injection: contenedores DI en TypeScript"
description: "Implementa Dependency Injection en TypeScript con contenedores DI como tsyringe y inversify. Aprende a desacoplar componentes y facilitar el testing."
date: "2025-07-15"
tags: ["Dependency Injection", "TypeScript", "Arquitectura", "Testing"]
---

## ¿Qué es Dependency Injection?

Dependency Injection es un patrón donde las dependencias de una clase se proporcionan desde fuera, no se crean internamente. Esto desacopla los componentes, facilita los tests y hace el código más flexible.

## Sin DI

```typescript
class UserService {
  private db = new PostgresDatabase(); // Acoplado
}
```

## Con DI

```typescript
class UserService {
  constructor(private db: Database) {} // Desacoplado
}
```

## Contenedores DI

Los contenedores DI automatizan la creación y resolución de dependencias. Registras interfaces con sus implementaciones y el contenedor resuelve todo el árbol de dependencias.

## tsyringe

Un contenedor ligero de Microsoft:

```typescript
import { container, injectable, inject } from 'tsyringe';

@injectable()
class UserService {
  constructor(@inject('Database') private db: Database) {}
}
```

## InversifyJS

El contenedor más completo para TypeScript. Soporta decoradores, middleware, contextos y más.

## Beneficios

- Testing: inyecta mocks fácilmente.
- Flexibilidad: cambia implementaciones sin modificar código.
- Ciclo de vida: controla si las dependencias son singleton, transient o scoped.

¿Quieres implementar DI en tu proyecto? En Vynta diseñamos arquitecturas desacopladas y testables.
