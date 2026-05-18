---
title: "Logging estructurado con Pino para Node.js"
description: "Implementa logging estructurado con Pino en Node.js. JSON, niveles, transportes y mejores prácticas para logs en producción."
date: "2026-03-25"
tags: ["Pino", "Logging", "Node.js", "Observabilidad"]
---

## ¿Por qué logging estructurado?

Los logs planos (`console.log`) son difíciles de analizar en producción. El logging estructurado genera JSON que puede ser parseado, filtrado y analizado por herramientas como Elasticsearch, Datadog o Grafana.

## Pino

Pino es el logger más rápido para Node.js. Diseñado para producción, genera JSON directamente y tiene un impacto mínimo en el rendimiento.

```typescript
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: { colorize: true },
  },
});

logger.info({ userId: 123 }, 'User logged in');
// {"level":30,"time":...,"msg":"User logged in","userId":123}
```

## Niveles de logging

- `fatal`: el sistema no puede continuar.
- `error`: error que requiere atención inmediata.
- `warn`: situación inesperada pero no crítica.
- `info`: información general del sistema.
- `debug`: información detallada para debugging.
- `trace`: trazas muy detalladas.

## Contexto y bindings

```typescript
const childLogger = logger.child({ requestId: 'abc-123' });
childLogger.info('Processing payment');
// Incluye requestId en cada mensaje
```

## Transportes

Pino soporta múltiples transportes: `pino/file` (archivos), `pino-pretty` (desarrollo), `pino-loki` (Grafana Loki), y `pino-elasticsearch`.

## Buenas prácticas

- Nunca loguees datos sensibles (passwords, tokens).
- Usa child loggers para contexto de request.
- Configura el nivel según el entorno.
- No hagas logging síncrono en producción.

¿Quieres logging estructurado en tu app? En Vynta configuramos Pino para producción.
