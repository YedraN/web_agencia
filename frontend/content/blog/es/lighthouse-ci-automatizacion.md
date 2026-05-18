---
title: "Lighthouse CI: automatiza auditorías de rendimiento"
description: "Aprende a configurar Lighthouse CI para automatizar auditorías de rendimiento web en tus pipelines de CI/CD."
date: "2026-05-02"
tags: ["Lighthouse CI", "Automatización", "Rendimiento", "CI/CD"]
---

## ¿Qué es Lighthouse CI?

Lighthouse CI es una herramienta que permite ejecutar auditorías de Lighthouse en un entorno automatizado, ideal para integrar en pipelines de CI/CD.

## Beneficios

Detecta regresiones de rendimiento antes de llegar a producción, establece presupuestos de rendimiento, y genera informes históricos para tracking.

## Instalación

```bash
npm install -g @lhci/cli
```

Configura un archivo lighthouserc.js con tus ajustes de presupuestos y servidor.

## Presupuestos de rendimiento

Define límites máximos para LCP, INP, CLS, TBT y puntuación general. Si un cambio supera el presupuesto, el pipeline falla.

## Modos de ejecución

Lighthouse CI soporta tres modos: autorun para análisis único, server para almacenar informes históricos, y wizard para configuración guiada.

## Integración con GitHub Actions

```yaml
- name: Run Lighthouse CI
  run: npx lhci autorun
```

Almacena los resultados como artefactos para revisión posterior.

## Conclusión

Lighthouse CI es la herramienta definitiva para mantener el rendimiento bajo control. En Vynta integramos Lighthouse CI en todos nuestros proyectos para garantizar calidad continua.
