---
title: "Changesets: versionado de paquetes en monorepos"
description: "Gestiona versiones de paquetes en monorepos con Changesets. Publicación semántica, changelogs y flujo de trabajo colaborativo."
date: "2026-05-01"
tags: ["Changesets", "Monorepo", "Versionado", "Paquetes"]
---

## ¿Qué son Changesets?

Changesets es una herramienta para gestionar versiones y changelogs en monorepos. Cada PR incluye un archivo que describe los cambios. Al publicar, Changesets agrupa los cambios, calcula las nuevas versiones y genera changelogs.

## Instalación

```bash
npm install --save-dev @changesets/cli
npx changeset init
```

## Flujo de trabajo

1. El desarrollador ejecuta `npx changeset` y selecciona los paquetes afectados.
2. Selecciona el tipo de cambio (major, minor, patch).
3. Escribe un summary que irá al changelog.
4. Se genera un archivo `.md` en `.changeset/` que se commitea con el PR.

## Publicación

```bash
npx changeset version
npx changeset publish
```

`changeset version` consume los archivos de `.changeset/`, actualiza las versiones y genera los changelogs. `changeset publish` publica en npm.

## Integración con GitHub Actions

```yaml
name: Release
on:
  push:
    branches: [main]
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx changeset publish
        env:
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Changesets vs Semantic Release

Changesets está diseñado para monorepos multi-paquete. Semantic Release asume un solo paquete. Para monorepos con múltiples paquetes independientes, Changesets es la mejor opción.

## Beneficios

- Cada PR describe sus cambios explícitamente.
- Los changelogs son precisos por paquete.
- La versión se decide en el PR, no después.
- Ideal para librerías y paquetes compartidos.

¿Usas monorepo con múltiples paquetes? En Vynta configuramos Changesets para tu proyecto.
