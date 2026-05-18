---
title: "Svelte 5: Runes y el nuevo sistema de reactividad"
description: "Svelte 5 introduce Runes: un nuevo sistema de reactividad explícito y más potente. Cómo migrar y qué ventajas trae este cambio."
date: "2026-03-24"
tags: ["Svelte", "JavaScript", "Reactividad", "Frontend"]
---

## Introducción

Svelte 5 marca un cambio fundamental con la introducción de Runes, un sistema de reactividad explícito que reemplaza los antiguos `$:` y ofrece más control sobre el estado reactivo.

## ¿Qué son los Runes?

Los Runes son funciones especiales que el compilador de Svelte reconoce y transforma. `$state`, `$derived` y `$effect` son los más importantes.

## $state

Reemplaza las declaraciones `let` reactivas. Ahora declaras `let count = $state(0)` y el valor es reactivo de forma explícita. Esto hace que el flujo de datos sea más claro.

## $derived

Sustituye `$: doubled = count * 2`. Los valores derivados se calculan automáticamente cuando sus dependencias cambian, pero ahora son más predecibles.

## $effect

Reemplaza `$:` para efectos secundarios. Útil para sincronizar con APIs externas, actualizar el DOM o enviar analytics.

## Migración desde Svelte 4

El equipo ha proporcionado una guía de migración y un codemod automático. La mayoría de los proyectos migran sin cambios manuales.

## Conclusión

Svelte 5 con Runes ofrece una reactividad más explícita y predecible. En **Vynta** adoptamos Svelte para proyectos que requieren bundles ultra ligeros.
