---
title: "Automated testing from unit to end-to-end: a complete guide"
description: "A practical guide to automated testing for web applications — covering unit tests, integration tests, end-to-end tests, and how to build a balanced test suite."
date: "2025-08-15"
tags: ["Web Development", "Testing", "QA"]
---

Automated testing is the difference between shipping with confidence and shipping with anxiety. A well-designed test suite catches bugs before they reach production, documents how code should behave, and makes refactoring safe.

This guide covers the testing pyramid, what each level tests, and how to build a practical test strategy.

## The test pyramid

The classic test pyramid has three layers:

- **Unit tests** (base, many): test individual functions and components in isolation
- **Integration tests** (middle, moderate): test how modules work together
- **End-to-end tests** (top, few): test complete user workflows through the real UI

The pyramid shape reflects both speed and cost — unit tests run in milliseconds, E2E tests take minutes.

## Unit tests

Unit tests verify a single unit of code — a function, a React hook, a utility — in complete isolation. Dependencies are mocked or stubbed.

**What to unit test:** Business logic, utility functions, data transformations, validation functions, API helpers.

**What not to unit test:** Framework internals, third-party library behavior, UI rendering details (the framework tests those).

**Tools:** Vitest, Jest, Playwright (for components), React Testing Library.

**Example:** Testing a `formatCurrency` utility that converts cents to a formatted dollar string. Pass in `1234`, expect `"$12.34"`.

## Integration tests

Integration tests verify that multiple units work together correctly. Unlike unit tests, they use real or near-real dependencies — testing that your database query function correctly interacts with the database, or that your API route handler processes requests correctly.

**What to test:** API endpoints, database operations, authentication flows, middleware chains.

**Tools:** Supertest (HTTP assertions), Playwright (component integration), MSW (API mocking).

## End-to-end tests

E2E tests run against a fully deployed application — real browser, real server, real database. They simulate actual user workflows: "user opens login page, types credentials, clicks submit, sees dashboard."

**What to test:** Critical user journeys — signup, checkout, content creation, settings changes.

**What not to E2E test:** Edge cases better caught by unit tests, UI polish issues, non-critical paths.

**Tools:** Playwright, Cypress.

**Pro tip:** Keep E2E tests focused on business-critical paths. Testing every possible interaction at the E2E level makes your suite slow and brittle.

## Building a balanced test suite

Aim for the 70/20/10 split — roughly 70% unit, 20% integration, 10% E2E. This balance gives you fast feedback on most changes while catching integration issues at higher levels.

**Write tests alongside code, not after.** Test-driven development (red-green-refactor) produces better-designed code and higher coverage.

**Run unit tests on every commit.** Run integration tests on pull requests. Run E2E tests before deployments. This tiered approach provides rapid feedback while preserving thoroughness.

## Common testing mistakes

- **Testing implementation details:** Tests that break on every refactor punish the team. Test behavior, not internals.
- **Mocking everything:** Excessive mocking creates tests that pass but don't validate real behavior.
- **Flaky E2E tests:** Tests that fail intermittently erode trust. Fix or remove flaky tests immediately.
- **No testing at all:** The most expensive mistake. Untested codebases accumulate bugs and resist change.

---

Automated testing is an investment that compounds over time. A good test suite makes your team faster, your releases safer, and your codebase more maintainable.

Need help setting up testing for your project? At Vynta we establish comprehensive test strategies — from unit to E2E — as part of every web application we build.
