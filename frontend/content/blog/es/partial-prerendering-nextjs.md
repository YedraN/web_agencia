---
title: "Partial Prerendering: el nuevo modelo de renderizado de Next.js"
description: "Partial Prerendering combina SSG, SSR e ISR en una sola página. Cómo funciona y por qué es el futuro del renderizado en Next.js."
date: "2026-02-26"
tags: ["Next.js", "Rendimiento", "SSG", "SSR"]
---

## Introducción

Next.js introduce Partial Prerendering (PPR), un modelo que combina lo mejor del renderizado estático y dinámico en una misma página. Ya no tienes que elegir entre velocidad y frescura.

## ¿Qué es PPR?

Es un modelo híbrido que prerenderiza partes estáticas de tu página en el build y deja huecos dinámicos que se renderizan bajo demanda o en streaming.

## Cómo funciona

Un shell estático se sirve desde el CDN instantáneamente. Las partes dinámicas como feeds personalizados o paneles de usuario se renderizan como contenido diferido.

## Beneficios clave

La primera impresión es instantánea porque el shell HTML llega sin JavaScript. El contenido dinámico se carga progresivamente sin bloquear la interactividad.

## Configuración

En next.config.js activas `experimental.ppr = true`. Luego envuelves componentes dinámicos en un Suspense boundary y Next.js decide automáticamente qué prerenderizar.

## Cuándo usarlo

Ideal para dashboards, e-commerce con catálogos estáticos y precios dinámicos, blogs con secciones personalizadas, y landing pages con formularios.

## Conclusión

PPR es el futuro del renderizado web. En **Vynta** implementamos este modelo para dar a los usuarios lo mejor de ambos mundos: velocidad estática y contenido dinámico.
