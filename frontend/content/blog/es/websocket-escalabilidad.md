---
title: "WebSockets: escalabilidad para aplicaciones en tiempo real"
description: "Estrategias de escalabilidad para WebSockets: sticky sessions, Redis Pub/Sub, load balancing y cómo gestionar millones de conexiones concurrentes."
date: "2025-10-01"
tags: ["WebSockets", "Tiempo real", "Escalabilidad", "Backend"]
---

WebSockets permite comunicación bidireccional en tiempo real entre cliente y servidor. Escalar esta comunicación a millones de conexiones presenta desafíos únicos.

## El desafío de escalar WebSockets

A diferencia de HTTP (sin estado, fácil de balancear), WebSockets mantiene conexiones persistentes con estado. Un balanceador de carga tradicional distribuye requests entre instancias, pero con WebSocket cada conexión queda atada a una instancia específica.

## Sticky Sessions

La solución más simple: el balanceador dirige todas las requests de un WebSocket a la misma instancia usando la IP de origen o una cookie. NGINX soporta `ip_hash`, HAProxy usa `stick-table`. Funciona pero crea distribuciones desiguales y problemas cuando una instancia falla.

## Redis Pub/Sub para escalado horizontal

Para escalar WebSocket horizontalmente, usa Redis Pub/Sub como bus de mensajes. Cuando un mensaje llega a una instancia, se publica en Redis y todas las instancias suscritas lo reenvían a sus clientes conectados.

## Socket.IO y alternativas

Socket.IO ofrece escalabilidad con Redis adapter integrado. Para equipos que construyen desde cero, implementar un patrón publish-subscribe con Redis es relativamente simple.

## Buenas prácticas

Usa health checks de WebSocket (ping/pong). Implementa reconexión automática con backoff exponencial. Monitorea el número de conexiones abiertas y el uso de memoria. Considera servicios gestionados como Pusher, Ably o AWS API Gateway WebSocket.

Las aplicaciones en tiempo real son cada vez más demandadas. En Vynta diseñamos arquitecturas WebSocket escalables que manejan millones de conexiones sin degradación.
