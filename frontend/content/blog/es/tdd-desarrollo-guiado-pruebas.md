---
title: "TDD: desarrollo guiado por pruebas desde cero"
description: "Guía práctica de TDD (Test-Driven Development) con TypeScript: ciclo Red-Green-Refactor, ejemplos reales y beneficios para la calidad del código."
date: "2025-10-01"
tags: ["TDD", "Testing", "TypeScript", "Metodología"]
---

## ¿Qué es TDD?

Test-Driven Development (TDD) es una metodología donde escribes los tests antes del código de producción. El ciclo es simple: escribe un test que falle (Red), escribe el código mínimo para que pase (Green), y refactoriza (Refactor).

## El ciclo Red-Green-Refactor

1. **Red**: escribe un test que describa el comportamiento deseado. El test falla porque el código no existe.
2. **Green**: escribe el código mínimo necesario para que el test pase. No te preocupes por la calidad aún.
3. **Refactor**: mejora el código manteniendo los tests verdes. Aquí aplicas patrones y limpias.

## Ejemplo práctico

```typescript
// Red: test falla
it('should calculate total with tax', () => {
  expect(calculateTotal(100, 0.21)).toBe(121);
});

// Green: código mínimo
function calculateTotal(amount: number, tax: number): number {
  return amount + amount * tax;
}

// Refactor: mejora expresión
function calculateTotal(amount: number, tax: number): number {
  return amount * (1 + tax);
}
```

## Beneficios comprobados

- **Menos bugs**: pruebas desde el primer momento.
- **Diseño mejorado**: el test te obliga a pensar en la interfaz antes que en la implementación.
- **Confianza para refactorizar**: los tests son tu red de seguridad.
- **Documentación viva**: los tests describen el comportamiento esperado.

## TDD no es para todo

TDD brilla en lógica de negocio compleja. No tiene sentido para CRUD simple o prototipos exploratorios.

¿Quieres adoptar TDD en tu equipo? En Vynta formamos equipos en desarrollo guiado por pruebas.
