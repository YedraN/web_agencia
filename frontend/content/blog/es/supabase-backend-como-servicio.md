---
title: "Supabase: backend como servicio open-source"
description: "Supabase ofrece base de datos PostgreSQL, autenticación, almacenamiento y APIs en tiempo real como alternativa open-source a Firebase."
date: "2025-04-15"
tags: ["Supabase", "PostgreSQL", "BaaS", "Backend"]
---

Supabase se ha convertido en la alternativa open-source más popular a Firebase. Ofrece una suite completa de backend: base de datos PostgreSQL, autenticación, almacenamiento de archivos, APIs en tiempo real y edge functions.

## PostgreSQL como centro del ecosistema

A diferencia de Firebase que usa una base de datos NoSQL, Supabase se construye sobre PostgreSQL. Esto significa que obtienes joins, transacciones, índices, vistas y todo el poder de SQL. Supabase extiende PostgreSQL con APIs REST y GraphQL generadas automáticamente desde tu esquema mediante PostgREST y pg_graphql.

## Autenticación y almacenamiento

Supabase Auth soporta email/contraseña, OAuth (Google, GitHub, Apple, etc.) y magic links. Las Row Level Security (RLS) policies de PostgreSQL se integran directamente, permitiendo control de acceso a nivel de fila sin lógica adicional.

El almacenamiento de archivos soporta imágenes, videos y documentos con transformaciones de imágenes integradas y políticas de seguridad basadas en RLS.

## Tiempo real y edge functions

Las suscripciones Realtime utilizan WebSocket para sincronizar cambios de base de datos con los clientes. Edge Functions se ejecutan en Deno y pueden procesar webhooks, validar datos y extender la lógica del backend.

Supabase permite construir aplicaciones completas sin gestionar servidores. En Vynta desarrollamos productos digitales sobre Supabase combinando la potencia de PostgreSQL con la velocidad del desarrollo serverless.
