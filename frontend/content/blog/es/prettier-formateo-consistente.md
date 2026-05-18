---
title: "Prettier: formateo de código consistente en equipo"
description: "Configura Prettier para formateo automático de código en equipo. Integración con ESLint, Husky y CI para mantener un estilo consistente."
date: "2026-02-15"
tags: ["Prettier", "Formatter", "Calidad de código", "Herramientas"]
---

## ¿Qué es Prettier?

Prettier es un formateador de código opinado. Analiza tu código y lo reescribe con reglas de formato consistentes. Elimina las discusiones sobre estilo en el equipo: no hay configuración infinita, solo funciona.

## Instalación

```bash
npm install --save-dev prettier
```

## Configuración mínima

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100
}
```

## Integración con ESLint

Usa `eslint-config-prettier` para desactivar reglas de ESLint que conflictúan con Prettier. Así ESLint se encarga de la lógica y Prettier del formato.

```bash
npm install --save-dev eslint-config-prettier
```

```json
{
  "extends": ["eslint:recommended", "prettier"]
}
```

## Formateo automático con Husky

```bash
npm install --save-dev lint-staged
```

```json
{
  "lint-staged": {
    "*.{js,ts,tsx,json,css,md}": ["prettier --write", "eslint --fix"]
  }
}
```

## Prettier en CI

Añade un step en CI que verifique el formato:

```bash
npx prettier --check .
```

## Beneficios

- No más discusiones sobre puntos y comas.
- Código uniforme en todo el proyecto.
- Los PRs muestran solo cambios relevantes.
- Los nuevos miembros se adaptan rápido.

¿Quieres formateo consistente en tu equipo? En Vynta configuramos herramientas de calidad de código.
