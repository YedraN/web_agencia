---
title: "CSS :has() selector: usos prácticos y ejemplos"
description: "El selector CSS :has() permite seleccionar elementos según sus hijos o descendientes. Usos prácticos, ejemplos y cómo simplifica tu CSS."
date: "2025-02-11"
tags: ["CSS", "Selectores", ":has", "Frontend"]
---

## Introducción

El selector `:has()` es uno de los más revolucionarios de CSS. Permite seleccionar un elemento basándose en lo que contiene, algo que antes solo era posible con JavaScript.

## ¿Qué es :has()?

`:has()` es un pseudo-clase que selecciona un elemento si contiene otro elemento específico. Por ejemplo: `div:has(p)` selecciona divs que contienen un párrafo.

## Usos prácticos

Estilos para tarjetas con imágenes vs sin imágenes, formularios con errores, menús con submenús activos, y tablas con filas seleccionadas.

## Combinaciones

Puedes combinar :has() con otros selectores: `.card:has(img) { grid-column: span 2; }` o `form:has(input:invalid) { border-color: red; }`.

## Rendimiento

Aunque potente, :has() puede ser costoso en árboles DOM grandes. Úsalo con moderación en selectores simples para mantener buen rendimiento.

## Conclusión

`:has()` abre posibilidades que antes requerían JavaScript. En **Vynta** lo usamos para crear componentes más inteligentes con menos código.
