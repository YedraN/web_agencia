---
title: "TypeScript Decorators: complete guide with examples"
description: "TypeScript Decorators let you add metadata and modify classes. Complete guide with class, method, property, and parameter decorator examples."
date: "2025-04-01"
tags: ["TypeScript", "Decorators", "Programming", "Metadata"]
---

## Introduction

TypeScript decorators let you add metadata and modify the behavior of classes and their members. Although they started as an experimental proposal, they are now an ECMAScript standard.

## Types of decorators

There are four types: class, method, property, and parameter. Each receives different arguments and serves different purposes.

## Class decorator

Receives the constructor and can modify it. Useful for adding static methods, registering classes in a DI container, or adding metadata.

## Method decorator

Receives the target, method name, and descriptor. Used for logging, caching, argument validation, or transforming results.

## Property decorator

Receives target and property name. Useful for observability, serialization, or dependency injection.

## Decorators with parameters

Use decorator factories: functions that return a decorator. They allow configurable behavior like `@log('info')` or `@validate(schema)`.

## Conclusion

Decorators are a powerful metaprogramming tool. At **Vynta**, we use them for logging, validation, and dependency management.
