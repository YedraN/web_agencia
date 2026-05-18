---
title: "Prettier: consistent code formatting in teams"
description: "Configure Prettier for automatic code formatting in teams. Integration with ESLint, Husky, and CI to maintain consistent style."
date: "2026-02-16"
tags: ["Prettier", "Formatter", "Code Quality", "Tools"]
---

## What is Prettier?

Prettier is an opinionated code formatter. It parses your code and rewrites it with consistent formatting rules. It eliminates style discussions in the team: no endless configuration, it just works.

## Installation

```bash
npm install --save-dev prettier
```

## Minimal configuration

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100
}
```

## ESLint integration

Use `eslint-config-prettier` to disable ESLint rules that conflict with Prettier. ESLint handles logic, Prettier handles formatting.

```bash
npm install --save-dev eslint-config-prettier
```

```json
{
  "extends": ["eslint:recommended", "prettier"]
}
```

## Auto-formatting with Husky

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

## Prettier in CI

Add a CI step that checks formatting:

```bash
npx prettier --check .
```

Want consistent formatting in your team? At Vynta we configure code quality tools.
