---
title: "Repository vs DAO: diferencias y cuándo usar cada patrón"
description: "Repository y DAO son patrones de acceso a datos diferentes. Aprende sus diferencias, ventajas y cuándo usar cada uno en tus proyectos."
date: "2025-05-15"
tags: ["Repository", "DAO", "Patrones de diseño", "Base de datos"]
---

## Confusión común

Repository y DAO se usan como sinónimos, pero son patrones distintos con intenciones diferentes. DAO persiste objetos completos. Repository abstrae el almacenamiento y solo trabaja con agregados del dominio.

## DAO (Data Access Object)

El DAO encapsula el acceso a una fuente de datos. Normalmente hay un DAO por entidad de base de datos. Expone operaciones CRUD directamente.

```typescript
interface UserDao {
  findById(id: number): UserRow;
  save(user: UserRow): void;
  delete(id: number): void;
}
```

## Repository

El Repository actúa como una colección en memoria de agregados del dominio. Solo las raíces de agregado tienen repositorio. El lenguaje es del dominio, no de la base de datos.

```typescript
interface UserRepository {
  findByEmail(email: Email): User;
  add(user: User): void;
  remove(userId: UserId): void;
}
```

## Cuándo usar cada uno

Usa DAO cuando trabajes con ActiveRecord o CRUD simple sin lógica de dominio compleja. Usa Repository cuando tengas DDD, Clean Architecture o lógica de negocio rica.

## Puedes combinarlos

Es común que un Repository use internamente uno o más DAOs para poblar agregados complejos desde múltiples tablas.

¿Dudas sobre qué patrón usar? En Vynta te asesoramos en la arquitectura de acceso a datos.
