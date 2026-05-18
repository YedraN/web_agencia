---
title: "Health Checks: service health endpoints"
description: "Implement health checks in your services. Readiness, liveness endpoints, Kubernetes integration, and monitoring best practices."
date: "2026-04-21"
tags: ["Health Checks", "Kubernetes", "Monitoring", "DevOps"]
---

## What are health checks?

Health checks are HTTP endpoints that indicate a service's status. They let orchestrators (Kubernetes, Docker Swarm) and load balancers know if the service is ready to receive traffic.

## Types of health checks

- **Liveness**: is the service alive? If it fails, the container is restarted.
- **Readiness**: is the service ready for traffic? If it fails, it's removed from the load balancer.
- **Startup**: has the service finished starting? Useful for slow-starting services.

## Basic Express implementation

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

## Kubernetes integration

```yaml
livenessProbe:
  httpGet:
    path: /health/live
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 10
```

## Best practices

- Don't include heavy logic in liveness (can cause cascading failures).
- Readiness should check critical dependencies (DB, cache).
- Short timeout (1-2 seconds).
- Log results for debugging.

Want health checks in your services? At Vynta we implement monitoring for your deployments.
