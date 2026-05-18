---
title: "Strategy Pattern: algoritmos intercambiables"
description: "Guía del patrón Strategy en TypeScript: define algoritmos intercambiables en tiempo de ejecución y elimina condicionales complejos."
date: "2025-07-01"
tags: ["Strategy Pattern", "Patrones de diseño", "TypeScript", "Algoritmos"]
---

## ¿Qué es el patrón Strategy?

Strategy permite definir una familia de algoritmos, encapsularlos y hacerlos intercambiables. El algoritmo puede variar independientemente de los clientes que lo usan. Es la solución al problema de los condicionales enormes.

## Estructura

```typescript
interface PaymentStrategy {
  pay(amount: number): Promise<PaymentResult>;
}

class CreditCardStrategy implements PaymentStrategy {
  async pay(amount: number): Promise<PaymentResult> {
    // Lógica de pago con tarjeta
  }
}

class PayPalStrategy implements PaymentStrategy {
  async pay(amount: number): Promise<PaymentResult> {
    // Lógica de pago con PayPal
  }
}
```

## Cuándo usarlo

Cuando tienes múltiples variantes de un algoritmo y usas condicionales para seleccionarlos. Cuando necesitas cambiar el comportamiento en tiempo de ejecución. Cuando quieres aislar la lógica compleja de cada variante.

## Ejemplos prácticos

- Múltiples métodos de pago.
- Diferentes algoritmos de ordenamiento.
- Estrategias de validación de datos.
- Algoritmos de cálculo de precios con descuentos.

## Strategy vs State

Strategy se confunde con State. En State, el objeto cambia su comportamiento cuando cambia su estado interno. En Strategy, el cliente elige qué estrategia usar y se la pasa al contexto.

¿Quieres eliminar condicionales con Strategy? En Vynta diseñamos software limpio y mantenible.
