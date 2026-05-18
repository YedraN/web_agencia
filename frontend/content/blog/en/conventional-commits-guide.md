---
title: "Conventional Commits: standardize your commit messages"
description: "Complete guide to Conventional Commits for standardizing commit messages, automating semantic versioning, and generating automatic changelogs."
date: "2025-02-02"
tags: ["Git", "Conventional Commits", "Semantic Versioning", "Automation"]
---

## What are Conventional Commits?

Conventional Commits is a convention for writing structured commit messages. Each commit follows a format that enables tools like Semantic Release, generates changelogs, and determines the next semantic version of your project.

## Basic format

`type(scope): short description`

Main types: `feat` (new feature), `fix` (bug fix), `chore` (maintenance), `docs` (documentation), `refactor` (refactoring), `test` (testing), and `style` (formatting).

## Practical examples

```
feat(auth): add login with Google OAuth
fix(api): handle timeout errors on payment endpoint
docs(readme): update installation instructions
```

## Key benefits

- **Automatic semantic versioning**: detects if the change is major, minor, or patch.
- **Auto-generated changelogs**: each commit type feeds a changelog section.
- **Readability**: Git history becomes understandable at a glance.

## Implementation with commitlint

Use commitlint and husky to validate messages before each commit. This ensures the whole team follows the standard without exceptions.

Want to implement Conventional Commits in your project? At Vynta we help you set up the complete automation pipeline.
