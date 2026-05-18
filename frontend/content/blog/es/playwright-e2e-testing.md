---
title: "Playwright: testing E2E moderno para aplicaciones web"
description: "Aprende Playwright para testing E2E: instalación, navegación múltiple, assertions, y generación de código para tests robustos en Chrome, Firefox y Safari."
date: "2025-09-01"
tags: ["Playwright", "E2E", "Testing", "Automatización"]
---

## ¿Qué es Playwright?

Playwright es un framework de testing E2E desarrollado por Microsoft. Permite automatizar navegadores Chromium, Firefox y WebKit con una sola API. Soporta múltiples lenguajes: TypeScript, Python, Java y .NET.

## Instalación y configuración

```bash
npm init playwright@latest
npx playwright install
```

Esto crea la estructura base con tests de ejemplo, configuración en `playwright.config.ts` y los navegadores instalados.

## Características clave

- **Multi-navegador**: un solo test corre en Chrome, Firefox y Safari.
- **Auto-wait**: Playwright espera automáticamente a que los elementos estén listos.
- **Network interception**: simula respuestas de API y condiciones de red.
- **Mobile emulation**: prueba versiones móviles con dispositivos simulados.

## Test básico

```typescript
test('login flow', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'user@test.com');
  await page.fill('[name="password"]', 'secret123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

## Codegen

Playwright incluye un generador de código que registra tus interacciones y genera el test automáticamente.

```bash
npx playwright codegen
```

## Ventajas sobre Cypress

- Soporte real de múltiples navegadores (Cypress solo Chromium).
- Ejecución en paralelo nativa.
- Network mocking más potente.
- Sin limitaciones de iframe.

¿Quieres implementar E2E con Playwright? En Vynta automatizamos tests E2E para tu aplicación web.
