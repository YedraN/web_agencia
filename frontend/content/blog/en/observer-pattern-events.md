---
title: "Observer Pattern: event handling in applications"
description: "Implement the Observer pattern in TypeScript for event handling and decoupled communication between application components."
date: "2025-06-16"
tags: ["Observer Pattern", "Design Patterns", "Events", "TypeScript"]
---

## What is the Observer pattern?

Observer defines a one-to-many dependency between objects: when one object (subject) changes state, all its dependents (observers) are notified automatically. It's the foundation of reactive programming and event systems.

## Basic structure

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

## Real-world use cases

- Real-time notification systems.
- UI updates when the data model changes.
- WebSocket integration and server events.
- Event-driven architecture (Event Sourcing).

## EventEmitter in Node.js

Node.js implements Observer natively with `EventEmitter`. Use it for decoupled module communication.

```typescript
import { EventEmitter } from 'events';

const emitter = new EventEmitter();
emitter.on('user:registered', (user) => sendWelcomeEmail(user));
```

## Pros and cons

Pros: decoupling, flexible communication, easy to add new observers. Cons: can be hard to debug, observers don't know notification order.

Need to implement events in your app? At Vynta we design reactive and scalable systems.
