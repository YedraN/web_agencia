---
title: "Tree Shaking: remove dead code from your bundle"
description: "Tree Shaking removes unused JavaScript code during build. Learn to configure it correctly to reduce your bundle size."
date: "2025-08-19"
tags: ["Tree Shaking", "JavaScript", "Optimization", "Bundle"]
---

## Introduction

Tree Shaking is the process of removing dead code from the final bundle. It leverages ES modules (ESM) to detect which exports are used and which are not.

## How it works

When you import only parts of a module, the bundler marks unused exports as dead. During the final build, a minifier (like Terser) removes that code.

## Requirements for tree shaking

You need to use ES modules (import/export), not CommonJS. The bundler must be configured for tree shaking and the minifier must remove dead code.

## Side Effects

Modules with side effects cannot be removed. Mark files without side effects in package.json with `"sideEffects": false` to enable tree shaking.

## Common Problems

Importing entire libraries instead of subpaths, using CommonJS, and modules with undeclared side effects are the most common causes of failed tree shaking.

## Best Practices

Import only what you need: `import { map } from 'lodash-es'` instead of `import _ from 'lodash'`. Use tree-shakeable libraries.

## Conclusion

Tree shaking can reduce your bundle by up to 50%. At **Vynta**, we optimize bundles with effective tree shaking to deliver less JavaScript to users.
