---
title: "CSS Container Queries: component-based responsive design"
description: "CSS Container Queries let you design components that adapt to their container size, not the viewport. Learn how to use them with practical examples."
date: "2025-01-14"
tags: ["CSS", "Container Queries", "Responsive", "Design"]
---

## Introduction

CSS Container Queries are one of the most requested CSS features. They allow a component to respond to its parent container's size instead of the viewport.

## Difference from Media Queries

Media queries look at the viewport. Container queries look at the container size. This enables truly reusable components that adapt to any space.

## How to use Container Queries

Define a container with `container-type: inline-size`, then use `@container (min-width: 400px)` to apply styles based on the container size.

## Practical Examples

Cards that change layout in a grid, sidebars that automatically collapse, and forms that reorganize fields based on available space.

## Browser Support

Container Queries are supported in all modern browsers since 2024. They are production-ready.

## Conclusion

Container Queries change the rules of responsive design. At **Vynta**, we apply them to create truly context-independent components.
