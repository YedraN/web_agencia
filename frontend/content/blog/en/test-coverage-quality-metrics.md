---
title: "Test Coverage: code quality metrics"
description: "Learn about test coverage: what it measures, how to interpret it, reporting tools, and why 100% coverage doesn't mean bug-free code."
date: "2025-10-16"
tags: ["Test Coverage", "Testing", "Code Quality", "Metrics"]
---

## What is test coverage?

Test coverage measures what percentage of source code is executed during tests. It's divided into four metrics: line coverage, branch coverage, function coverage, and statement coverage.

## Types of coverage

- **Lines**: percentage of lines executed.
- **Branches**: percentage of conditional branches (if/else, switch) covered.
- **Functions**: percentage of functions invoked.
- **Statements**: percentage of statements executed.

```bash
-----------------------------|---------|---------|-------------------
File                         | % Stmts | % Branch| % Funcs | % Lines
-----------------------------|---------|---------|-------------------
 src/services/user.service.ts |   85.71 |   66.66 |   80.00 |   87.50
 src/controllers/auth.ts      |   92.30 |  100.00 |  100.00 |   92.30
-----------------------------|---------|---------|-------------------
```

## Popular tools

- **Istanbul/nyc**: the Node.js standard.
- **Vitest v8**: native coverage with v8 provider.
- **c8**: modern alternative to nyc.

## The 100% trap

100% coverage doesn't mean perfect code. You can have all paths covered but not test edge values, race conditions, or real integrations. Coverage is a guide, not a target.

## Best practices

Set a minimum threshold (70-80%) and make the pipeline fail if it's not met. Focus on covering the most critical branches: business logic, validations, and error handling.

Want to improve your coverage strategy? At Vynta we set up pipelines with quality metrics.
