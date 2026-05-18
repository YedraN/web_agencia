---
title: "Robots.txt: advanced configuration for search engines"
description: "Advanced guide to robots.txt: directives, patterns, crawl budget, and how to control bot access to your website."
date: "2025-12-20"
tags: ["Robots.txt", "Crawling", "Technical SEO", "Bots"]
---

## What is robots.txt?

robots.txt is a file that tells crawlers which URLs they can or cannot crawl on your website.

## Main directives

### User-agent

Specifies which bot the rules apply to. * applies to all bots. Googlebot for Google, Bingbot for Bing.

### Disallow

Indicates which paths should not be crawled. Use / to block everything or specific paths like /admin/.

### Allow

Permits crawling of a specific path within a blocked one. Useful for CSS or images inside /admin/.

### Sitemap

Indicates your XML sitemap location. Can include multiple sitemaps.

## Advanced configuration

### Crawl-delay

Recommends an interval between requests. Useful for servers with limited resources.

### Wildcard patterns

$ for end of URL, * for any sequence. Example: /*?print=true$ blocks print pages.

## Common errors

Blocking CSS or JS (worsens Google rendering), using Disallow instead of Noindex, having contradictory rules.

## Conclusion

robots.txt is a powerful tool for managing crawl budget. At Vynta we audit and optimize robots.txt to maximize Google crawling efficiency.
