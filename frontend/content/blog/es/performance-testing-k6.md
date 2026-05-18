---
title: "Performance Testing con k6: carga y estrés"
description: "Guía de performance testing con k6: pruebas de carga, estrés y resistencia. Configuración, métricas clave y análisis de resultados."
date: "2026-01-02"
tags: ["k6", "Performance Testing", "Load Testing", "DevOps"]
---

## ¿Qué es k6?

k6 es una herramienta de testing de rendimiento desarrollada por Grafana. Permite escribir pruebas de carga en JavaScript, ejecutarlas desde CLI o CI, y generar reportes detallados de métricas.

## Instalación y primer test

```bash
winget install k6
```

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const res = http.get('http://localhost:3000/api/health');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
```

## Tipos de pruebas

- **Smoke test**: verifica que el sistema funciona con carga mínima.
- **Load test**: simula tráfico normal esperado.
- **Stress test**: lleva el sistema al límite para encontrar el punto de quiebre.
- **Spike test**: aumentos repentinos de tráfico.
- **Soak test**: carga sostenida por horas para detectar memory leaks.

## Configuración de escenarios

```javascript
export const options = {
  stages: [
    { duration: '2m', target: 100 },  // ramp up
    { duration: '5m', target: 100 },  // steady
    { duration: '2m', target: 0 },    // ramp down
  ],
};
```

## Métricas clave

- `http_req_duration`: tiempo de respuesta.
- `http_req_failed`: porcentaje de errores.
- `vus`: usuarios virtuales concurrentes.
- `iterations`: número de iteraciones completadas.

## k6 en CI/CD

```bash
k6 run --out json=report.json test.js
```

k6 se integra con GitHub Actions, GitLab CI y cualquier pipeline que ejecute comandos.

¿Necesitas performance testing? En Vynta realizamos pruebas de carga para garantizar escalabilidad.
