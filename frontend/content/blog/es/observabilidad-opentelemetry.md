---
title: "OpenTelemetry: observabilidad para tus aplicaciones"
description: "Implementa OpenTelemetry para trazabilidad, métricas y logs. Configuración con Node.js y exportación a plataformas de observabilidad."
date: "2026-04-05"
tags: ["OpenTelemetry", "Observabilidad", "Tracing", "Node.js"]
---

## ¿Qué es OpenTelemetry?

OpenTelemetry (OTel) es un estándar abierto para observabilidad. Proporciona APIs y SDKs para generar, recolectar y exportar traces, métricas y logs desde tus aplicaciones.

## Conceptos clave

- **Trace**: registro de la ruta de una solicitud a través del sistema.
- **Span**: unidad de trabajo dentro de un trace.
- **Métrica**: medición numérica (tiempo de respuesta, uso de CPU).
- **Exporter**: envía los datos a un backend (Jaeger, Zipkin, Datadog).

## Configuración básica en Node.js

```typescript
import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';

const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(),
});

sdk.start();
```

## Instrumentación automática

```bash
npm install @opentelemetry/instrumentation-http
npm install @opentelemetry/instrumentation-express
```

La instrumentación automática captura spans para HTTP requests, Express routes, llamadas a bases de datos, etc. sin modificar tu código.

## Exportación a Jaeger

```typescript
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';

const traceExporter = new JaegerExporter({
  endpoint: 'http://localhost:14268/api/traces',
});
```

## Beneficios

- Estandarización: mismo formato para traces, métricas y logs.
- Vendor-neutral: cambia de backend sin cambiar el código.
- Visibilidad extremo a extremo en sistemas distribuidos.
- Debugging de problemas de rendimiento.

¿Quieres observabilidad con OpenTelemetry? En Vynta instrumentamos tus aplicaciones.
