---
title: "Docker Multi-Stage Builds: imágenes más pequeñas y seguras"
description: "Aprende Docker Multi-Stage Builds para reducir el tamaño de imágenes, mejorar seguridad y acelerar despliegues en producción."
date: "2026-02-28"
tags: ["Docker", "Multi-Stage", "DevOps", "Seguridad"]
---

Docker Multi-Stage Builds es una técnica que permite construir imágenes de contenedor más pequeñas, seguras y rápidas de desplegar utilizando múltiples etapas en un solo Dockerfile.

## El problema de las imágenes grandes

Las imágenes Docker tradicionales incluyen herramientas de compilación, dependencias de desarrollo y archivos temporales que no son necesarios en producción. Una imagen Node.js típica puede pesar 1.5GB, cuando lo único necesario es el código compilado y las dependencias de producción.

## Cómo funcionan los Multi-Stage Builds

Un Dockerfile con multi-stage define múltiples instrucciones `FROM`. La primera etapa (builder) instala dependencias de desarrollo y compila el código. La segunda etapa (production) copia solo los artefactos necesarios desde la etapa anterior.

```
FROM node:22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/index.js"]
```

El resultado es una imagen 5-10x más pequeña sin compiladores ni herramientas de desarrollo.

## Beneficios adicionales

Las imágenes más pequeñas reducen el tiempo de push/pull al registro, disminuyen el espacio en disco y mejoran la seguridad al eliminar herramientas que podrían ser explotadas. Los escaneos de vulnerabilidades reportan menos hallazgos porque hay menos paquetes instalados.

Los Multi-Stage Builds son una práctica obligatoria para equipos que valoran la seguridad y la eficiencia. En Vynta aplicamos multi-stage builds en todos nuestros proyectos Docker para minimizar la superficie de ataque y acelerar los despliegues.
