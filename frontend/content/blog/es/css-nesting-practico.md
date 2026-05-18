---
title: "CSS Nesting: cómo anidar estilos de forma nativa"
description: "CSS Nesting nativo permite anidar selectores CSS sin preprocesadores. Aprende la sintaxis, diferencias con Sass y ejemplos prácticos."
date: "2025-01-28"
tags: ["CSS", "Nesting", "Sass", "Preprocesadores"]
---

## Introducción

CSS Nesting nativo ha llegado para quedarse. Ya no necesitas Sass o Less para anidar selectores. Ahora CSS tiene su propia sintaxis de anidamiento directo en el navegador.

## Sintaxis básica

Usa `&` para referenciar al selector padre. Por ejemplo: `.card { & .title { color: blue; } }`. El & es opcional en muchos casos: `.card { .title { color: blue; } }` funciona igual.

## Diferencias con Sass

CSS Nesting es más restrictivo que Sass. No permite anidar después de selectores sin `&`, y la especificidad se comporta de forma más predecible.

## Ejemplos prácticos

Anidar pseudo-clases como `:hover`, pseudo-elementos como `::before`, y combinaciones con media queries dentro del mismo bloque.

## Soporte en navegadores

Todos los navegadores modernos soportan CSS Nesting desde 2024. Edge, Chrome, Firefox y Safari lo incluyen sin flags.

## Conclusión

CSS Nesting reduce la dependencia de preprocesadores y hace el código más limpio. En **Vynta** escribimos CSS moderno aprovechando las nuevas capacidades nativas.
