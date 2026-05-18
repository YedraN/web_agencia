---
title: "Renovate: automatic dependency updates"
description: "Automate dependency updates with Renovate. Configuration, PR customization, and strategies for keeping dependencies up to date."
date: "2026-03-11"
tags: ["Renovate", "Dependencies", "Automation", "Maintenance"]
---

## What is Renovate?

Renovate is a bot that automates dependency updates. It creates PRs when new versions are detected, updates lockfiles, and runs tests to verify compatibility.

## Basic setup

Create `renovate.json` in the project root:

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["config:recommended"],
  "labels": ["dependencies"],
  "automerge": true
}
```

## Update strategies

- **Pin**: pin exact versions (1.2.3 instead of ^1.2.3).
- **Range**: update within semver range.
- **Lock file maintenance**: update lockfile periodically.

## Renovate vs Dependabot

Renovate is more configurable and supports monorepos, multi-package managers, and complex rules. Dependabot is simpler but less flexible.

## Benefits

- Dependencies always up to date with no manual effort.
- Automatic PRs with validation tests.
- Granular configuration per dependency type.
- Reduced known vulnerabilities.

Want to automate your dependencies? At Vynta we configure Renovate for your project.
