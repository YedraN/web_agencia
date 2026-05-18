---
title: "Circuit Breaker: resilience in distributed systems"
description: "Guide to the Circuit Breaker pattern: preventing cascading failures, implementing fault tolerance, and improving microservice resilience."
date: "2025-03-08"
tags: ["Circuit Breaker", "Resilience", "Microservices", "Patterns"]
---

The Circuit Breaker pattern is essential for building resilient distributed systems. Its name comes from electrical circuit breakers: when it detects a problem, it opens the circuit to prevent further damage.

## Circuit Breaker states

The circuit has three states:
- **Closed**: normal operation, requests pass to the service.
- **Open**: requests fail immediately without calling the service (fail-fast).
- **Half-Open**: after a wait period, allows some requests to test if the service has recovered.

## Why it's necessary

Without a Circuit Breaker, one service failure can cause cascading effects. If Service A calls Service B and B is down, A accumulates connections waiting for timeout, exhausting its resources. The failure propagates to services calling A.

## Popular implementations

**Opossum** is the most popular library for Node.js. **Resilience4j** for Java, **Hystrix** (legacy) for JVM, **Istio** for service mesh. Most API Gateways (Kong, NGINX Plus, Envoy) include built-in Circuit Breakers.

## Typical configuration

Key parameters: per-request timeout, error threshold (e.g., 50% errors in 10 seconds), wait time before half-open (e.g., 30 seconds), number of requests in half-open (e.g., 5).

## Best practices

Combine Circuit Breaker with retry (exponential backoff) and timeout. Monitor circuit status with Prometheus/Datadog metrics. Implement fallbacks: if the circuit is open, return cached responses or degraded messages.

Resilience is not optional in distributed systems. At Vynta, we implement resilience patterns that keep your application running even when services fail.
