---
title: "Open Graph Protocol: tarjetas de previsualización en redes"
description: "Guía de Open Graph Protocol: cómo implementar meta tags OG para controlar la previsualización de tu contenido en redes sociales."
date: "2025-08-10"
tags: ["Open Graph", "Redes Sociales", "Meta Tags", "SEO"]
---

## ¿Qué es Open Graph Protocol?

Open Graph Protocol (OGP) es un estándar que permite que cualquier página web se convierta en un objeto enriquecido en redes sociales.

## Meta tags esenciales

### og:title

El título que aparecerá al compartir. Debe ser atractivo y representativo. Entre 40 y 60 caracteres.

### og:description

La descripción de la tarjeta. Entre 80 y 200 caracteres. Acompaña al título en la previsualización.

### og:image

La imagen que se mostrará. Debe tener al menos 1200x630 píxeles. Usa formato JPG o PNG. Evita imágenes con texto pequeño.

### og:url

La URL canónica del contenido. Debe coincidir con la URL que se comparte.

### og:type

Define el tipo de contenido: website, article, product, video.movie, etc.

## Meta tags adicionales

og:locale para el idioma, og:site_name para el nombre del sitio, y og:audio o og:video para contenido multimedia.

## Validación

Usa el Sharing Debugger de Facebook y el Card Validator de Twitter para verificar que tus OG tags funcionan correctamente.

## Implementación dinámica

En frameworks como Next.js, genera OG tags dinámicamente en cada página usando el head del componente.

## Conclusión

Open Graph Protocol es esencial para el social sharing. En Vynta implementamos OG tags optimizados en todos nuestros proyectos para maximizar el engagement en redes.
