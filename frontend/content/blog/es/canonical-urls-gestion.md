---
title: "Canonical URLs: evita contenido duplicado en SEO"
description: "Guía sobre canonical URLs: cómo usar rel=canonical para evitar contenido duplicado, consolidar señales SEO y mejorar el ranking."
date: "2026-03-22"
tags: ["Canonical URLs", "Contenido Duplicado", "SEO Técnico", "Indexación"]
---

## ¿Qué es una canonical URL?

Una canonical URL (rel=canonical) indica a Google cuál es la versión preferida de una página cuando hay contenido similar o duplicado.

## Cuándo usar canonical

Páginas con parámetros de tracking (?utm_source=...), versiones de impresión, contenido syndicated, URLs con y sin www, y versiones HTTP vs HTTPS.

## Cómo implementarla

```html
<link rel="canonical" href="https://ejemplo.com/articulo/" />
```

Coloca la etiqueta en el head de la página no canónica apuntando a la canónica.

## Buenas prácticas

Usa URLs absolutas (no relativas), una sola canonical por página, y asegúrate de que la canonical sea accesible (no 404).

## Errores comunes

Canonical loops (A apunta a B y B apunta a A), canonical no indexable, y cadenas de canonical largas.

## Canonical vs 301 redirect

301 redirige permanentemente al usuario y al bot. Canonical solo afecta a buscadores. Usa 301 para páginas que no deben existir.

## Conclusión

Las canonical URLs protegen tu SEO del contenido duplicado. En Vynta implementamos estrategias de canonicalización que consolidan la autoridad de tus páginas principales.
