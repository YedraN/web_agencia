---
title: "Server-Sent Events: comunicaciones unidireccionales eficientes"
description: "Guía de Server-Sent Events (SSE): comunicación unidireccional servidor-cliente más eficiente que WebSocket para notificaciones y streams."
date: "2026-01-15"
tags: ["SSE", "Server-Sent Events", "Tiempo real", "Streaming"]
---

Server-Sent Events (SSE) es una tecnología a menudo infravalorada que permite al servidor enviar datos al cliente de forma eficiente sobre HTTP estándar.

## ¿Qué hace único a SSE?

SSE establece una conexión HTTP persistente donde el servidor envía eventos de texto estructurados al cliente. A diferencia de WebSocket, SSE es unidireccional (solo servidor a cliente) y funciona sobre HTTP/1.1 y HTTP/2 nativo.

Las ventajas de SSE incluyen: reconexión automática (el navegador se reconecta si la conexión se pierde), eventos con IDs (el cliente reenvía el último ID recibido), compatibilidad con proxies y balanceadores HTTP, y funciona detrás de firewalls corporativos que bloquean WebSocket.

## Cuándo usar SSE

SSE es ideal para: dashboards en tiempo real, notificaciones push, feeds de actividad, logs en vivo, progreso de tareas largas, actualizaciones de precios y subtítulos en vivo.

No es adecuado para comunicación bidireccional (chats, juegos multijugador) o cuando el cliente necesita enviar datos frecuentemente.

## Implementación práctica

En Node.js, SSE se implementa con `res.writeHead(200, { 'Content-Type': 'text/event-stream' })` y `res.write()`. El formato es simple:
```
id: 1
event: message
data: {"text": "Hola"}

```

Frameworks como Hono, Fastify y Express facilitan la implementación con helpers específicos.

## Rendimiento y escalabilidad

SSE consume menos recursos que WebSocket porque no requiere el handshake de upgrade ni mantener abierto el protocolo WebSocket. HTTP/2 multiplexa múltiples streams SSE sobre una sola conexión TCP.

Cuando necesitas comunicación servidor-cliente eficiente y simple, SSE es la mejor opción. En Vynta implementamos SSE para dashboards y notificaciones en tiempo real.
