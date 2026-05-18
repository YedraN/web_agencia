---
title: "Structured logging with Pino for Node.js"
description: "Implement structured logging with Pino in Node.js. JSON, levels, transports, and best practices for production logs."
date: "2026-03-26"
tags: ["Pino", "Logging", "Node.js", "Observability"]
---

## Why structured logging?

Flat logs (`console.log`) are hard to analyze in production. Structured logging generates JSON that can be parsed, filtered, and analyzed by tools like Elasticsearch, Datadog, or Grafana.

## Pino

Pino is the fastest logger for Node.js. Designed for production, it generates JSON directly with minimal performance impact.

```typescript
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
});

logger.info({ userId: 123 }, 'User logged in');
// {"level":30,"time":...,"msg":"User logged in","userId":123}
```

## Log levels

- `fatal`: system cannot continue.
- `error`: requires immediate attention.
- `warn`: unexpected but not critical.
- `info`: general system information.
- `debug`: detailed debugging info.
- `trace`: very detailed traces.

## Context and bindings

```typescript
const childLogger = logger.child({ requestId: 'abc-123' });
childLogger.info('Processing payment');
```

## Best practices

- Never log sensitive data (passwords, tokens).
- Use child loggers for request context.
- Configure level per environment.
- No synchronous logging in production.

Want structured logging in your app? At Vynta we configure Pino for production.
