---
title: "Docker Multi-Stage Builds: smaller and more secure images"
description: "Learn Docker Multi-Stage Builds to reduce image size, improve security, and accelerate deployments in production."
date: "2026-02-28"
tags: ["Docker", "Multi-Stage", "DevOps", "Security"]
---

Docker Multi-Stage Builds is a technique for building smaller, more secure, and faster-deploying container images using multiple stages in a single Dockerfile.

## The problem with large images

Traditional Docker images include build tools, dev dependencies, and temporary files unnecessary in production. A typical Node.js image can weigh 1.5GB, when all you need is compiled code and production dependencies.

## How Multi-Stage Builds work

A multi-stage Dockerfile defines multiple `FROM` instructions. The first stage (builder) installs dev dependencies and compiles code. The second stage (production) copies only necessary artifacts from the previous stage.

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

The result is a 5-10x smaller image without compilers or dev tools.

## Additional benefits

Smaller images reduce push/pull times to registries, decrease disk space usage, and improve security by removing tools that could be exploited. Vulnerability scans report fewer findings with fewer packages installed.

Multi-Stage Builds are a mandatory practice for teams valuing security and efficiency. At Vynta, we apply multi-stage builds in all our Docker projects to minimize attack surface and accelerate deployments.
