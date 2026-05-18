---
title: "Partial Prerendering: Next.js new rendering model"
description: "Partial Prerendering combines SSG, SSR, and ISR in a single page. How it works and why it's the future of rendering in Next.js."
date: "2026-02-26"
tags: ["Next.js", "Performance", "SSG", "SSR"]
---

## Introduction

Next.js introduces Partial Prerendering (PPR), a model that combines the best of static and dynamic rendering on the same page. You no longer have to choose between speed and freshness.

## What is PPR?

It's a hybrid model that prerenders static parts of your page at build time and leaves dynamic holes that render on-demand or via streaming.

## How it works

A static shell is served from the CDN instantly. Dynamic parts like personalized feeds or user panels render as deferred content.

## Key Benefits

First paint is instant because the HTML shell arrives without JavaScript. Dynamic content loads progressively without blocking interactivity.

## Configuration

In next.config.js, set `experimental.ppr = true`. Then wrap dynamic components in a Suspense boundary and Next.js automatically decides what to prerender.

## When to use it

Ideal for dashboards, e-commerce with static catalogs and dynamic prices, blogs with personalized sections, and landing pages with forms.

## Conclusion

PPR is the future of web rendering. At **Vynta**, we implement this model to give users the best of both worlds: static speed and dynamic content.
