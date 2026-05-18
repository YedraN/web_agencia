---
title: "Biome: la herramienta unificada que reemplaza ESLint y Prettier"
description: "Biome unifica linting y formateo en una sola herramienta. Configuración, migración desde ESLint + Prettier y ventajas de rendimiento."
date: "2026-03-01"
tags: ["Biome", "Linter", "Formatter", "Herramientas"]
---

## ¿Qué es Biome?

Biome es una herramienta unificada que combina linter y formateador, escrita en Rust. Su objetivo es reemplazar a ESLint + Prettier con una sola dependencia, órdenes de magnitud más rápida.

## Instalación

```bash
npm install --save-dev @biomejs/biome
```

## Configuración

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  }
}
```

## Migración desde ESLint + Prettier

Biome ofrece un comando de migración:

```bash
npx @biomejs/biome migrate eslint --write
```

Analiza tu configuración de ESLint y genera la equivalente en Biome.

## Rendimiento

Biome es 10-100x más rápido que ESLint. Procesa proyectos grandes en milisegundos. En CI, esto se traduce en pipelines más rápidos.

## Integración con editores

Biome tiene extensiones oficiales para VS Code, IntelliJ y Neovim. Formatea al guardar con la misma configuración que en CLI.

## ¿Deberías migrar?

Si empiezas un proyecto nuevo, Biome es la mejor opción. Si tienes un proyecto legacy con ESLint muy configurado, evalúa si las reglas personalizadas que usas tienen equivalente en Biome.

¿Quieres probar Biome en tu proyecto? En Vynta migramos herramientas de calidad de código.
