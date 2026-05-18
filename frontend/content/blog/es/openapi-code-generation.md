---
title: "OpenAPI Code Generation: genera clientes desde tus esquemas"
description: "Genera clientes API, tipos TypeScript y documentación desde esquemas OpenAPI. Herramientas, configuración y mejores prácticas."
date: "2026-02-05"
tags: ["OpenAPI", "Code Generation", "API", "TypeScript"]
---

## ¿Qué es OpenAPI Code Generation?

OpenAPI permite describir tu API REST en un archivo YAML/JSON. Con generadores de código, puedes producir clientes API tipados, servidores stub, documentación y tests automáticamente desde ese esquema.

## Beneficios

- **Tipado fuerte**: el cliente generado tiene tipos TypeScript correctos.
- **Consistencia**: cliente y servidor siempre sincronizados.
- **Productividad**: escribir un cliente manualmente es tedioso y propenso a errores.
- **Documentación viva**: el esquema OpenAPI es la fuente de verdad.

## openapi-generator

La herramienta más completa, mantenida por OpenAPI Tools.

```bash
npx @openapitools/openapi-generator-cli generate \
  -i spec.yaml \
  -g typescript-axios \
  -o src/generated
```

## openapi-typescript

Generador enfocado en TypeScript. Produce tipos y funciones fetch tipadas.

```bash
npm install --save-dev openapi-typescript
npx openapi-typescript spec.yaml -o src/types/api.ts
```

## Integración en CI

```yaml
- name: Generate API client
  run: npx openapi-typescript spec.yaml -o src/types/api.ts
- name: Check for changes
  run: git diff --exit-code
```

Esto asegura que el cliente siempre esté actualizado con el esquema.

## Mejores prácticas

- Versiona tu esquema OpenAPI junto al código.
- Genera el cliente en CI, no manualmente.
- Usa el cliente generado en tests para verificar consistencia.

¿Quieres generar clientes API automáticamente? En Vynta integramos OpenAPI Code Generation.
