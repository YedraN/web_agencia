---
title: "TanStack Router: the type-safe router for React"
description: "TanStack Router is a React router with end-to-end types, integrated data loading, and automatic lazy loading."
date: "2025-05-06"
tags: ["TanStack Router", "React", "Routing", "Type Safety"]
---

## Introduction

TanStack Router is the newest member of the TanStack family. It offers end-to-end type safety, search params validation, and integrated data loading.

## Complete Type Safety

Every route has types for params, search params, and loaded data. Links to routes are validated at compile time. No more broken routes.

## Integrated Data Loading

Each route can define a `loader` that runs before rendering. Data is available in the component with full types.

## Automatic Lazy Loading

Routes are automatically split into chunks. No configuration, no `React.lazy`. The router loads each route's code on demand.

## Search Params Validation

Define validation schemas for search params using Zod. Parameters are validated and typed automatically in the URL.

## Conclusion

TanStack Router is the most type-safe router for React. At **Vynta**, we use it for applications where type safety and performance are critical.
