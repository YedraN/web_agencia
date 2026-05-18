---
title: "Webhooks: integraciones externas en tiempo real"
description: "Guía de webhooks: cómo enviar y recibir eventos en tiempo real, seguridad, reintentos y mejores prácticas para integraciones externas."
date: "2025-07-30"
tags: ["Webhooks", "Integraciones", "Eventos", "API"]
---

Los webhooks permiten que tu aplicación envíe datos a otras aplicaciones en tiempo real cuando ocurren eventos. A diferencia del polling (el cliente pregunta constantemente), los webhooks envían la información cuando está disponible.

## Cómo funcionan los webhooks

Cuando ocurre un evento en tu sistema (pago recibido, usuario registrado, deploy completado), tu servidor envía una petición HTTP POST a una URL configurada por el receptor. El payload suele ser JSON con los datos del evento.

## Seguridad en webhooks

La seguridad es crítica: el receptor debe verificar que la petición viene de tu servidor y no de un atacante. Las prácticas estándar incluyen:
- **Verificación de firma HMAC**: firmas el payload con un secreto compartido.
- **Webhook secrets**: cada receptor tiene un secreto único.
- **IP whitelisting**: restringes las IPs origen.
- **Timestamp**: incluyes un timestamp para evitar replay attacks.

## Manejo de reintentos

Los webhooks pueden fallar (receptor caído, timeout, error 500). Implementa retry con backoff exponencial (ej: 1min, 5min, 30min, 2h, 6h). Después de N intentos fallidos, notifica al equipo y desactiva el webhook.

## Diseño de payloads

Incluye: `event_id` (único para idempotencia), `event_type` (nombre del evento), `timestamp`, `data` (payload del evento) y `version`. Usa un formato estándar como CloudEvents para interoperabilidad.

Los webhooks son la columna vertebral de las integraciones modernas. En Vynta implementamos sistemas de webhooks robustos con verificación de firma, reintentos y monitoreo.
