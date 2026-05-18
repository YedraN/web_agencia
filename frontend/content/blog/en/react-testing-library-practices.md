---
title: "React Testing Library: best practices for testing components"
description: "Learn React Testing Library best practices for effectively testing React components, focusing on user behavior rather than implementation details."
date: "2025-08-16"
tags: ["React", "Testing", "React Testing Library", "Frontend"]
---

## RTL philosophy

React Testing Library (RTL) focuses on testing user behavior, not implementation details. If your test breaks when you rename a prop, you're testing implementation. RTL encourages tests that withstand refactors.

## Accessible queries

Prefer queries that resemble how users find elements: `getByRole`, `getByLabelText`, `getByPlaceholderText`, `getByText`. Avoid `testId` unless strictly necessary.

```typescript
render(<LoginForm />);
const submitButton = screen.getByRole('button', { name: /sign in/i });
const emailInput = screen.getByLabelText(/email/i);
```

## userEvent vs fireEvent

`fireEvent` dispatches events directly. `userEvent` simulates real interactions (clicks, typing, navigation). Always prefer `userEvent`.

```typescript
import userEvent from '@testing-library/user-event';

await userEvent.type(emailInput, 'test@test.com');
await userEvent.click(submitButton);
```

## Waiting for async changes

Use `waitFor` or `findBy*` for elements that appear after async operations.

## What NOT to test

- Inline styles and CSS classes (implementation details).
- Component internal state (test the UI outcome).
- Private methods (internal detail).

Want to improve your React component testing? At Vynta we write robust tests with RTL.
