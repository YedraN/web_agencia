---
title: "Web Workers: multithreading en el navegador"
description: "Web Workers permiten ejecutar código en hilos separados del navegador. Aprende a usar multithreading para mejorar el rendimiento de tus apps web."
date: "2025-06-10"
tags: ["Web Workers", "Multithreading", "Rendimiento", "JavaScript"]
---

## Introducción

JavaScript es monohilo, pero los Web Workers permiten ejecutar código en hilos paralelos. Ideal para operaciones costosas que no deben bloquear la UI.

## ¿Qué son los Web Workers?

Son scripts que se ejecutan en un hilo separado del hilo principal. Se comunican con el hilo principal mediante mensajes con `postMessage` y `onmessage`.

## Tipos de Workers

Hay varios tipos: Dedicated Workers (un solo uso), Shared Workers (compartidos entre ventanas) y Service Workers (para red y caché).

## Casos de uso

Procesamiento de imágenes, manipulación de audio, cifrado de datos, parsing de archivos grandes, y cálculos complejos en tiempo real.

## Comunicación con el hilo principal

Usa `postMessage` para enviar datos y escucha con `onmessage`. Los datos se copian (no se comparten) usando el algoritmo de clonado estructurado.

## Transferables

Para objetos grandes como ArrayBuffer, usa `transferable` para mover la propiedad sin copiar. Mucho más rápido para datos binarios.

## Conclusión

Web Workers son esenciales para aplicaciones que procesan datos intensivos. En **Vynta** los usamos para mantener la UI receptiva incluso con cargas pesadas.
