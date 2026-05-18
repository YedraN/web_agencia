---
title: "Webhooks: real-time external integrations"
description: "Guide to webhooks: how to send and receive real-time events, security, retries, and best practices for external integrations."
date: "2025-07-30"
tags: ["Webhooks", "Integrations", "Events", "API"]
---

Webhooks allow your application to send data to other applications in real-time when events occur. Unlike polling (client asking repeatedly), webhooks send information when it's available.

## How webhooks work

When an event occurs in your system (payment received, user registered, deployment completed), your server sends an HTTP POST request to a URL configured by the receiver. The payload is typically JSON with event data.

## Webhook security

Security is critical: the receiver must verify the request comes from your server, not an attacker. Standard practices include:
- **HMAC signature verification**: sign the payload with a shared secret.
- **Webhook secrets**: each receiver has a unique secret.
- **IP whitelisting**: restrict source IPs.
- **Timestamps**: include a timestamp for replay attack prevention.

## Retry handling

Webhooks can fail (receiver down, timeout, 500 error). Implement retry with exponential backoff (e.g., 1min, 5min, 30min, 2h, 6h). After N failed attempts, notify the team and disable the webhook.

## Payload design

Include: `event_id` (unique for idempotency), `event_type` (event name), `timestamp`, `data` (event payload), and `version`. Use a standard format like CloudEvents for interoperability.

Webhooks are the backbone of modern integrations. At Vynta, we implement robust webhook systems with signature verification, retries, and monitoring.
