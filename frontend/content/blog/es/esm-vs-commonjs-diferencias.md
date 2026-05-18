---
title: "ESM vs CommonJS: diferencias y cuándo usar cada uno"
description: "Comparativa entre ES modules (ESM) y CommonJS. Diferencias de sintaxis, carga, rendimiento y cuándo elegir cada sistema de módulos en Node.js."
date: "2025-08-26"
tags: ["ESM", "CommonJS", "JavaScript", "Node.js"]
---

## Introducción

JavaScript tiene dos sistemas de módulos principales: CommonJS (CJS) y ES Modules (ESM). Cada uno tiene sus fortalezas y casos de uso ideales.

## Sintaxis

CommonJS usa `require()` y `module.exports`. ESM usa `import` y `export`. La sintaxis de ESM es estática, lo que permite análisis en tiempo de compilación.

## Carga síncrona vs asíncrona

CommonJS carga módulos de forma síncrona, ideal para Node.js. ESM carga de forma asíncrona, permitiendo tree shaking y mejor rendimiento en el navegador.

## Compatibilidad

Node.js soporta ambos sistemas desde la versión 14. Usa `.mjs` para ESM, `.cjs` para CommonJS, o configura `"type": "module"` en package.json.

## Rendimiento

ESM permite tree shaking, carga asíncrona y mejor cacheo. CommonJS es más maduro y compatible con más librerías, especialmente las antiguas.

## Migración

Puedes usar ambos en el mismo proyecto con interoperabilidad. `import()` desde CommonJS y `createRequire` desde ESM permiten convivencia.

## Conclusión

ESM es el futuro, pero CommonJS sigue siendo relevante. En **Vynta** usamos ESM en proyectos nuevos y CommonJS cuando trabajamos con librerías legacy.
