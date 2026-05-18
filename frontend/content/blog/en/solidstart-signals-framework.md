---
title: "SolidStart: the signals-based framework for reactive apps"
description: "SolidStart is the meta-framework for SolidJS. Discover how its signals and Virtual DOM-free rendering deliver superior performance."
date: "2026-04-07"
tags: ["SolidJS", "SolidStart", "Signals", "Performance"]
---

## Introduction

SolidJS has gained popularity for its exceptional performance. SolidStart, its meta-framework, brings that philosophy to building full applications with routing, SSR, and more.

## What makes SolidStart unique

Unlike React or Vue, SolidJS doesn't use a Virtual DOM. It compiles directly to real DOM operations, resulting in smaller bundles and better performance.

## Signals as Foundation

SolidJS signals are the fundamental reactive primitive. `createSignal`, `createEffect`, and `createMemo` offer fine-grained reactivity without re-renders.

## Built-in Routing

SolidStart includes a file-system router with automatic lazy loading, nested layouts, and API route support.

## SSR and Streaming

The server renders initial HTML that progressively hydrates. Streaming sends content to the client as it's generated.

## Conclusion

SolidStart is ideal for applications that need maximum performance. At **Vynta**, we explore SolidJS for projects where every millisecond counts.
