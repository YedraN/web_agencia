---
title: "Semantic Release: automatización de versiones semánticas"
description: "Automatiza el versionado semántico con Semantic Release. Configuración, integración con CI/CD y generación automática de changelogs."
date: "2026-04-01"
tags: ["Semantic Release", "Semantic Versioning", "CI/CD", "Automatización"]
---

## ¿Qué es Semantic Release?

Semantic Release automatiza todo el proceso de publicación: analiza los commits, determina la próxima versión semántica, genera el changelog, crea el tag de Git y publica el paquete. Todo basado en Conventional Commits.

## Instalación

```bash
npm install --save-dev semantic-release
```

## Configuración básica

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    "@semantic-release/github"
  ]
}
```

## Cómo determina la versión

- Commits `fix` → versión patch (1.0.0 → 1.0.1)
- Commits `feat` → versión minor (1.0.0 → 1.1.0)
- Commits con `BREAKING CHANGE` → versión major (1.0.0 → 2.0.0)

## Flujo en CI

```yaml
# GitHub Actions
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Plugins populares

- `@semantic-release/git`: commitea archivos generados (package.json actualizado).
- `@semantic-release/docker`: publica imágenes Docker.
- `@semantic-release/slack`: notifica en Slack.

## Beneficios

- Elimina decisiones humanas sobre versionado.
- Changelogs precisos y automáticos.
- Publicación consistente y sin errores manuales.

¿Quieres automatizar tus releases? En Vynta configuramos Semantic Release para tu proyecto.
