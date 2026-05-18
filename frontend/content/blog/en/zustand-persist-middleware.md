---
title: "Zustand Persist: how to save state locally"
description: "Zustand Persist middleware lets you save state in localStorage, AsyncStorage, or IndexedDB. Learn to persist your React app state."
date: "2025-05-20"
tags: ["Zustand", "Persistence", "React", "State"]
---

## Introduction

Zustand's `persist` middleware lets you automatically save and restore state in local storage. Ideal for maintaining sessions, preferences, and offline data.

## Basic Setup

Import `persist` from `zustand/middleware` and wrap your store. It uses `localStorage` by default. State is automatically saved on every change.

## Custom Storage

Use `AsyncStorage` for React Native, `IndexedDB` for large volumes, or `cookieStorage` for SSR compatibility.

## Partialize and Merge

Use `partialize` to choose which parts of state to persist. Use `merge` to control how saved state merges with initial state.

## Versioning

`version` and `migrate` allow handling state structure changes between application versions.

## Use Cases

Persistent shopping cart, theme preferences, last step of a multi-step form, and session tokens.

## Conclusion

Zustand Persist simplifies state persistence. At **Vynta**, we use it to create seamless experiences where users pick up where they left off.
