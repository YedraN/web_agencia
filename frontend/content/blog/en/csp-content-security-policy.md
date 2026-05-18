---
title: "CSP: Content Security Policy to protect your website"
description: "Guide to Content Security Policy (CSP): how to implement content security policies to prevent XSS and other vulnerabilities."
date: "2026-05-10"
tags: ["CSP", "Web Security", "XSS", "Content Security Policy"]
---

## What is CSP?

Content Security Policy (CSP) is a security layer that helps detect and mitigate attacks like Cross-Site Scripting (XSS) and data injection.

## How it works

CSP works through HTTP headers that tell the browser which resources can be loaded and from which origins.

## Main directives

### default-src

Serves as fallback for all unspecified directives. Use 'self' as base value.

### script-src

Controls which scripts can execute. Avoid 'unsafe-inline' whenever possible.

### style-src

Controls CSS sources. Similar to script-src but for styles.

### img-src

Controls images the page can load. Include data: if using base64 images.

## Gradual implementation

Start in report-only mode to detect violations without blocking. Use report-uri or report-to for reports.

## Common errors

CSP too restrictive that breaks functionality, or too permissive that offers no protection.

## Conclusion

CSP is one of the most effective defenses against XSS. At Vynta we implement custom Content Security Policies that protect without breaking functionality.
