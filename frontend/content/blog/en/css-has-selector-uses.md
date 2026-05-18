---
title: "CSS :has() selector: practical uses and examples"
description: "The CSS :has() lets you select elements based on their children or descendants. Practical uses, examples, and how it simplifies your CSS."
date: "2025-02-11"
tags: ["CSS", "Selectors", ":has", "Frontend"]
---

## Introduction

The `:has()` selector is one of the most revolutionary in CSS. It lets you select an element based on what it contains, something previously only possible with JavaScript.

## What is :has()

`:has()` is a pseudo-class that selects an element if it contains another specific element. For example: `div:has(p)` selects divs that contain a paragraph.

## Practical Uses

Styles for cards with vs without images, forms with errors, menus with active submenus, and tables with selected rows.

## Combinations

Combine :has() with other selectors: `.card:has(img) { grid-column: span 2; }` or `form:has(input:invalid) { border-color: red; }`.

## Performance

Although powerful, :has() can be expensive on large DOM trees. Use it sparingly with simple selectors to maintain good performance.

## Conclusion

`:has()` opens possibilities that previously required JavaScript. At **Vynta**, we use it to create smarter components with less code.
