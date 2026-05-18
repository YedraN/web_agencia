---
title: "TanStack Router: el router type-safe para React"
description: "TanStack Router es un router para React con tipos de extremo a extremo, carga de datos integrada y lazy loading automático."
date: "2025-05-06"
tags: ["TanStack Router", "React", "Routing", "Type Safety"]
---

## Introducción

TanStack Router es el nuevo router de la familia TanStack. Ofrece tipo safety de extremo a extremo, validación de search params y carga de datos integrada.

## Type Safety completo

Cada ruta tiene tipos para params, search params y datos cargados. Los enlaces a rutas se validan en tiempo de compilación. Nunca más rutas rotas.

## Carga de datos integrada

Cada ruta puede definir un `loader` que se ejecuta antes de renderizar. Los datos están disponibles en el componente con tipos completos.

## Lazy loading automático

Las rutas se dividen automáticamente en chunks. Sin configuración, sin `React.lazy`. El router carga el código de cada ruta bajo demanda.

## Validación de search params

Define esquemas de validación para search params usando Zod. Los parámetros se validan y tipan automáticamente en la URL.

## Conclusión

TanStack Router es el router más type-safe para React. En **Vynta** lo usamos para aplicaciones donde la seguridad de tipos y el rendimiento son críticos.
