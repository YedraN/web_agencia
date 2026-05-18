---
title: "Zustand Persist: cómo guardar estado localmente"
description: "Zustand Persist middleware permite guardar el estado en localStorage, AsyncStorage o IndexedDB. Aprende a persistir el estado de tu app React."
date: "2025-05-20"
tags: ["Zustand", "Persistencia", "React", "Estado"]
---

## Introducción

El middleware `persist` de Zustand permite guardar y restaurar el estado automáticamente en almacenamiento local. Ideal para mantener sesiones, preferencias y datos offline.

## Configuración básica

Importa `persist` de `zustand/middleware` y envuelve tu store. Por defecto usa `localStorage`. El estado se guarda automáticamente en cada cambio.

## Almacenamiento personalizado

Puedes usar `AsyncStorage` para React Native, `IndexedDB` para grandes volúmenes o `cookieStorage` para compatibilidad con SSR.

## Partialize y merge

Con `partialize` eliges qué partes del estado persistir. Con `merge` controlas cómo se fusiona el estado guardado con el inicial.

## Versionado

`version` y `migrate` permiten manejar cambios en la estructura del estado entre versiones de la aplicación.

## Casos de uso

Carrito de compras persistente, preferencias de tema, último paso de un formulario multi-paso, y tokens de sesión.

## Conclusión

Zustand Persist simplifica la persistencia de estado. En **Vynta** lo usamos para crear experiencias continuas donde el usuario retoma donde lo dejó.
