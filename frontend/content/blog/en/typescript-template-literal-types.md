---
title: "Template Literal Types: dynamic types in TypeScript"
description: "Template Literal Types let you create dynamic types by combining strings. Learn to use them for typing routes, events, and API responses."
date: "2025-04-08"
tags: ["TypeScript", "Template Literal Types", "Types", "Advanced"]
---

## Introduction

Template Literal Types are one of TypeScript's most powerful features. They let you manipulate string types at compile time, creating dynamic combinations.

## Basic Syntax

They use the same syntax as JavaScript template literals but with types: `` type Endpoint = `/api/${'users' | 'posts'}` `` generates the union `/api/users` | `/api/posts`.

## String Manipulators

TypeScript includes `Uppercase`, `Lowercase`, `Capitalize`, and `Uncapitalize` for transforming string types. Useful for normalizing formats.

## Real Use Cases

Typing API routes with dynamic parameters, creating event types like `onClick`, `onSubmit` from a base, and generating CSS types like `marginTop`, `marginLeft`.

## Advanced Inference

Combine Template Literal Types with inference to parse routes: split `/api/users/123` into parts and extract dynamic parameters.

## Conclusion

Template Literal Types take TypeScript typing to another level. At **Vynta**, we use them to create type-safe APIs and catch errors at compile time.
