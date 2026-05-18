---
title: "Backpressure: cómo manejar la carga en sistemas reactivos"
description: "Guía de Backpressure en sistemas reactivos: estrategias para manejar picos de carga, buffers, throttling y control de flujo en Node.js."
date: "2025-02-15"
tags: ["Backpressure", "Reactivo", "Streams", "Rendimiento"]
---

Backpressure (contrapresión) es el mecanismo que permite a un sistema manejar diferencias entre la velocidad de producción y consumo de datos. Sin backpressure, un productor rápido puede saturar a un consumidor lento, causando caídas de rendimiento o pérdida de datos.

## Backpressure en Node.js Streams

Node.js implementa backpressure nativa en los streams. Cuando el consumidor no puede procesar datos tan rápido como el productor los genera, el buffer interno se llena y `writable.write()` devuelve `false`. El stream emite `'drain'` cuando puede aceptar más datos.

## Estrategias de backpressure

**Buffering**: almacena datos temporalmente. Simple pero puede consumir mucha memoria si los picos son grandes.

**Throttling**: limita la tasa de producción. Ejemplo: procesar máximo 1000 requests por segundo.

**Batching**: agrupa datos en lotes. El consumidor procesa lotes completos, mejorando el throughput.

**Drop**: descarta datos cuando el buffer está lleno. Aceptable para logs o métricas donde perder algunos puntos es tolerable.

## Backpressure en microservicios

En sistemas distribuidos, la backpressure se gestiona a nivel de protocolo. Kafka maneja backpressure con `max.poll.records` y `fetch.max.bytes`. gRPC con flow control de HTTP/2. RabbitMQ con QoS prefetch.

## Reactive Streams y RxJS

El estándar Reactive Streams formaliza la backpressure entre componentes asíncronos. RxJS implementa backpressure con operadores como `buffer`, `throttle`, `debounce` y `sample`. Para sistemas reactivos en Node.js, RxJS es la herramienta estándar.

El manejo de backpressure es fundamental para sistemas estables bajo carga. En Vynta diseñamos sistemas reactivos que mantienen el rendimiento incluso bajo picos de tráfico.
