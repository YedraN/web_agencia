---
title: "Husky and lint-staged: code quality before commits"
description: "Configure Husky and lint-staged to automatically run linters and tests before each commit. Guaranteed code quality."
date: "2026-03-16"
tags: ["Husky", "lint-staged", "Git Hooks", "Code Quality"]
---

## What is Husky?

Husky simplifies Git Hooks management in JavaScript projects. It lets you define hooks in `package.json` or configurable files, shared with the entire team.

## Installation

```bash
npm install --save-dev husky
npx husky init
```

This creates the `.husky/` directory with a sample `pre-commit` hook.

## Creating hooks

```bash
echo "npx lint-staged" > .husky/pre-commit
echo "npm test" > .husky/pre-push
```

## lint-staged

lint-staged runs linters only on files in the staging area. This is key for large teams: you don't lint the entire project every time.

```json
{
  "lint-staged": {
    "*.{js,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

## Complete flow

1. You `git add` your files.
2. You run `git commit`.
3. Husky triggers the `pre-commit` hook.
4. lint-staged runs ESLint and Prettier only on staged files.
5. If everything passes, the commit is created. If not, it's canceled with errors.

Want quality guaranteed before commits? At Vynta we configure pre-commit hooks for your team.
