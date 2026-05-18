---
title: "Testing unitario con Jest y Vitest: guía completa"
description: "Guía completa de testing unitario con Jest y Vitest. Configuración, mocks, cobertura y buenas prácticas para tests unitarios efectivos."
date: "2025-08-01"
tags: ["Testing", "Jest", "Vitest", "Calidad de código"]
---

## Jest vs Vitest

Jest ha sido el framework dominante para testing en JavaScript durante años. Vitest es su competidor moderno, compatible con la configuración de Vite y significativamente más rápido. Ambos comparten API similar, lo que facilita la migración.

## Configuración básica con Vitest

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
});
```

## Estructura de un test

```typescript
describe('UserService', () => {
  it('should create a valid user', async () => {
    const user = await userService.create({ email: 'test@test.com' });
    expect(user.email).toBe('test@test.com');
    expect(user.id).toBeDefined();
  });
});
```

## Mocks y spies

Los mocks aíslan la unidad bajo test. Vitest ofrece `vi.mock()`, `vi.spyOn()` y `vi.fn()` para simular dependencias.

```typescript
vi.mock('../database');
const mockDb = vi.mocked(database);
mockDb.save.mockResolvedValue({ id: '1' });
```

## Cobertura

La cobertura mide qué porcentaje del código se ejecuta durante los tests. Úsala como guía, no como objetivo. 100% de cobertura no garantiza código correcto.

¿Necesitas configurar testing en tu proyecto? En Vynta establecemos pipelines de calidad con Jest y Vitest.
