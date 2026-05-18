---
title: "ESLint: custom rules for your project"
description: "Create custom ESLint rules for your project. Learn to write plugins, rules, and configurations tailored to your team's needs."
date: "2026-02-02"
tags: ["ESLint", "Linter", "Code Quality", "TypeScript"]
---

## Why custom rules?

ESLint comes with excellent rules, but every project has unique needs. Custom rules let you enforce domain-specific patterns, avoid common team anti-patterns, and automate design decisions.

## Rule structure

```typescript
module.exports = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Enforce async function naming' },
    schema: [],
  },
  create(context) {
    return {
      FunctionDeclaration(node) {
        if (node.async && !node.id.name.startsWith('fetch')) {
          context.report({
            node,
            message: 'Async functions should start with "fetch"',
          });
        }
      },
    };
  },
};
```

## Creating a plugin

Group your rules into an ESLint plugin. Typical structure:

```
eslint-plugin-mycompany/
  rules/
    async-naming.js
    no-direct-db.js
  index.js
```

## Useful rules for teams

- Ban direct imports from certain modules (e.g., database from controllers).
- Enforce naming conventions.
- Prevent unsafe patterns.
- Require JSDoc on public functions.

Need custom ESLint rules? At Vynta we create linting configurations for your project.
