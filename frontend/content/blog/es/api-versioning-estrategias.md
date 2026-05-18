---
title: "API Versioning: estrategias para evolucionar tus APIs"
description: "Estrategias de API Versioning: URL, headers, query params y content negotiation. Cómo evolucionar APIs sin romper clientes existentes."
date: "2025-11-25"
tags: ["API", "Versioning", "Backend", "Arquitectura"]
---

Versionar APIs es inevitable cuando tu producto evoluciona. Una estrategia de versioning bien diseñada permite añadir funcionalidades sin romper la experiencia de los consumidores existentes.

## Estrategias de versioning

**URL Path Versioning** (`/api/v1/users`, `/api/v2/users`): la más común y explícita. Fácil de implementar y depurar, pero ensucia las URLs y dificulta el mantenimiento de múltiples versiones.

**Header Versioning** (`Accept: application/vnd.api.v1+json`): más limpia que URL, pero menos visible para desarrolladores que prueban con curl o Postman. Requiere que los clientes configuren cabeceras correctamente.

**Query Parameter Versioning** (`/api/users?version=1`): simple pero fácil de olvidar en el cliente. No recomendada para APIs públicas.

## Buenas prácticas

Mantén versiones antiguas el tiempo suficiente para que los clientes migren (6-12 meses). Documenta claramente los cambios de cada versión y los endpoints deprecados. Implementa cabeceras `Deprecation` y `Sunset` según RFC 8594.

La **evolución compatible hacia adelante** es el ideal: añadir campos opcionales a las respuestas nunca rompe clientes existentes. Eliminar campos o cambiar tipos requiere nueva versión.

## Alternativa: sin versioning

Algunas APIs exitosas (Stripe, GitHub) minimizan el versioning usando diseño extensible: campos opcionales, tolerancia a campos desconocidos y cambios retrocompatibles.

El versioning es una decisión estratégica de diseño de API. En Vynta diseñamos APIs con estrategias de versioning claras que permiten evolucionar tu producto sin dolor.
