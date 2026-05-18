---
title: "Chromatic: testing de regresión visual para componentes"
description: "Chromatic detecta cambios visuales en tus componentes Storybook. Integración con CI, revisión por equipos y control de versiones de UI."
date: "2026-01-25"
tags: ["Chromatic", "Visual Testing", "Storybook", "Frontend"]
---

## ¿Qué es Chromatic?

Chromatic es una plataforma de testing de regresión visual construida sobre Storybook. Toma capturas de pantalla de cada historia en cada commit y las compara con la versión anterior para detectar cambios visuales inesperados.

## Cómo funciona

1. Subes tu Storybook a Chromatic (`npx chromatic`).
2. Chromatic toma screenshots de cada historia en múltiples resoluciones.
3. Compara los screenshots con la línea base (baseline).
4. Detecta diferencias píxel a píxel.
5. Marca los cambios para revisión del equipo.

## Instalación

```bash
npm install --save-dev chromatic
npx chromatic --project-token=<token>
```

## Integración en CI

```yaml
- name: Publish to Chromatic
  uses: chromaui/action@v1
  with:
    projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

## Flujo de revisión

Cuando Chromatic detecta cambios, los muestra en una interfaz visual. El equipo puede aceptar (nuevo baseline) o rechazar (bug) los cambios. Esto evita regresiones visuales en producción.

## Beneficios

- Detecta cambios visuales que los tests funcionales no ven.
- Revisión visual colaborativa en PRs.
- Historial de cambios visuales del diseño.
- Integración directa con Storybook.

¿Quieres testing de regresión visual? En Vynta integramos Chromatic en tu pipeline de UI.
