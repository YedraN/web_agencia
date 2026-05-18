---
title: "Svelte 5: Runes and the new reactivity system"
description: "Svelte 5 introduces Runes: a new explicit and more powerful reactivity system. How to migrate and what advantages this change brings."
date: "2026-03-24"
tags: ["Svelte", "JavaScript", "Reactivity", "Frontend"]
---

## Introduction

Svelte 5 marks a fundamental shift with the introduction of Runes, an explicit reactivity system that replaces the old `$:` and offers more control over reactive state.

## What are Runes?

Runes are special functions that the Svelte compiler recognizes and transforms. `$state`, `$derived`, and `$effect` are the most important ones.

## $state

Replaces reactive `let` declarations. You now declare `let count = $state(0)` and the value is explicitly reactive. This makes the data flow clearer.

## $derived

Replaces `$: doubled = count * 2`. Derived values are automatically computed when their dependencies change, but are now more predictable.

## $effect

Replaces `$:` for side effects. Useful for syncing with external APIs, updating the DOM, or sending analytics.

## Migration from Svelte 4

The team has provided a migration guide and an automatic codemod. Most projects migrate without manual changes.

## Conclusion

Svelte 5 with Runes offers more explicit and predictable reactivity. At **Vynta**, we adopt Svelte for projects that require ultra-light bundles.
