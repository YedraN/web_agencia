---
title: "Sentry: error monitoring in production"
description: "Implement Sentry for production error monitoring. Configuration, source maps, breadcrumbs, and alerts for frontend and backend."
date: "2026-04-11"
tags: ["Sentry", "Monitoring", "Errors", "Frontend"]
---

## What is Sentry?

Sentry is an error monitoring platform that captures exceptions in real-time. It groups similar errors, provides context (OS, browser, version), and shows the full stack trace.

## Node.js setup

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

## React setup

```typescript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [Sentry.browserTracingIntegration()],
});
```

## Breadcrumbs

Sentry records events leading to the error: HTTP requests, clicks, navigation. This helps understand what caused the error.

## Source Maps

Upload source maps to see original source code instead of minified JS.

## Benefits

- Error detection before users report.
- Full context: OS, browser, version, trace.
- Intelligent error grouping.
- Performance with Tracing.

Want error monitoring with Sentry? At Vynta we configure Sentry for your app.
