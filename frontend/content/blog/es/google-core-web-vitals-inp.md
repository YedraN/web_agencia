---
title: "INP: la métrica de Core Web Vitals que sustituyó a FID"
description: "Todo sobre Interaction to Next Paint (INP): la métrica que reemplazó a FID en Core Web Vitals. Cómo medirla y optimizarla."
date: "2026-04-18"
tags: ["Core Web Vitals", "INP", "Rendimiento Web", "SEO Técnico"]
---

## ¿Qué es INP?

Interaction to Next Paint (INP) mide el tiempo desde que un usuario interactúa con la página hasta que el navegador responde. En 2024, INP reemplazó oficialmente a First Input Delay (FID).

## ¿Por qué el cambio?

FID solo medía la primera interacción. INP evalúa todas las interacciones durante la visita, ofreciendo una visión más completa de la responsividad.

## Cómo se mide

INP se calcula como el percentil 90 de las peores interacciones. Una interacción puede ser un click, un toque o una pulsación de tecla.

## Valores objetivo

Un INP por debajo de 200ms es bueno. Entre 200ms y 500ms necesita mejora. Por encima de 500ms es deficiente.

## Causas comunes de INP alto

JavaScript síncrono bloqueante, tareas largas en el hilo principal, listeners de eventos complejos y renderizado ineficiente del DOM.

## Cómo optimizar INP

Divide tareas largas con setTimeout o requestIdleCallback, usa Web Workers para procesos pesados, implementa debouncing en eventos frecuentes y evita reflows innecesarios.

## Herramientas de diagnóstico

El panel Performance de Chrome DevTools, Lighthouse y la biblioteca web-vitals de JavaScript son esenciales para diagnosticar INP.

## Conclusión

INP es ahora una métrica de ranking que no puedes ignorar. En Vynta realizamos auditorías de rendimiento centradas en Core Web Vitals para garantizar la mejor experiencia de usuario.
