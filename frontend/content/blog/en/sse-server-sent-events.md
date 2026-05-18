---
title: "Server-Sent Events: efficient one-way communications"
description: "Guide to Server-Sent Events (SSE): one-way server-to-client communication more efficient than WebSocket for notifications and streams."
date: "2026-01-15"
tags: ["SSE", "Server-Sent Events", "Real-time", "Streaming"]
---

Server-Sent Events (SSE) is an often underestimated technology that enables servers to send data to clients efficiently over standard HTTP.

## What makes SSE unique

SSE establishes a persistent HTTP connection where the server sends structured text events to the client. Unlike WebSocket, SSE is unidirectional (server to client only) and works over native HTTP/1.1 and HTTP/2.

SSE advantages include: automatic reconnection (the browser reconnects if the connection drops), events with IDs (the client resends the last received ID), compatibility with HTTP proxies and load balancers, and works behind corporate firewalls that block WebSocket.

## When to use SSE

SSE is ideal for: real-time dashboards, push notifications, activity feeds, live logs, long task progress, price updates, and live captions.

It's not suitable for bidirectional communication (chats, multiplayer games) or when the client needs to send data frequently.

## Practical implementation

In Node.js, SSE is implemented with `res.writeHead(200, { 'Content-Type': 'text/event-stream' })` and `res.write()`. The format is simple:
```
id: 1
event: message
data: {"text": "Hello"}

```

Frameworks like Hono, Fastify, and Express provide SSE helpers.

## Performance and scalability

SSE consumes fewer resources than WebSocket because it doesn't require the upgrade handshake or maintain the WebSocket protocol. HTTP/2 multiplexes multiple SSE streams over a single TCP connection.

When you need efficient server-to-client communication, SSE is the best choice. At Vynta, we implement SSE for real-time dashboards and notifications.
