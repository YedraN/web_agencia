---
title: "Scroll-Driven Animations: CSS scroll-based animations"
description: "Scroll-Driven Animations let you animate elements based on user scroll without JavaScript. How to use the new CSS animation API."
date: "2025-02-25"
tags: ["CSS", "Animations", "Scroll", "Performance"]
---

## Introduction

Scroll-Driven Animations enable animations that respond to user scroll using only CSS. No Intersection Observer, no libraries, no JavaScript.

## Scroll Timeline

The new `scroll-timeline` concept defines a progression axis based on container scroll. Animations are linked to this timeline.

## Basic Syntax

Use `animation-timeline: scroll()` to link an animation to scroll. Control the range with `animation-range` to define when it starts and ends.

## Practical Examples

Progress bars, shrinking headers, images that fade in on scroll, and parallax effects entirely in CSS.

## View Timeline

`view-timeline` links the animation to when an element enters or leaves the viewport, perfect for scroll-triggered entry animations.

## Conclusion

Scroll-Driven Animations eliminate JavaScript for scroll-based animations. At **Vynta**, we create captivating scroll experiences with pure CSS.
