---
title: "CQRS: separación de lecturas y escrituras en arquitecturas"
description: "Guía de CQRS (Command Query Responsibility Segregation): cómo separar lecturas y escrituras para escalar y optimizar tu aplicación."
date: "2025-06-22"
tags: ["CQRS", "Arquitectura", "Patrones", "Backend"]
---

CQRS (Command Query Responsibility Segregation) es un patrón arquitectónico que separa las operaciones de lectura (queries) de las de escritura (commands). En lugar de usar un mismo modelo para ambas, cada operación tiene su propio modelo y, opcionalmente, su propia base de datos.

## Cuándo aplicar CQRS

CQRS brilla en aplicaciones donde los patrones de lectura y escritura son asimétricos. Por ejemplo, un sistema de e-commerce: las escrituras son inserts simples (crear pedido), pero las lecturas implican agregaciones complejas (historial de pedidos, recomendaciones, reportes).

## Beneficios

- **Escalabilidad independiente**: escalas lecturas y escrituras por separado.
- **Optimización por caso de uso**: la base de datos de lecturas puede ser denormalizada para consultas rápidas (Elasticsearch, Redis), mientras las escrituras usan una base normalizada (PostgreSQL).
- **Modelos de dominio más limpios**: los commands modelan intenciones del usuario, no operaciones CRUD.

## Consideraciones

CQRS introduce complejidad: consistencia eventual entre modelos, sincronización de datos, y más código que mantener. No es recomendable para aplicaciones CRUD simples.

## CQRS sin Event Sourcing

CQRS puede implementarse sin Event Sourcing. El modelo de escritura persiste en PostgreSQL, y un worker actualiza el modelo de lectura (vistas materializadas, cachés, Elasticsearch). La latencia de sincronización suele ser de milisegundos.

## CQRS con NestJS

NestJS soporta CQRS con el paquete `@nestjs/cqrs`. Los commands y queries se definen como clases, los handlers procesan la lógica, y el command/query bus los distribuye.

CQRS es un patrón poderoso para aplicaciones con requisitos complejos de lectura/escritura. En Vynta diseñamos arquitecturas CQRS que escalan con tu negocio.
