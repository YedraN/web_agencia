---
title: "CORS and CSRF: protect your web application"
description: "Complete guide to CORS and CSRF: how they work, common vulnerabilities, and best practices for protecting your web application."
date: "2025-08-15"
tags: ["CORS", "CSRF", "Security", "Web"]
---

CORS and CSRF are two of the most important security mechanisms in modern web applications. Although both protect against attacks, they operate at different layers.

## CORS (Cross-Origin Resource Sharing)

CORS is a browser mechanism that controls which origins can access your resources. When a frontend at `mydomain.com` tries to access your API at `api.mydomain.com`, the browser sends a preflight request (OPTIONS) to verify permissions.

Configure CORS correctly: don't use `Access-Control-Allow-Origin: *` in production if the API handles sensitive data. Specify exact origins, allowed HTTP methods, and custom headers. Be careful with `credentials: include` and `Access-Control-Allow-Credentials: true` which expose cookies cross-origin.

## CSRF (Cross-Site Request Forgery)

CSRF tricks the browser into executing unintended actions on an application where the user is authenticated. Protections include CSRF tokens (sent as custom headers), SameSite cookies (Strict or Lax), and Origin/Referer header verification.

## Key differences

CORS controls which origins can read API responses. CSRF prevents unauthorized authenticated actions. CORS is optional (browser-only), CSRF is an active attack against authenticated sessions.

## Best practices in 2026

Use SameSite=Strict (or Lax) on session cookies. Implement CSRF tokens in forms. Configure Content Security Policy. Use restrictive CORS with an origin allowlist.

Web security is a layer, not a feature. At Vynta, we perform security audits and apply best practices to protect your applications.
