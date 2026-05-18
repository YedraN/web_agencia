---
title: "CSS Nesting: how to nest styles natively"
description: "Native CSS Nesting lets you nest CSS selectors without preprocessors. Learn the syntax, differences from Sass, and practical examples."
date: "2025-01-28"
tags: ["CSS", "Nesting", "Sass", "Preprocessors"]
---

## Introduction

Native CSS Nesting is here to stay. You no longer need Sass or Less to nest selectors. CSS now has its own built-in nesting syntax.

## Basic Syntax

Use `&` to reference the parent selector. For example: `.card { & .title { color: blue; } }`. The `&` is optional in many cases: `.card { .title { color: blue; } }` works the same.

## Differences from Sass

CSS Nesting is more restrictive than Sass. It doesn't allow nesting after selectors without `&`, and specificity behaves more predictably.

## Practical Examples

Nesting pseudo-classes like `:hover`, pseudo-elements like `::before`, and combinations with media queries within the same block.

## Browser Support

All modern browsers support CSS Nesting since 2024. Edge, Chrome, Firefox, and Safari include it without flags.

## Conclusion

CSS Nesting reduces preprocessor dependency and makes code cleaner. At **Vynta**, we write modern CSS leveraging new native capabilities.
