---
title: "Performance Testing with k6: load and stress"
description: "Guide to performance testing with k6: load, stress, and endurance tests. Configuration, key metrics, and results analysis."
date: "2026-01-03"
tags: ["k6", "Performance Testing", "Load Testing", "DevOps"]
---

## What is k6?

k6 is a performance testing tool developed by Grafana. It lets you write load tests in JavaScript, run them from CLI or CI, and generate detailed metrics reports.

## Installation and first test

```bash
brew install k6
```

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const res = http.get('http://localhost:3000/api/health');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
```

## Test types

- **Smoke test**: verifies system works with minimal load.
- **Load test**: simulates expected normal traffic.
- **Stress test**: pushes the system to find the breaking point.
- **Spike test**: sudden traffic increases.
- **Soak test**: sustained load for hours to detect memory leaks.

## Scenario configuration

```javascript
export const options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 0 },
  ],
};
```

## Key metrics

- `http_req_duration`: response time.
- `http_req_failed`: error percentage.
- `vus`: concurrent virtual users.
- `iterations`: completed iterations count.

Need performance testing? At Vynta we run load tests to ensure scalability.
