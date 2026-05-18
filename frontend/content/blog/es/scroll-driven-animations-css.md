---
title: "Scroll-Driven Animations: animaciones basadas en scroll con CSS"
description: "Scroll-Driven Animations permiten animar elementos en función del scroll del usuario sin JavaScript. Cómo usar la nueva API de animaciones CSS."
date: "2025-02-25"
tags: ["CSS", "Animaciones", "Scroll", "Rendimiento"]
---

## Introducción

Las Scroll-Driven Animations permiten animaciones que responden al scroll del usuario usando solo CSS. Sin Intersection Observer, sin librerías, sin JavaScript.

## Timeline de scroll

El nuevo concepto de `scroll-timeline` define un eje de progresión basado en el scroll del contenedor. Las animaciones se vinculan a esta línea temporal.

## Sintaxis básica

Usa `animation-timeline: scroll()` para vincular una animación al scroll. Controla el rango con `animation-range` para definir cuándo empieza y termina.

## Ejemplos prácticos

Barras de progreso, headers que se encogen, imágenes que aparecen al hacer scroll, y parallax completamente en CSS.

## View Timeline

`view-timeline` vincula la animación a cuándo un elemento entra o sale del viewport, perfecto para animaciones de entrada con scroll.

## Conclusión

Scroll-Driven Animations eliminan la necesidad de JavaScript para animaciones de scroll. En **Vynta** creamos experiencias de scroll cautivadoras con CSS puro.
