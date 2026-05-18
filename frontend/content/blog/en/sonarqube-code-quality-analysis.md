---
title: "SonarQube: static code quality analysis"
description: "Implement SonarQube for static code analysis. Configuration, rules, CI integration, and continuous quality improvement."
date: "2026-02-21"
tags: ["SonarQube", "Code Quality", "Static Analysis", "DevOps"]
---

## What is SonarQube?

SonarQube is a static code analysis platform that detects bugs, vulnerabilities, code smells, and technical debt. It provides a dashboard with quality metrics and improvement suggestions.

## Installation

```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube:latest
```

SonarCloud is the SaaS version without infrastructure needs.

## Quality Gate

A Quality Gate is a set of conditions code must meet. For example: coverage > 80%, duplication < 3%, no critical vulnerabilities. The pipeline fails if not met.

## Key metrics

- **Bugs**: code likely to cause production errors.
- **Vulnerabilities**: security attack entry points.
- **Code Smells**: maintainable but poorly written code.
- **Debt Ratio**: estimated effort to fix issues.
- **Coverage**: test coverage.
- **Duplications**: duplicated code.

## CI integration

```yaml
- name: SonarQube Scan
  uses: SonarSource/sonarcloud-github-action@master
```

## Benefits

- Organization-wide code quality visibility.
- Early problem detection.
- Objective metrics for technical decisions.
- Quality evolution history.

Want code quality analysis with SonarQube? At Vynta we integrate SonarQube in your pipeline.
