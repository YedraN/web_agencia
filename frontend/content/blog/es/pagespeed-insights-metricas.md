---
title: "PageSpeed Insights: interpreta todas las métricas"
description: "Guía para entender cada métrica de PageSpeed Insights: Core Web Vitals, oportunidades, diagnósticos y cómo mejorar tu puntuación."
date: "2025-09-14"
tags: ["PageSpeed Insights", "Rendimiento", "Core Web Vitals", "Lighthouse"]
---

## ¿Qué es PageSpeed Insights?

PageSpeed Insights (PSI) es una herramienta de Google que analiza el rendimiento de una página web en dispositivos móviles y de escritorio.

## Secciones del informe

### Core Web Vitals Assessment

Muestra datos reales de Chrome User Experience Report (CrUX). Estas métricas reflejan la experiencia de usuarios reales.

### Opportunities

Sugerencias específicas para mejorar la velocidad. Cada oportunidad incluye el ahorro estimado en segundos.

### Diagnostics

Información adicional sobre prácticas que no afectan directamente a la puntuación pero que son importantes para la salud del sitio.

## Métricas clave explicadas

FCP (First Contentful Paint) mide cuándo aparece el primer contenido. TBT (Total Blocking Time) mide cuánto tiempo está bloqueado el hilo principal. SI (Speed Index) mide la rapidez con la que se muestra el contenido visual.

## Puntuación vs datos reales

La puntuación de Lighthouse es una simulación. Los datos de CrUX son reales. Ambos son importantes pero responden a propósitos distintos.

## Cómo usar PSI en flujos de trabajo

Integra PSI en tu CI/CD con Lighthouse CI. Programa auditorías semanales y alerta ante regresiones de rendimiento.

## Conclusión

PageSpeed Insights es la puerta de entrada al rendimiento web. En Vynta usamos PSI junto con otras herramientas para ofrecer diagnósticos precisos y hojas de ruta de optimización claras.
