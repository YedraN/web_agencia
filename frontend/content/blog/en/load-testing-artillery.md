---
title: "Load Testing with Artillery: traffic simulation"
description: "Learn Artillery for load testing: HTTP and WebSocket traffic simulation, configurable scenarios, and detailed performance reports."
date: "2026-01-16"
tags: ["Artillery", "Load Testing", "Performance", "DevOps"]
---

## What is Artillery?

Artillery is a modern load testing tool written in Node.js. It supports HTTP, WebSocket, Socket.io, and GraphQL. Configured with YAML, it simulates complex traffic scenarios.

## Installation

```bash
npm install -g artillery
```

## Basic configuration

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

## Complex scenarios

Chain requests, extract data from responses, and use them in subsequent requests.

## Reports

```bash
artillery run test.yml --output report.json
artillery report report.json
```

## Artillery vs k6

Artillery is easier to set up (YAML vs JavaScript) but less flexible than k6. Ideal for teams wanting quick load testing without complex code.

Want load testing for your project? At Vynta we simulate traffic to validate your infrastructure.
