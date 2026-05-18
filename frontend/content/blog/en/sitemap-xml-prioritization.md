---
title: "Sitemap XML: prioritization and optimal structure"
description: "Guide to XML sitemaps: how to structure, prioritize, and optimize your sitemaps to improve content discovery by Google."
date: "2025-02-18"
tags: ["Sitemap XML", "Indexing", "Technical SEO", "Crawling"]
---

## What is an XML sitemap?

An XML sitemap lists important URLs on your website, helping search engines discover and prioritize content.

## Basic structure

```xml
<urlset>
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2026-01-01</lastmod>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>
</urlset>
```

## Prioritization

Use priority from 0.0 to 1.0. Homepage should be 1.0. Categories 0.8. Articles 0.5. Secondary pages 0.3.

## Change frequency

changefreq indicates how often a page changes: always, hourly, daily, weekly, monthly, yearly, never.

## Multiple sitemaps

For large sites (over 50k URLs), use a sitemap index that groups multiple sitemaps by section.

## Common errors

Including noindex or robots.txt-blocked URLs, incorrect canonical URLs, and URLs with fragments (#).

## Conclusion

A well-structured XML sitemap accelerates indexing. At Vynta we generate dynamic optimized sitemaps that ensure Google discovers all your important content.
