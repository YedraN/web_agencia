---
title: "Tree Shaking: elimina código muerto de tu bundle"
description: "Tree Shaking elimina código JavaScript no utilizado durante el build. Aprende a configurarlo correctamente para reducir el tamaño de tu bundle."
date: "2025-08-19"
tags: ["Tree Shaking", "JavaScript", "Optimización", "Bundle"]
---

## Introducción

Tree Shaking es el proceso de eliminar código muerto (dead code) del bundle final. Aprovecha los módulos ES (ESM) para detectar qué exports se usan y cuáles no.

## Cómo funciona

Cuando importas solo partes de un módulo, el bundler marca los exports no usados como muertos. En el build final, un minificador (como Terser) elimina ese código.

## Requisitos para tree shaking

Necesitas usar módulos ES (import/export), no CommonJS. El bundler debe estar configurado para tree shaking y el minificador debe eliminar código muerto.

## Side effects

Los módulos con efectos secundarios no se pueden eliminar. Marca los archivos sin side effects en package.json con `"sideEffects": false` para permitir tree shaking.

## Problemas comunes

Importar bibliotecas completas en lugar de subrutas, usar CommonJS, y módulos con side effects no declarados son las causas más comunes de tree shaking fallido.

## Buenas prácticas

Importa solo lo que necesitas: `import { map } from 'lodash-es'` en lugar de `import _ from 'lodash'`. Usa bibliotecas tree-shakeable.

## Conclusión

Tree shaking puede reducir tu bundle hasta un 50%. En **Vynta** optimizamos bundles con tree shaking efectivo para entregar menos JavaScript a los usuarios.
