---
title: "Comunicación en tiempo real: WebSockets vs Server-Sent Events"
description: "Compara WebSockets y Server-Sent Events (SSE) para la comunicación web en tiempo real. Conoce las diferencias técnicas, los casos de uso y cuándo elegir cada enfoque."
date: "2025-06-27"
tags: ["Desarrollo Web", "Tiempo Real", "Backend"]
---

La comunicación en tiempo real es una expectativa estándar en las aplicaciones web modernas. Dos tecnologías principales la hacen posible: WebSockets y Server-Sent Events (SSE). Aunque ambas permiten el flujo de datos en tiempo real del servidor al cliente, tienen diferencias fundamentales que hacen que cada una sea adecuada para escenarios distintos.

Esta guía compara ambos enfoques y te ayuda a elegir.

## WebSockets

Los WebSockets proporcionan comunicación full-duplex — tanto el cliente como el servidor pueden enviar mensajes en cualquier momento. La conexión comienza como una petición HTTP que se actualiza al protocolo WebSocket (`ws://` o `wss://`).

**Ideales para:**
- Comunicación bidireccional (chat, edición colaborativa, juegos multijugador)
- Aplicaciones interactivas donde ambos lados envían mensajes frecuentes
- Requisitos de baja latencia

**Características:**
- Full-duplex: cliente y servidor envían y reciben
- Protocolo: protocolo WebSocket personalizado (no HTTP)
- Soporte en navegadores: excelente (todos los navegadores modernos)
- Librerías: Socket.io, ws (Node.js), SignalR (.NET)

**Limitaciones:**
- Sin reconexión automática (debe implementarse manualmente)
- Sin tipos de evento integrados (los mensajes son blobs opacos)
- Complejo de escalar horizontalmente (conexiones con estado)
- Cortafuegos y proxies a veces bloquean conexiones WebSocket

## Server-Sent Events (SSE)

SSE es un mecanismo HTTP estándar mediante el cual el servidor envía eventos al cliente a través de una única conexión HTTP persistente. El cliente se suscribe a los mensajes usando la API `EventSource`.

```javascript
const source = new EventSource("/api/events");
source.addEventListener("message", (event) => {
  console.log("Recibido:", event.data);
});
```

**Ideales para:**
- Flujos de datos unidireccionales (notificaciones, feeds en vivo, actualizaciones de estado)
- Actualizaciones del servidor al cliente
- Aplicaciones que ya usan infraestructura HTTP

**Características:**
- Símplex: el servidor envía, el cliente recibe (el cliente puede enviar mediante peticiones HTTP separadas)
- Protocolo: HTTP estándar (funciona a través de todos los cortafuegos y proxies)
- Soporte en navegadores: bueno (Firefox, Chrome, Safari), no en algunos navegadores antiguos
- Reconexión automática integrada en la API `EventSource`
- Tipos de evento integrados (eventos con nombre mediante el campo `event:`)

**Limitaciones:**
- Solo unidireccional — el servidor no puede recibir mensajes en la misma conexión
- Limitado a 6 conexiones simultáneas por dominio (limitación del navegador)
- Sin soporte de mensajes binarios (solo texto por defecto)
- Ecosistema menos maduro que WebSockets

## Comparativa de rendimiento

| Aspecto | WebSockets | SSE |
|---------|------------|-----|
| Latencia | Mínima (conexión persistente) | Mínima (conexión persistente) |
| Sobrecarga | Baja (tras la actualización) | Baja (HTTP estándar) |
| Concurrencia por dominio | Ilimitada (conexión separada) | ~6 conexiones (límite del navegador) |
| Formato de mensaje | Binario o texto | Solo texto |
| Escalado | Complejo (con estado) | Más simple (diseño sin estado) |

## Cuándo usar cada uno

**Usa WebSockets cuando** necesites comunicación bidireccional: aplicaciones de chat, herramientas de edición colaborativa, juegos multijugador, plataformas de trading financiero en tiempo real.

**Usa SSE cuando** necesites solo actualizaciones del servidor al cliente: notificaciones en vivo, feeds de redes sociales, paneles de control en tiempo real, barras de progreso para trabajos de larga duración, actualizaciones de contenido push.

## El enfoque híbrido

Algunas aplicaciones usan ambos. Una aplicación de chat usa WebSockets para el intercambio de mensajes pero recurre a SSE para notificaciones cuando el usuario está menos activo. Las plataformas de trading usan WebSockets para datos de mercado y SSE para notificaciones de cuenta.

---

La comunicación en tiempo real no es única para todos los casos. La elección del protocolo debe coincidir con tu patrón de flujo de datos — bidireccional para apps interactivas, server-push para actualizaciones tipo notificación.

¿Estás implementando funcionalidades en tiempo real en tu aplicación web? En Vynta seleccionamos e implementamos el protocolo de comunicación en tiempo real adecuado para tu caso de uso específico.
