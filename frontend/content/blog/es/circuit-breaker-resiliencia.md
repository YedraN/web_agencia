---
title: "Circuit Breaker: resiliencia en sistemas distribuidos"
description: "Guía del patrón Circuit Breaker: cómo prevenir fallos en cascada, implementar tolerancia a fallos y mejorar la resiliencia de microservicios."
date: "2025-03-08"
tags: ["Circuit Breaker", "Resiliencia", "Microservicios", "Patrones"]
---

El patrón Circuit Breaker es esencial para construir sistemas distribuidos resilientes. Su nombre viene de la analogía con los interruptores eléctricos: cuando detecta un problema, abre el circuito para evitar daños mayores.

## Estados del Circuit Breaker

El circuito tiene tres estados:
- **Closed**: funciona normalmente, las requests pasan al servicio.
- **Open**: las requests fallan inmediatamente sin llamar al servicio (fall-fast).
- **Half-Open**: después de un tiempo de espera, permite algunas requests para probar si el servicio se ha recuperado.

## Por qué es necesario

Sin Circuit Breaker, un fallo en un servicio puede provocar efectos cascada. Si el Servicio A llama al Servicio B y B está caído, A acumula conexiones esperando timeout, agotando sus recursos. El fallo se propaga a los servicios que llaman a A.

## Implementaciones populares

**Opossum** es la librería más popular para Node.js. **Resilience4j** para Java, **Hystrix** (legado) para JVM, **Istio** para service mesh. La mayoría de API Gateways (Kong, NGINX Plus, Envoy) incluyen Circuit Breaker integrado.

## Configuración típica

Parámetros clave: timeout por request, umbral de errores (ej: 50% de errores en 10 segundos), tiempo de espera antes de half-open (ej: 30 segundos), número de requests en half-open (ej: 5).

## Buenas prácticas

Combina Circuit Breaker con retry (con backoff exponencial) y timeout. Monitorea el estado de los circuitos con métricas en Prometheus/Datadog. Implementa fallbacks: si el circuito está abierto, devuelve una respuesta cacheada o un mensaje degradado.

La resiliencia no es opcional en sistemas distribuidos. En Vynta implementamos patrones de resiliencia que mantienen tu aplicación funcionando incluso cuando los servicios fallan.
