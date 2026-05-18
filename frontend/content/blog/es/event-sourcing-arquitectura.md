---
title: "Event Sourcing: arquitectura basada en eventos"
description: "Guía de Event Sourcing: almacena el estado como secuencia de eventos, beneficios de auditoría, reconstrucción de estado y proyecciones."
date: "2025-04-02"
tags: ["Event Sourcing", "Arquitectura", "Eventos", "Backend"]
---

Event Sourcing es un patrón arquitectónico donde el estado actual de una entidad se almacena como una secuencia inmutable de eventos. En lugar de guardar "el usuario tiene saldo 100", almacenas "usuario recibió 50", "usuario gastó 30", "usuario recibió 80".

## Cómo funciona

Cada cambio de estado se registra como un evento inmutable en un event store (base de datos de eventos). Para conocer el estado actual, reproduces todos los eventos de la entidad en orden. Este proceso se llama event replay.

## Beneficios clave

- **Auditoría completa**: cada cambio tiene un registro inmutable con quién, cuándo y qué cambió.
- **Reconstrucción de estado**: puedes reconstruir el estado en cualquier punto del tiempo.
- **Flexibilidad de proyecciones**: crea nuevas vistas de datos (proyecciones) reproduciendo eventos históricos.
- **Integración natural con CQRS**: los eventos son la fuente de verdad para ambos modelos.

## Desafíos

La complejidad es el mayor desafío. El versionado de eventos requiere planificación cuidadosa. La reconstrucción de estado puede ser lenta con millones de eventos (solucionable con snapshots). El almacenamiento crece indefinidamente.

## Event Store y herramientas

Bases de datos especializadas como EventStoreDB ofrecen almacenamiento optimizado para eventos. PostgreSQL también puede funcionar como event store con tablas bien diseñadas e indexación. Herramientas como Kafka son populares para event sourcing distribuido.

Event Sourcing es ideal para sistemas financieros, auditoría, trazabilidad y aplicaciones donde el historial de cambios es un requisito de negocio. En Vynta diseñamos arquitecturas basadas en eventos para empresas que necesitan trazabilidad completa.
