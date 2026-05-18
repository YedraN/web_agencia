---
title: "Mocking: patrones efectivos para pruebas unitarias"
description: "Patrones de mocking para pruebas unitarias en TypeScript: mocks, stubs, spies y fakes. Cuándo usarlos y cómo evitar el over-mocking."
date: "2025-12-15"
tags: ["Mocking", "Testing", "TypeScript", "Patrones"]
---

## ¿Qué es mocking?

Mocking es la técnica de reemplazar dependencias reales con objetos simulados durante los tests. Permite aislar la unidad bajo test y controlar comportamientos externos.

## Tipos de test doubles

- **Stub**: proporciona respuestas prefijadas. No tiene lógica.
- **Mock**: verifica interacciones (cuántas veces se llamó, con qué argumentos).
- **Spy**: envuelve un objeto real y registra las llamadas.
- **Fake**: implementación simplificada pero funcional (ej: base de datos en memoria).

## Ejemplo con Vitest

```typescript
import { vi } from 'vitest';

const mockEmailService = {
  send: vi.fn().mockResolvedValue(true),
};

const service = new NotificationService(mockEmailService);
await service.sendWelcome('user@test.com');
expect(mockEmailService.send).toHaveBeenCalledWith(
  'user@test.com',
  expect.stringContaining('Welcome')
);
```

## Over-mocking: el anti-patrón

Mockear demasiado hace los tests frágiles. Si mockeas 5 dependencias para probar una función simple, algo está mal. Pregúntate: ¿estoy testeando comportamiento o implementación?

## Cuándo no mockear

- Value objects y entidades del dominio.
- Funciones puras sin efectos secundarios.
- Librerías estándar del lenguaje.

## Buenas prácticas

- Mockea en el nivel más externo posible.
- Prefiere interfaces sobre clases concretas para facilitar mocking.
- Usa fakes para dependencias complejas como bases de datos.

¿Quieres mejorar tu estrategia de mocking? En Vynta escribimos tests efectivos sin over-mocking.
