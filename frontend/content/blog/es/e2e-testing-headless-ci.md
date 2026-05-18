---
title: "E2E Testing en CI: ejecución headless y reporting"
description: "Configura E2E testing en CI con Playwright: ejecución headless, paralelismo, reporting y estrategias para reducir falsos positivos."
date: "2025-12-01"
tags: ["E2E", "CI/CD", "Playwright", "Testing"]
---

## El desafío del E2E en CI

Los tests E2E son los más lentos y frágiles de la suite. Ejecutarlos en CI requiere configuración cuidadosa: navegadores headless, manejo de timeouts, captura de evidencias y reporting.

## Configuración headless en Playwright

```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
```

## Paralelismo

Playwright ejecuta tests en paralelo por defecto usando workers. Configura el número según los cores de tu CI.

```typescript
export default defineConfig({
  workers: process.env.CI ? 4 : undefined,
});
```

## Sharding

Distribuye los tests entre múltiples máquinas en CI para reducir el tiempo total:

```bash
npx playwright test --shard=1/4
npx playwright test --shard=2/4
```

## Captura de evidencias

Configura screenshots y video solo en fallo. Así ahorras espacio pero tienes evidencia cuando un test falla.

## Reporting

Playwright genera reportes HTML y JSON. En CI, usa el reporte JSON para integrar con tu dashboard.

```bash
npx playwright test --reporter=html,json
```

## Estrategias anti-flake

- Usa `auto-wait` de Playwright en lugar de timeouts manuales.
- Aísla tests: cada test crea sus propios datos.
- Retry: `retries: 2` para tests inestables conocidos.

¿Quieres E2E confiable en CI? En Vynta configuramos pipelines de testing robustos.
