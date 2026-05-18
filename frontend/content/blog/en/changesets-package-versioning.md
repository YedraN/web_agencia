---
title: "Changesets: package versioning in monorepos"
description: "Manage package versions in monorepos with Changesets. Semantic publishing, changelogs, and collaborative workflow."
date: "2026-05-02"
tags: ["Changesets", "Monorepo", "Versioning", "Packages"]
---

## What are Changesets?

Changesets is a tool for managing versions and changelogs in monorepos. Each PR includes a file describing the changes. When publishing, Changesets groups changes, calculates new versions, and generates changelogs.

## Installation

```bash
npm install --save-dev @changesets/cli
npx changeset init
```

## Workflow

1. Developer runs `npx changeset` and selects affected packages.
2. Selects change type (major, minor, patch).
3. Writes a summary for the changelog.
4. A `.md` file is generated in `.changeset/` and committed with the PR.

## Publishing

```bash
npx changeset version
npx changeset publish
```

## Changesets vs Semantic Release

Changesets is designed for multi-package monorepos. Semantic Release assumes a single package. For monorepos with multiple independent packages, Changesets is the better choice.

## Benefits

- Each PR explicitly describes its changes.
- Changelogs are accurate per package.
- Version is decided in the PR, not after.
- Ideal for libraries and shared packages.

Using a monorepo with multiple packages? At Vynta we configure Changesets for your project.
