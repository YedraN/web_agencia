---
title: "Load Testing con Artillery: simulación de tráfico"
description: "Aprende Artillery para load testing: simulación de tráfico HTTP y WebSocket, escenarios configurables y reportes detallados de rendimiento."
date: "2026-01-15"
tags: ["Artillery", "Load Testing", "Performance", "DevOps"]
---

## ¿Qué es Artillery?

Artillery es una herramienta de load testing moderna, escrita en Node.js. Soporta HTTP, WebSocket, Socket.io y GraphQL. Se configura con YAML y permite simular escenarios complejos de tráfico.

## Instalación

```bash
npm install -g artillery
```

## Configuración básica

```yaml
config:
  target: "http://localhost:3000"
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - flow:
      - get:
          url: "/api/products"
      - think: 2
      - get:
          url: "/api/users/1"
```

## Escenarios complejos

Puedes encadenar peticiones, extraer datos de respuestas y usarlos en peticiones siguientes:

```yaml
scenarios:
  - flow:
      - post:
          url: "/api/auth/login"
          json:
            email: "user@test.com"
            password: "secret123"
          capture:
            json: "$.token"
            as: "token"
      - get:
          url: "/api/profile"
          headers:
            Authorization: "Bearer {{ token }}"
```

## Reportes

```bash
artillery run test.yml --output report.json
artillery report report.json
```

## Artillery vs k6

Artillery es más fácil de configurar (YAML vs JavaScript) pero menos flexible que k6. Ideal para equipos que quieren load testing rápido sin escribir código complejo.

¿Quieres load testing en tu proyecto? En Vynta simulamos tráfico para validar tu infraestructura.
