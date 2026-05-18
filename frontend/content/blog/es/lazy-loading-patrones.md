---
title: "Lazy Loading: patrones para cargar contenido bajo demanda"
description: "Lazy Loading permite cargar contenido solo cuando es necesario. Patrones para imágenes, componentes y rutas que mejoran el rendimiento inicial."
date: "2025-07-29"
tags: ["Lazy Loading", "Rendimiento", "Optimización", "JavaScript"]
---

## Introducción

Lazy loading es la técnica de posponer la carga de recursos no críticos hasta que se necesitan. Es fundamental para mejorar el tiempo de carga inicial y ahorrar ancho de banda.

## Imágenes con lazy loading

Usa `loading="lazy"` nativo en `<img>` e `<iframe>`. El navegador carga la imagen cuando está cerca del viewport. Soporte nativo en todos los navegadores modernos.

## Componentes dinámicos

En React, usa `React.lazy()` con `Suspense` para cargar componentes bajo demanda. El código del componente se descarga solo cuando se renderiza.

## Intersection Observer

Para lazy loading personalizado, usa Intersection Observer. Detecta cuándo un elemento entra en el viewport y dispara la carga de datos o componentes.

## Lazy loading de rutas

Los frameworks modernos como Next.js, Nuxt y SvelteKit soportan lazy loading de rutas automáticamente. Cada ruta es un chunk separado.

## Priorización de carga

No todo debe ser lazy. Los recursos críticos deben cargarse inmediatamente. Usa lazy loading solo para contenido que está fuera de la pantalla inicial.

## Conclusión

Lazy loading es esencial para el rendimiento web moderno. En **Vynta** aplicamos patrones de carga diferida para optimizar la experiencia inicial del usuario.
