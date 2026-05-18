---
title: "E2E Testing in CI: headless execution and reporting"
description: "Configure E2E testing in CI with Playwright: headless execution, parallelism, reporting, and strategies to reduce false positives."
date: "2025-12-02"
tags: ["E2E", "CI/CD", "Playwright", "Testing"]
---

## The E2E in CI challenge

E2E tests are the slowest and most fragile in the suite. Running them in CI requires careful configuration: headless browsers, timeout handling, evidence capture, and reporting.

## Headless setup in Playwright

```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
```

## Parallelism

Playwright runs tests in parallel by default using workers. Configure the number based on your CI cores.

```typescript
export default defineConfig({
  workers: process.env.CI ? 4 : undefined,
});
```

## Sharding

Distribute tests across multiple CI machines to reduce total time:

```bash
npx playwright test --shard=1/4
npx playwright test --shard=2/4
```

## Evidence capture

Configure screenshots and video only on failure. This saves space but provides evidence when a test fails.

## Reporting

Playwright generates HTML and JSON reports. In CI, use JSON reports to integrate with your dashboard.

## Anti-flake strategies

- Use Playwright's `auto-wait` instead of manual timeouts.
- Isolate tests: each test creates its own data.
- Retry: `retries: 2` for known flaky tests.

Want reliable E2E in CI? At Vynta we configure robust testing pipelines.
