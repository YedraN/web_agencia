---
title: "Dependabot: seguridad automatizada en dependencias"
description: "Configura Dependabot para seguridad automatizada de dependencias en GitHub. Alertas, PRs automáticos y buenas prácticas."
date: "2026-03-20"
tags: ["Dependabot", "Seguridad", "Dependencias", "GitHub"]
---

## ¿Qué es Dependabot?

Dependabot es la herramienta nativa de GitHub para actualizar dependencias. Crea PRs automáticos cuando hay versiones disponibles y alerta sobre vulnerabilidades de seguridad.

## Configuración

Crea `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

## Ecosystems soportados

npm, pip, Docker, Gradle, Maven, NuGet, Cargo, Go modules, Bundler, Terraform, GitHub Actions y más.

## Dependabot alerts

Cuando GitHub detecta una vulnerabilidad en una dependencia, Dependabot genera una alerta con severidad, descripción y enlace al advisory. Incluye un botón para crear un PR con la actualización.

## Dependabot security updates

Los security updates son PRs automáticos que actualizan dependencias con vulnerabilidades conocidas. Se activan automáticamente para repositorios públicos y pueden habilitarse en privados.

## Ventajas sobre Renovate

- Integración nativa con GitHub, zero configuración.
- Alertas de seguridad automáticas.
- Ideal para equipos pequeños que quieren seguridad sin configuración compleja.

## Limitaciones

Menos configurable que Renovate. No soporta horarios personalizados ni reglas complejas de agrupación.

¿Quieres seguridad automatizada? En Vynta configuramos Dependabot para tu repositorio.
