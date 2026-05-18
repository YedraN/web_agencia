---
title: "TypeScript satisfies: type safety without losing flexibility"
description: "The satisfies operator in TypeScript lets you validate types without changing the inferred type. Learn to use it with practical code examples."
date: "2025-03-25"
tags: ["TypeScript", "satisfies", "Types", "JavaScript"]
---

## Introduction

The `satisfies` operator in TypeScript 4.9+ lets you verify a value matches a type without changing the inferred type. It's perfect for validation without sacrificing flexibility.

## The problem it solves

Sometimes you need to ensure an object matches a structure, but want to keep the specific inferred type. With `as` you lose information; with `satisfies` you don't.

## Basic Syntax

`const palette = { red: [255, 0, 0] } satisfies Record<string, [number, number, number]>;` TypeScript verifies but keeps the literal type.

## Use Cases

Color objects, configs with specific values, route-to-component mappings, and any situation where you want validation without type annotation.

## Comparison with as

`as` changes the type; `satisfies` only verifies. If the value doesn't comply, you get an error at the exact location, not at consumption.

## Conclusion

`satisfies` improves type safety without rigidity. At **Vynta**, we use it to write safer and more expressive TypeScript.
