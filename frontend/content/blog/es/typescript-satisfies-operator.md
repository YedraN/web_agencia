---
title: "TypeScript satisfies: type safety sin perder flexibilidad"
description: "El operador satisfies de TypeScript permite validar tipos sin cambiar el tipo inferido. Aprende a usarlo con ejemplos prácticos en tu código."
date: "2025-03-25"
tags: ["TypeScript", "satisfies", "Tipos", "JavaScript"]
---

## Introducción

El operador `satisfies` de TypeScript 4.9+ permite verificar que un valor cumple con un tipo sin cambiar el tipo inferido. Es la herramienta perfecta para validar sin sacrificar flexibilidad.

## El problema que resuelve

A veces necesitas asegurar que un objeto cumple cierta estructura, pero quieres mantener el tipo específico inferido. Con `as` pierdes información; con `satisfies` no.

## Sintaxis básica

`const palette = { red: [255, 0, 0] } satisfies Record<string, [number, number, number]>;` TypeScript verifica pero mantiene el tipo literal.

## Casos de uso

Objetos con colores, configuraciones con valores específicos, mapeos de rutas a componentes, y cualquier situación donde quieras validar sin anotar el tipo.

## Comparación con as

`as` cambia el tipo; `satisfies` solo verifica. Si el valor no cumple, obtienes un error en el lugar exacto, no en el consumo.

## Conclusión

`satisfies` mejora la seguridad de tipos sin rigidez. En **Vynta** lo usamos para escribir TypeScript más seguro y expresivo.
