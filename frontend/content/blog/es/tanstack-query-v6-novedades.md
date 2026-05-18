---
title: "TanStack Query v6: novedades y mejoras"
description: "TanStack Query v6 llega con mejoras en SSR, React 19 support, nuevo DevTools y API más simple. Descubre todas las novedades."
date: "2025-04-29"
tags: ["TanStack Query", "React", "Fetching", "Caché"]
---

## Introducción

TanStack Query (antes React Query) es la biblioteca más popular para gestión de estado asíncrono. La versión 6 trae mejoras significativas en rendimiento y experiencia de desarrollo.

## React 19 y Server Components

v6 ofrece integración nativa con React 19 y Server Components. Ahora puedes precargar queries en el servidor y continuarlas en el cliente sin duplicación.

## API simplificada

`useQuery` y `useMutation` reciben una API más limpia. Las opciones como `staleTime` y `gcTime` (antes `cacheTime`) tienen valores por defecto más sensatos.

## Nuevo DevTools

Las herramientas de desarrollo han sido reescritas con una interfaz más intuitiva. Muestra el estado de cada query, su última actualización y las dependencias.

## Optimistic updates mejorados

La API para actualizaciones optimistas se simplifica con `onMutate` más predecible y rollback automático en caso de error.

## Conclusión

TanStack Query v6 es más rápido, más simple y mejor integrado con el ecosistema moderno. En **Vynta** lo usamos para gestionar datos de API de forma eficiente.
