---
title: "ESLint: reglas personalizadas para tu proyecto"
description: "Crea reglas personalizadas de ESLint para tu proyecto. Aprende a escribir plugins, reglas y configuraciones que se adapten a tu equipo."
date: "2026-02-01"
tags: ["ESLint", "Linter", "Calidad de código", "TypeScript"]
---

## ¿Por qué reglas personalizadas?

ESLint viene con reglas excelentes, pero cada proyecto tiene necesidades únicas. Las reglas personalizadas te permiten enforced patrones específicos de tu dominio, evitar anti-patrones comunes en tu equipo y automatizar decisiones de diseño.

## Estructura de una regla

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

## Crear un plugin

Agrupa tus reglas en un plugin ESLint. La estructura típica es:

```
eslint-plugin-mycompany/
  rules/
    async-naming.js
    no-direct-db.js
  index.js
```

## Configuración en el proyecto

```json
{
  "plugins": ["mycompany"],
  "rules": {
    "mycompany/async-naming": "error",
    "mycompany/no-direct-db": "warn"
  }
}
```

## Reglas útiles para equipos

- Prohibir importaciones directas de ciertos módulos (ej: base de datos desde controladores).
- Forzar convenciones de nomenclatura.
- Prevenir patrones inseguros.
- Exigir JSDoc en funciones públicas.

¿Necesitas reglas ESLint a medida? En Vynta creamos configuraciones de linting para tu proyecto.
