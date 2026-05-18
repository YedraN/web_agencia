---
title: "Husky y lint-staged: calidad de código antes del commit"
description: "Configura Husky y lint-staged para ejecutar linters y tests automáticamente antes de cada commit. Calidad de código garantizada."
date: "2026-03-15"
tags: ["Husky", "lint-staged", "Git Hooks", "Calidad de código"]
---

## ¿Qué es Husky?

Husky facilita la gestión de Git Hooks en proyectos JavaScript. Permite definir hooks en `package.json` o archivos configurables, y compartirlos con todo el equipo.

## Instalación

```bash
npm install --save-dev husky
npx husky init
```

Esto crea la carpeta `.husky/` con un hook `pre-commit` de ejemplo.

## Crear hooks

```bash
echo "npx lint-staged" > .husky/pre-commit
echo "npm test" > .husky/pre-push
```

## lint-staged

lint-staged ejecuta linters solo en los archivos que están en el staging area. Esto es clave para equipos grandes: no ejecutas el linter en todo el proyecto cada vez.

```json
{
  "lint-staged": {
    "*.{js,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

## Flujo completo

1. Haces `git add` a tus archivos.
2. Ejecutas `git commit`.
3. Husky dispara el hook `pre-commit`.
4. lint-staged ejecuta ESLint y Prettier solo en los archivos staged.
5. Si todo pasa, el commit se crea. Si no, se cancela con los errores.

## Beneficios

- Código sucio nunca llega al repositorio.
- Feedback inmediato sin esperar a CI.
- Configuración compartida con el equipo.
- Pre-commit rápido porque solo procesa archivos staged.

¿Quieres calidad garantizada antes del commit? En Vynta configuramos pre-commit hooks para tu equipo.
