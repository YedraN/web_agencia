---
title: "Chromatic: visual regression testing for components"
description: "Chromatic detects visual changes in your Storybook components. CI integration, team review, and UI version control."
date: "2026-01-26"
tags: ["Chromatic", "Visual Testing", "Storybook", "Frontend"]
---

## What is Chromatic?

Chromatic is a visual regression testing platform built on Storybook. It takes screenshots of every story on every commit and compares them with the previous version to detect unexpected visual changes.

## How it works

1. Upload your Storybook to Chromatic (`npx chromatic`).
2. Chromatic takes screenshots of every story at multiple resolutions.
3. Compares screenshots with the baseline.
4. Detects pixel-level differences.
5. Marks changes for team review.

## Installation

```bash
npm install --save-dev chromatic
npx chromatic --project-token=<token>
```

## CI integration

```yaml
- name: Publish to Chromatic
  uses: chromaui/action@v1
  with:
    projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

## Benefits

- Detects visual changes that functional tests miss.
- Collaborative visual review in PRs.
- Visual design change history.
- Direct Storybook integration.

Want visual regression testing? At Vynta we integrate Chromatic in your UI pipeline.
