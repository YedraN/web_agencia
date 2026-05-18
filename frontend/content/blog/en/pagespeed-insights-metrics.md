---
title: "PageSpeed Insights: understand all metrics"
description: "Guide to understanding every PageSpeed Insights metric: Core Web Vitals, opportunities, diagnostics, and how to improve your score."
date: "2025-09-14"
tags: ["PageSpeed Insights", "Performance", "Core Web Vitals", "Lighthouse"]
---

## What is PageSpeed Insights?

PageSpeed Insights (PSI) is a Google tool that analyzes the performance of a web page on mobile and desktop devices.

## Report sections

### Core Web Vitals Assessment

Shows real-world data from the Chrome User Experience Report (CrUX). These metrics reflect actual user experiences.

### Opportunities

Specific suggestions to improve speed. Each opportunity includes the estimated time savings.

### Diagnostics

Additional information about practices that don't directly affect the score but are important for site health.

## Key metrics explained

FCP (First Contentful Paint) measures when the first content appears. TBT (Total Blocking Time) measures how long the main thread is blocked. SI (Speed Index) measures how quickly visual content is displayed.

## Score vs real data

The Lighthouse score is a simulation. CrUX data is real. Both are important for different purposes.

## How to use PSI in workflows

Integrate PSI into your CI/CD with Lighthouse CI. Schedule weekly audits and alert on performance regressions.

## Conclusion

PageSpeed Insights is the gateway to web performance. At Vynta we use PSI alongside other tools for accurate diagnostics and clear optimization roadmaps.
