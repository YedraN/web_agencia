---
title: "Domain-Driven Design táctico: entidades, value objects y agregados"
description: "Explora el DDD táctico: entidades, value objects, agregados y repositorios. Patrones para modelar dominios complejos con TypeScript."
date: "2025-05-01"
tags: ["DDD", "Domain-Driven Design", "Arquitectura", "TypeScript"]
---

## DDD táctico vs estratégico

Mientras el DDD estratégico se enfoca en bounded contexts y mapas de contexto, el DDD táctico proporciona los bloques de construcción para modelar el dominio: entidades, value objects, agregados, repositorios, servicios de dominio y eventos.

## Entidades

Las entidades tienen identidad propia. Dos entidades con los mismos atributos pero diferente identidad son objetos distintos. Se comparan por ID, no por valor.

```typescript
class User {
  constructor(public readonly id: UserId, public name: string) {}
  equals(other: User): boolean {
    return this.id.equals(other.id);
  }
}
```

## Value Objects

Son inmutables y se comparan por su valor. No tienen identidad propia. Ejemplos: Email, Money, Address.

```typescript
class Email {
  constructor(public readonly value: string) {
    if (!this.isValid(value)) throw new Error('Invalid email');
  }
  private isValid(email: string): boolean { ... }
}
```

## Agregados

Un agregado es un conjunto de entidades y value objects que se tratan como una unidad. Tiene una raíz (aggregate root) que garantiza la consistencia interna.

## Repositorios

Abstraen el almacenamiento y recuperación de agregados. El dominio define la interfaz, la infraestructura implementa.

¿Quieres aplicar DDD táctico en tu proyecto? En Vynta modelamos dominios complejos con TypeScript.
