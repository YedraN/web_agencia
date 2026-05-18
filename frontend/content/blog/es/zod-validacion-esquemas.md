---
title: "Zod: validación de esquemas TypeScript en tiempo de ejecución"
description: "Zod es una biblioteca de validación de esquemas TypeScript con inferencia de tipos automática. Aprende a validar datos en runtime con type safety."
date: "2025-04-15"
tags: ["Zod", "TypeScript", "Validación", "Esquemas"]
---

## Introducción

Zod es una biblioteca de validación de esquemas para TypeScript que infiere tipos automáticamente de tus esquemas. Olvídate de escribir tipos duplicados.

## ¿Por qué Zod?

A diferencia de Yup o Joi, Zod está diseñado para TypeScript desde el inicio. Los tipos se infieren automáticamente con `z.infer<typeof schema>`, sin tipos duplicados.

## Esquemas básicos

`z.string()`, `z.number()`, `z.object({ name: z.string() })`. Zod soporta todos los tipos de JavaScript más tipos complejos como uniones, tuplas y discriminaciones.

## Validación de API

Usa Zod para validar respuestas de API, formularios o variables de entorno. Un esquema de Zod te da type safety y validación en runtime en un solo lugar.

## Refinements y transformaciones

`z.string().email()` valida emails. `z.string().transform(s => s.trim())` transforma datos. Puedes crear validaciones personalizadas con `.refine()`.

## Integración con frameworks

Zod se integra con tRPC, Next.js Server Actions y formularios React. Es la biblioteca de validación más popular del ecosistema TypeScript.

## Conclusión

Zod simplifica la validación de datos con tipos inferidos automáticamente. En **Vynta** lo usamos en todos nuestros proyectos TypeScript para mayor seguridad.
