---
title: "Conventional Commits: estandariza tus mensajes de commit"
description: "Guía completa de Conventional Commits para estandarizar mensajes de commit, automatizar versionado semántico y generar changelogs automáticos."
date: "2025-02-01"
tags: ["Git", "Conventional Commits", "Semantic Versioning", "Automatización"]
---

## ¿Qué son los Conventional Commits?

Conventional Commits es una convención para escribir mensajes de commit de forma estructurada. Cada commit sigue un formato que permite automatizar herramientas como Semantic Release, generar changelogs y determinar la siguiente versión semántica del proyecto.

## Formato básico

`tipo(alcance): descripción breve`

Los tipos principales son: `feat` (nueva funcionalidad), `fix` (corrección de bug), `chore` (tareas de mantenimiento), `docs` (documentación), `refactor` (refactorización), `test` (pruebas) y `style` (formato).

## Ejemplos prácticos

```
feat(auth): add login with Google OAuth
fix(api): handle timeout errors on payment endpoint
docs(readme): update installation instructions
```

## Beneficios clave

- **Versionado semántico automático**: detecta si el cambio es major, minor o patch.
- **Changelogs generados automáticamente**: cada tipo de commit alimenta una sección del changelog.
- **Legibilidad**: el historial de Git se vuelve comprensible de un vistazo.

## Implementación con commitlint

Usa commitlint y husky para validar los mensajes antes de cada commit. Así garantizas que todo el equipo siga el estándar sin excepciones.

¿Quieres implementar Conventional Commits en tu proyecto? En Vynta te ayudamos a configurar la automatización completa.
