---
title: "Lighthouse CI: automate performance audits"
description: "Learn how to set up Lighthouse CI to automate web performance audits in your CI/CD pipelines."
date: "2026-05-02"
tags: ["Lighthouse CI", "Automation", "Performance", "CI/CD"]
---

## What is Lighthouse CI?

Lighthouse CI is a tool that runs Lighthouse audits in an automated environment, ideal for integration into CI/CD pipelines.

## Benefits

Detect performance regressions before they reach production, set performance budgets, and generate historical reports for tracking.

## Installation

```bash
npm install -g @lhci/cli
```

Configure a lighthouserc.js file with your budget settings and server configuration.

## Performance budgets

Define maximum limits for LCP, INP, CLS, TBT, and overall score. If a change exceeds the budget, the pipeline fails.

## Execution modes

Lighthouse CI supports three modes: autorun for single analysis, server for storing historical reports, and wizard for guided setup.

## GitHub Actions integration

```yaml
- name: Run Lighthouse CI
  run: npx lhci autorun
```

Store results as artifacts for later review.

## Conclusion

Lighthouse CI is the ultimate tool for keeping performance in check. At Vynta we integrate Lighthouse CI in all our projects for continuous quality assurance.
