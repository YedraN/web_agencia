---
title: "Semantic Release: automated semantic versioning"
description: "Automate semantic versioning with Semantic Release. Configuration, CI/CD integration, and automatic changelog generation."
date: "2026-04-02"
tags: ["Semantic Release", "Semantic Versioning", "CI/CD", "Automation"]
---

## What is Semantic Release?

Semantic Release automates the entire publishing process: analyzes commits, determines the next semantic version, generates changelog, creates Git tags, and publishes the package. All based on Conventional Commits.

## Installation

```bash
npm install --save-dev semantic-release
```

## Basic configuration

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    "@semantic-release/github"
  ]
}
```

## How it determines version

- `fix` commits → patch version (1.0.0 → 1.0.1)
- `feat` commits → minor version (1.0.0 → 1.1.0)
- `BREAKING CHANGE` → major version (1.0.0 → 2.0.0)

## CI flow

```yaml
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Benefits

- Eliminates human decisions about versioning.
- Accurate automatic changelogs.
- Consistent, error-free publishing.

Want to automate your releases? At Vynta we configure Semantic Release for your project.
