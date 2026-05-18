---
title: "Factory Pattern: creación flexible de objetos"
description: "Aprende el patrón Factory en TypeScript: Factory Method y Abstract Factory para crear objetos de forma flexible, desacoplada y extensible."
date: "2025-06-01"
tags: ["Factory Pattern", "Patrones de diseño", "TypeScript", "POO"]
---

## ¿Por qué usar Factory?

Cuando la creación de objetos se vuelve compleja, con lógica condicional o configuraciones variables, el patrón Factory encapsula esa complejidad. El código cliente no necesita conocer las clases concretas.

## Simple Factory

No es un patrón GoF, pero es útil. Una función o clase centraliza la creación de objetos según un parámetro.

```typescript
function createNotification(type: 'email' | 'sms' | 'push'): Notification {
  switch (type) {
    case 'email': return new EmailNotification();
    case 'sms': return new SMSNotification();
    case 'push': return new PushNotification();
  }
}
```

## Factory Method

Define una interfaz para crear objetos, pero deja que las subclases decidan qué clase instanciar. Útil cuando una clase no puede anticipar la clase de objetos que debe crear.

## Abstract Factory

Proporciona una interfaz para crear familias de objetos relacionados sin especificar sus clases concretas. Perfecto cuando tu aplicación necesita trabajar con múltiples variantes de productos.

```typescript
interface UIFactory {
  createButton(): Button;
  createInput(): Input;
  createModal(): Modal;
}
```

## Ventajas

- Desacopla el código cliente de las implementaciones concretas.
- Centraliza la lógica de creación.
- Facilita añadir nuevos tipos sin modificar código existente (OCP).

¿Quieres mejorar tu diseño con Factory Pattern? En Vynta aplicamos patrones que escalan.
