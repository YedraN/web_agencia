---
title: "Rate Limiting: protege tu API de abusos"
description: "Guía de Rate Limiting para proteger APIs: estrategias, algoritmos, implementación práctica y herramientas para prevenir abusos y ataques DDoS."
date: "2025-09-05"
tags: ["Rate Limiting", "Seguridad", "API", "Backend"]
---

El Rate Limiting es la primera línea de defensa contra abusos en APIs públicas. Limita el número de requests que un cliente puede realizar en un período de tiempo, protegiendo tu infraestructura de ataques de fuerza bruta, DDoS y scraping.

## Algoritmos de Rate Limiting

**Token Bucket**: los tokens se añaden a un bucket a tasa constante. Cada request consume un token. Si el bucket está vacío, el request se rechaza. Permite ráfagas controladas.

**Sliding Window**: mantiene un registro de timestamps de requests en una ventana deslizante. Más preciso que Fixed Window pero requiere más memoria. Se implementa eficientemente con sorted sets de Redis.

**Leaky Bucket**: los requests se procesan a tasa constante. Si el bucket se desborda, se rechazan. Ideal para proteger sistemas upstream con capacidad limitada.

## Implementación práctica

Express-rate-limit para Node.js, Flask-Limiter para Python, o implementaciones personalizadas con Redis. En API Gateways como Kong, NGINX o Cloudflare, el rate limiting se configura en la capa de proxy.

## Consideraciones de diseño

Usa cabeceras estándar: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`. Implementa backoff exponencial en el cliente. Diferencia límites por endpoint (login más restrictivo que GET público).

El rate limiting es esencial para cualquier API pública. En Vynta implementamos estrategias de rate limiting que protegen tu API sin afectar la experiencia de usuarios legítimos.
