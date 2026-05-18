---
title: "Git Hooks: automatiza tu flujo de desarrollo"
description: "Aprende a usar Git Hooks para automatizar tareas como linting, tests y validaciones antes de cada commit y push en tu flujo de desarrollo."
date: "2025-02-15"
tags: ["Git", "Git Hooks", "Automatización", "Calidad de código"]
---

## ¿Qué son los Git Hooks?

Los Git Hooks son scripts que se ejecutan automáticamente en respuesta a eventos de Git: `pre-commit`, `pre-push`, `commit-msg`, `post-merge`, entre otros. Te permiten enforced políticas de calidad de código antes de que los cambios entren al repositorio.

## Hook pre-commit

El hook más popular. Se ejecuta antes de que se cree el commit. Úsalo para ejecutar linters, formateadores y tests rápidos. Si falla, el commit se cancela.

```
#!/bin/sh
npm run lint
npm run format:check
```

## Hook commit-msg

Este hook recibe el mensaje del commit como argumento. Ideal para validar que el mensaje siga el estándar Conventional Commits usando commitlint.

## Hook pre-push

Se ejecuta antes de hacer push. Aquí puedes correr la suite completa de tests, tests de integración y análisis de seguridad. Como es más lento, no interrumpe el commit rápido.

## Hook post-merge

Útil para ejecutar `npm install` después de hacer merge si hubo cambios en `package-lock.json`.

## Administración con Husky

Gestionar hooks manualmente (.git/hooks/) no escala. Husky permite definirlos en `package.json` y compartirlos con el equipo.

¿Quieres automatizar tu flujo con Git Hooks? En Vynta configuramos pipelines de calidad que protegen tu código.
