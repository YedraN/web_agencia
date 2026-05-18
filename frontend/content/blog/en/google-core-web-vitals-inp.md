---
title: "INP: the Core Web Vital that replaced FID"
description: "Everything about Interaction to Next Paint (INP): the metric that replaced FID in Core Web Vitals. How to measure and optimize it."
date: "2026-04-18"
tags: ["Core Web Vitals", "INP", "Web Performance", "Technical SEO"]
---

## What is INP?

Interaction to Next Paint (INP) measures the time from when a user interacts with a page until the browser responds. INP officially replaced First Input Delay (FID) in 2024.

## Why the change?

FID only measured the first interaction. INP evaluates all interactions throughout the visit, providing a more complete view of responsiveness.

## How it's measured

INP is calculated as the 90th percentile of the worst interactions. An interaction can be a click, tap, or key press.

## Target values

INP below 200ms is good. Between 200ms and 500ms needs improvement. Above 500ms is poor.

## Common causes of high INP

Blocking synchronous JavaScript, long tasks on the main thread, complex event listeners, and inefficient DOM rendering.

## How to optimize INP

Split long tasks with setTimeout or requestIdleCallback, use Web Workers for heavy processes, implement debouncing on frequent events, and avoid unnecessary reflows.

## Conclusion

INP is now a ranking metric you cannot ignore. At Vynta we conduct performance audits focused on Core Web Vitals to ensure the best user experience.
