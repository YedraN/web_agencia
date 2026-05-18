---
title: "Qwik: resumability, the alternative to traditional hydration"
description: "Qwik introduces resumability, a model that eliminates expensive hydration. Discover how it works and why it's key for web performance."
date: "2026-04-14"
tags: ["Qwik", "JavaScript", "Performance", "Resumability"]
---

## Introduction

Qwik, created by Miško Hevery (creator of Angular), proposes a radically different model: resumability. Instead of hydrating the entire app on load, it only executes the necessary code.

## What is resumability

Traditional hydration runs the entire application on the client to recover state. Resumability pauses execution on the server and resumes it on the client without repeating work.

## How Qwik works

Qwik serializes application state into the HTML. When the user interacts, only the specific component's code is downloaded and executed, not the entire app.

## Extreme lazy loading

Every event handler, every effect, every listener loads on demand. This results in initial bundles under 1KB in many cases.

## Real Performance

Qwik applications consistently score 100 on Lighthouse, even on complex sites with heavy interactivity.

## Conclusion

Qwik represents the future of the web with zero unnecessary JavaScript. At **Vynta**, we evaluate Qwik for projects where performance is critical.
