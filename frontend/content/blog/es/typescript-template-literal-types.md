---
title: "Template Literal Types: tipos dinámicos en TypeScript"
description: "Template Literal Types permiten crear tipos dinámicos combinando strings. Aprende a usarlos para tipar rutas, eventos y API responses."
date: "2025-04-08"
tags: ["TypeScript", "Template Literal Types", "Tipos", "Avanzado"]
---

## Introducción

Los Template Literal Types son una de las características más potentes de TypeScript. Te permiten manipular tipos string en tiempo de compilación, creando combinaciones dinámicas.

## Sintaxis básica

Usan la misma sintaxis que los template literals de JavaScript pero con tipos: `` type Endpoint = `/api/${'users' | 'posts'}` `` genera la unión de `/api/users` y `/api/posts`.

## String manipulators

TypeScript incluye `Uppercase`, `Lowercase`, `Capitalize` y `Uncapitalize` para transformar tipos string. Útiles para normalizar formatos.

## Casos de uso reales

Tipar rutas de API con parámetros dinámicos, crear tipos para eventos `onClick`, `onSubmit` desde una base, y generar tipos CSS como `marginTop`, `marginLeft`.

## Inferencia avanzada

Combina Template Literal Types con inferencia para parsear rutas: separa `/api/users/123` en partes y extrae parámetros dinámicos.

## Conclusión

Template Literal Types elevan el tipado de TypeScript a otro nivel. En **Vynta** los usamos para crear APIs type-safe y evitar errores en tiempo de compilación.
