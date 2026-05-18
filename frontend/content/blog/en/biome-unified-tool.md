---
title: "Biome: the unified tool replacing ESLint and Prettier"
description: "Biome unifies linting and formatting in a single tool. Configuration, migration from ESLint + Prettier, and performance advantages."
date: "2026-03-02"
tags: ["Biome", "Linter", "Formatter", "Tools"]
---

## What is Biome?

Biome is a unified tool that combines linter and formatter, written in Rust. Its goal is to replace ESLint + Prettier with a single dependency, orders of magnitude faster.

## Installation

```bash
npm install --save-dev @biomejs/biome
```

## Configuration

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

## Migration from ESLint + Prettier

Biome offers a migration command:

```bash
npx @biomejs/biome migrate eslint --write
```

It analyzes your ESLint config and generates the Biome equivalent.

## Performance

Biome is 10-100x faster than ESLint. It processes large projects in milliseconds. In CI, this means faster pipelines.

## Should you migrate?

If starting a new project, Biome is the best choice. If you have a legacy project with extensive ESLint config, evaluate if your custom rules have Biome equivalents.

Want to try Biome in your project? At Vynta we migrate code quality tools.
