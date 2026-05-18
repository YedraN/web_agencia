---
title: "Observer Pattern: manejo de eventos en aplicaciones"
description: "Implementa el patrón Observer en TypeScript para manejo de eventos y comunicación desacoplada entre componentes de tu aplicación."
date: "2025-06-15"
tags: ["Observer Pattern", "Patrones de diseño", "Eventos", "TypeScript"]
---

## ¿Qué es el patrón Observer?

Observer define una dependencia uno-a-muchos entre objetos: cuando un objeto (sujeto) cambia su estado, todos sus dependientes (observadores) son notificados automáticamente. Es la base de la programación reactiva y los sistemas de eventos.

## Estructura básica

```typescript
interface Observer {
  update(event: string, data: any): void;
}

class Subject {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notify(event: string, data: any): void {
    this.observers.forEach(o => o.update(event, data));
  }
}
```

## Casos de uso reales

- Sistemas de notificaciones en tiempo real.
- Actualización de UI cuando cambia el modelo de datos.
- Integración con WebSockets y eventos del servidor.
- Arquitectura basada en eventos (Event Sourcing).

## Event Emitter en Node.js

Node.js implementa Observer nativamente con `EventEmitter`. Úsalo para comunicación desacoplada entre módulos.

```typescript
import { EventEmitter } from 'events';

const emitter = new EventEmitter();
emitter.on('user:registered', (user) => sendWelcomeEmail(user));
```

## Ventajas y desventajas

Ventajas: desacoplamiento, comunicación flexible, fácil añadir nuevos observers. Desventajas: puede ser difícil de depurar, los observers no saben del orden de notificación.

¿Necesitas implementar eventos en tu app? En Vynta diseñamos sistemas reactivos y escalables.
