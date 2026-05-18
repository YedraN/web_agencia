---
title: "Clean Code: principios SOLID aplicados"
description: "Guía práctica de los principios SOLID aplicados a TypeScript y JavaScript. Ejemplos reales de Single Responsibility, Open/Close, Liskov, Interface Segregation y Dependency Inversion."
date: "2025-04-01"
tags: ["Clean Code", "SOLID", "TypeScript", "Arquitectura"]
---

## ¿Qué son los principios SOLID?

SOLID son cinco principios de diseño orientado a objetos que te ayudan a escribir código mantenible, escalable y testable. Robert C. Martin los popularizó y hoy son fundamentales en la arquitectura de software moderna.

## Single Responsibility (SRP)

Una clase debe tener una sola razón para cambiar. Si una clase maneja persistencia, lógica de negocio y formateo, tiene demasiadas responsabilidades. Divide en clases especializadas.

```typescript
// Mal: maneja persistencia, validación y envío de email
class UserService {
  saveUser(user: User) { ... }
  validateUser(user: User) { ... }
  sendWelcomeEmail(user: User) { ... }
}
```

## Open/Closed (OCP)

Las entidades deben estar abiertas para extensión pero cerradas para modificación. Usa interfaces y herencia para añadir comportamiento sin modificar código existente.

## Liskov Substitution (LSP)

Los subtipos deben poder sustituir a sus tipos base. Si una subclase rompe el comportamiento esperado de la clase padre, estás violando LSP.

## Interface Segregation (ISP)

Ningún cliente debe ser forzado a depender de interfaces que no usa. Prefiere interfaces pequeñas y específicas en lugar de una interfaz general.

## Dependency Inversion (DIP)

Los módulos de alto nivel no deben depender de módulos de bajo nivel. Ambos deben depender de abstracciones. Inyecta dependencias en lugar de crearlas.

¿Quieres aplicar SOLID en tu proyecto? En Vynta diseñamos arquitecturas limpias y mantenibles.
