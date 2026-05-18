---
title: "OpenTelemetry: observability for your applications"
description: "Implement OpenTelemetry for tracing, metrics, and logs. Node.js setup and export to observability platforms."
date: "2026-04-06"
tags: ["OpenTelemetry", "Observability", "Tracing", "Node.js"]
---

## What is OpenTelemetry?

OpenTelemetry (OTel) is an open standard for observability. It provides APIs and SDKs to generate, collect, and export traces, metrics, and logs from your applications.

## Key concepts

- **Trace**: records the path of a request through the system.
- **Span**: unit of work within a trace.
- **Metric**: numerical measurement (response time, CPU usage).
- **Exporter**: sends data to a backend (Jaeger, Zipkin, Datadog).

## Basic Node.js setup

```typescript
import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';

const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(),
});

sdk.start();
```

## Auto-instrumentation

```bash
npm install @opentelemetry/instrumentation-http
npm install @opentelemetry/instrumentation-express
```

Auto-instrumentation captures spans for HTTP requests, Express routes, database calls, etc. without modifying your code.

## Benefits

- Standardization: same format for traces, metrics, and logs.
- Vendor-neutral: switch backends without code changes.
- End-to-end visibility in distributed systems.
- Performance issue debugging.

Want observability with OpenTelemetry? At Vynta we instrument your applications.
