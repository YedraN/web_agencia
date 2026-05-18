---
title: "TypeScript Decorators: guía completa con ejemplos"
description: "TypeScript Decorators permiten añadir metadatos y modificar clases. Guía completa con ejemplos de decoradores de clase, método, propiedad y parámetro."
date: "2025-04-01"
tags: ["TypeScript", "Decorators", "Programación", "Metadatos"]
---

## Introducción

Los decoradores de TypeScript permiten añadir metadatos y modificar el comportamiento de clases y sus miembros. Aunque surgieron como propuesta experimental, hoy son estándar en ECMAScript.

## Tipos de decoradores

Hay cuatro tipos: clase, método, propiedad y parámetro. Cada uno recibe argumentos diferentes y se usa para propósitos distintos.

## Decorador de clase

Recibe el constructor y puede modificarlo. Útil para añadir métodos estáticos, registrar clases en un contenedor DI o añadir metadatos.

## Decorador de método

Recibe el target, nombre del método y descriptor. Sirve para logging, caching, validación de argumentos, o transformar resultados.

## Decorador de propiedad

Recibe target y nombre de propiedad. Útil para observabilidad, serialización o inyección de dependencias.

## Decoradores con parámetros

Usa fábricas de decoradores: funciones que devuelven un decorador. Permiten configurar comportamiento como `@log('info')` o `@validate(schema)`.

## Conclusión

Los decoradores son una herramienta poderosa para metaprogramación. En **Vynta** los usamos para logging, validación y gestión de dependencias.
