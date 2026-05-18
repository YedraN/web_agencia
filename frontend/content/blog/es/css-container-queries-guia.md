---
title: "CSS Container Queries: diseño responsive por componentes"
description: "CSS Container Queries permiten diseñar componentes que se adaptan al tamaño de su contenedor, no al viewport. Aprende a usarlos con ejemplos prácticos."
date: "2025-01-14"
tags: ["CSS", "Container Queries", "Responsive", "Diseño"]
---

## Introducción

CSS Container Queries son una de las características más solicitadas en CSS. Permiten que un componente responda al tamaño de su contenedor padre en lugar del viewport.

## La diferencia con Media Queries

Las media queries miran el viewport. Las container queries miran el tamaño del contenedor. Esto permite componentes verdaderamente reutilizables que se adaptan a cualquier espacio.

## Cómo usar Container Queries

Define un contenedor con `container-type: inline-size` y luego usa `@container (min-width: 400px)` para aplicar estilos según el tamaño del contenedor.

## Ejemplos prácticos

Tarjetas que cambian de layout en una cuadrícula, barras laterales que se colapsan automáticamente, y formularios que reorganizan sus campos según el espacio disponible.

## Soporte en navegadores

Container Queries están soportadas en todos los navegadores modernos desde 2024. Ya se pueden usar en producción sin problemas.

## Conclusión

Container Queries cambian las reglas del diseño responsive. En **Vynta** las aplicamos para crear componentes verdaderamente independientes del contexto.
