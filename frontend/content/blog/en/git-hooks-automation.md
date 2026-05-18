---
title: "Git Hooks: automate your development workflow"
description: "Learn how to use Git Hooks to automate tasks like linting, testing, and validations before every commit and push in your development workflow."
date: "2025-02-16"
tags: ["Git", "Git Hooks", "Automation", "Code Quality"]
---

## What are Git Hooks?

Git Hooks are scripts that execute automatically in response to Git events: `pre-commit`, `pre-push`, `commit-msg`, `post-merge`, among others. They let you enforce code quality policies before changes enter the repository.

## pre-commit hook

The most popular hook. It runs before a commit is created. Use it to run linters, formatters, and quick tests. If it fails, the commit is canceled.

```
#!/bin/sh
npm run lint
npm run format:check
```

## commit-msg hook

This hook receives the commit message as an argument. Ideal for validating that the message follows the Conventional Commits standard using commitlint.

## pre-push hook

Runs before pushing. Here you can run the full test suite, integration tests, and security analysis. Since it's slower, it doesn't interrupt the fast commit workflow.

## post-merge hook

Useful for running `npm install` after a merge if there were changes in `package-lock.json`.

## Management with Husky

Managing hooks manually (.git/hooks/) doesn't scale. Husky lets you define them in `package.json` and share them with the team.

Want to automate your workflow with Git Hooks? At Vynta we set up quality pipelines that protect your code.
