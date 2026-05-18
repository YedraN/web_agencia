---
title: "tRPC: tipos de extremo a extremo sin código boilerplate"
description: "tRPC permite APIs type-safe entre cliente y servidor sin generación de código. Aprende a construir APIs TypeScript con tipos compartidos automáticamente."
date: "2025-04-22"
tags: ["tRPC", "TypeScript", "API", "Type Safety"]
---

## Introducción

tRPC es un framework para construir APIs tipo RPC donde los tipos viajan del servidor al cliente automáticamente. Sin REST, sin GraphQL, solo TypeScript.

## ¿Cómo funciona?

Defines un router en el servidor con procedimientos. El cliente importa el tipo del router y obtiene tipos completos automáticamente sin generación de código.

## Rutas y procedimientos

Cada procedimiento puede ser query (GET), mutation (POST) o subscription (WebSocket). Las entradas y salidas están tipadas con Zod para validación automática.

## Autenticación

Usa middlewares en el router para proteger rutas. tRPC soporta contextos que se pasan a todos los procedimientos, ideal para sesiones de usuario.

## Integración con Next.js

tRPC es el compañero ideal para Next.js. Los Server Components pueden llamar procedimientos tRPC directamente desde el servidor sin APIs REST.

## Ventajas sobre REST/GraphQL

Sin duplicación de tipos, sin schemas GraphQL, sin generación de código. Los errores son tipos. Las respuestas son tipos. Todo es TypeScript.

## Conclusión

tRPC es la forma más productiva de construir APIs TypeScript. En **Vynta** lo usamos para crear aplicaciones end-to-end type-safe con mínimo boilerplate.
