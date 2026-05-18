---
title: "Health Checks: endpoints de salud para tus servicios"
description: "Implementa health checks en tus servicios. Endpoints de readiness, liveness, integración con Kubernetes y buenas prácticas para monitoreo."
date: "2026-04-20"
tags: ["Health Checks", "Kubernetes", "Monitoreo", "DevOps"]
---

## ¿Qué son los health checks?

Los health checks son endpoints HTTP que indican el estado de un servicio. Permiten a orquestadores (Kubernetes, Docker Swarm) y balanceadores saber si el servicio está listo para recibir tráfico.

## Tipos de health checks

- **Liveness**: ¿el servicio está vivo? Si falla, se reinicia el contenedor.
- **Readiness**: ¿el servicio está listo para recibir tráfico? Si falla, se retira del balanceador.
- **Startup**: ¿el servicio ha terminado de iniciarse? Útil para servicios con inicio lento.

## Implementación básica en Express

```typescript
app.get('/health/live', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/health/ready', async (req, res) => {
  const dbHealthy = await checkDatabase();
  const cacheHealthy = await checkCache();
  const allHealthy = dbHealthy && cacheHealthy;
  res.status(allHealthy ? 200 : 503).json({
    status: allHealthy ? 'ok' : 'degraded',
    checks: { database: dbHealthy, cache: cacheHealthy },
  });
});
```

## Integración con Kubernetes

```yaml
livenessProbe:
  httpGet:
    path: /health/live
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /health/ready
    port: 3000
  initialDelaySeconds: 10
  periodSeconds: 5
```

## Buenas prácticas

- No incluyas lógica pesada en liveness (puede causar cascading failures).
- Readiness debe verificar dependencias críticas (DB, caché).
- Timeout corto (1-2 segundos) para no bloquear el health check.
- Logea los resultados para debugging.

¿Quieres health checks en tus servicios? En Vynta implementamos monitoreo para tus deployments.
