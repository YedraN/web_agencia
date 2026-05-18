---
title: "Module Federation: micro-frontends con Webpack 5"
description: "Module Federation permite compartir código entre aplicaciones independientes. Cómo implementar micro-frontends con Webpack 5 de forma práctica."
date: "2025-09-02"
tags: ["Module Federation", "Micro-frontends", "Webpack", "Arquitectura"]
---

## Introducción

Module Federation es una de las funcionalidades más potentes de Webpack 5. Permite que múltiples aplicaciones JavaScript compartan código y componentes en tiempo de ejecución.

## ¿Qué es Module Federation?

Es un plugin de Webpack 5 que permite cargar código desde otra aplicación remota como si fuera un módulo local. Cada aplicación puede exponer y consumir módulos de otras aplicaciones.

## Casos de uso ideales

Micro-frontends donde cada equipo desarrolla su propia aplicación independiente, pero todas se integran en una experiencia unificada para el usuario.

## Configuración básica

Define qué módulos expones con `exposes` y cuáles consumes con `remotes`. El plugin genera un entry point adicional que otras aplicaciones pueden consumir.

## Shared dependencies

Comparte dependencias como React o Vue entre aplicaciones para evitar duplicación. Module Federation garantiza que solo se cargue una versión de cada librería compartida.

## Consideraciones de producción

Implementa versionado, fallbacks para cuando un remoto no está disponible, y considera el impacto en el bundle inicial.

## Conclusión

Module Federation cambia la arquitectura de aplicaciones web. En **Vynta** diseñamos sistemas de micro-frontends con Module Federation para equipos escalables.
