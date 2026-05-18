---
title: "SonarQube: análisis estático de calidad de código"
description: "Implementa SonarQube para análisis estático de código. Configuración, reglas, integración en CI y mejora continua de calidad."
date: "2026-02-20"
tags: ["SonarQube", "Calidad de código", "Análisis estático", "DevOps"]
---

## ¿Qué es SonarQube?

SonarQube es una plataforma de análisis estático de código que detecta bugs, vulnerabilidades, code smells y deuda técnica. Proporciona un dashboard con métricas de calidad y sugerencias de mejora.

## Instalación

```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube:latest
```

También ofrece SonarCloud, la versión SaaS sin necesidad de infraestructura.

## Configuración del proyecto

```bash
# En el proyecto
sonar-scanner \
  -Dsonar.projectKey=myproject \
  -Dsonar.sources=src \
  -Dsonar.host.url=http://localhost:9000
```

## Quality Gate

Un Quality Gate es un conjunto de condiciones que el código debe cumplir. Por ejemplo: cobertura > 80%, duplicación < 3%, sin vulnerabilidades críticas. El pipeline falla si no se cumple.

## Métricas clave

- **Bugs**: código que probablemente cause errores en producción.
- **Vulnerabilities**: puertas de entrada para ataques de seguridad.
- **Code Smells**: código mantenible pero con malas prácticas.
- **Debt Ratio**: porcentaje de esfuerzo estimado para arreglar issues.
- **Coverage**: cobertura de tests.
- **Duplications**: código duplicado.

## Integración en CI

```yaml
- name: SonarQube Scan
  uses: SonarSource/sonarcloud-github-action@master
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

## Beneficios

- Visibilidad de la calidad del código en toda la organización.
- Detección temprana de problemas.
- Métricas objetivas para decisiones técnicas.
- Historial de evolución de calidad.

¿Quieres análisis de calidad con SonarQube? En Vynta integramos SonarQube en tu pipeline.
