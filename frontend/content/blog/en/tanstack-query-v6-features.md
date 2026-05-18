---
title: "TanStack Query v6: new features and improvements"
description: "TanStack Query v6 arrives with SSR improvements, React 19 support, new DevTools, and a simpler API. Discover all the new features."
date: "2025-04-29"
tags: ["TanStack Query", "React", "Fetching", "Cache"]
---

## Introduction

TanStack Query (formerly React Query) is the most popular library for async state management. Version 6 brings significant performance and DX improvements.

## React 19 and Server Components

v6 offers native integration with React 19 and Server Components. You can now prefetch queries on the server and continue them on the client without duplication.

## Simplified API

`useQuery` and `useMutation` get a cleaner API. Options like `staleTime` and `gcTime` (formerly `cacheTime`) have smarter defaults.

## New DevTools

The developer tools have been rewritten with a more intuitive interface. Shows the status of each query, last update time, and dependencies.

## Improved Optimistic Updates

The API for optimistic updates is simplified with more predictable `onMutate` and automatic rollback on error.

## Conclusion

TanStack Query v6 is faster, simpler, and better integrated with the modern ecosystem. At **Vynta**, we use it to manage API data efficiently.
