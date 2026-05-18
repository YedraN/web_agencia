---
title: "Sentry: monitoreo de errores en producción"
description: "Implementa Sentry para monitoreo de errores en producción. Configuración, source maps, breadcrumbs y alertas para frontend y backend."
date: "2026-04-10"
tags: ["Sentry", "Monitoreo", "Errores", "Frontend"]
---

## ¿Qué es Sentry?

Sentry es una plataforma de monitoreo de errores que captura excepciones en tiempo real. Agrupa errores similares, proporciona contexto (SO, navegador, versión) y muestra el stack trace completo.

## Configuración en Node.js

```bash
npm install @sentry/node
```

```typescript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

## Configuración en React

```typescript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [Sentry.browserTracingIntegration()],
});
```

## Breadcrumbs

Sentry registra eventos previos al error: peticiones HTTP, clics, navegación. Esto ayuda a entender qué llevó al error.

## Source Maps

Sube source maps para ver el código fuente original en lugar de JS minificado:

```bash
sentry-cli releases deploys <version> --org <org> --project <project>
```

## Alertas y Slack

Configura reglas de alerta: email, Slack, PagerDuty. Por ejemplo: alertar si más de 100 usuarios experimentan el mismo error en 5 minutos.

## Beneficios

- Detección de errores antes que los usuarios reporten.
- Contexto completo: OS, navegador, versión, traza.
- Agrupación inteligente de errores.
- Rendimiento con Tracing.

¿Quieres monitoreo de errores con Sentry? En Vynta configuramos Sentry para tu app.
