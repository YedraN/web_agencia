---
title: "HTTPS and SSL: secure configuration for your website"
description: "Complete guide to HTTPS and SSL: how to configure certificates, redirect HTTP traffic, and maintain website security."
date: "2025-01-25"
tags: ["HTTPS", "SSL", "Web Security", "Certificates"]
---

## Why HTTPS is mandatory

Google marks HTTP sites as not secure. HTTPS is a ranking factor and essential for user trust.

## How SSL certificates work

An SSL/TLS certificate encrypts communication between browser and server using asymmetric cryptography for the initial handshake.

## Certificate types

### DV (Domain Validation)

Verifies domain ownership only. Issued in minutes. Sufficient for most sites.

### OV (Organization Validation)

Verifies the organization. Higher trust level. Recommended for businesses.

### EV (Extended Validation)

Shows company name in the address bar. Increasingly less common.

## Let's Encrypt

Free DV certificates with automatic renewal. Compatible with most hosting and CDNs.

## Recommended configuration

Use TLS 1.3, disable TLS 1.0 and 1.1, configure HSTS, and redirect HTTP to HTTPS with 301.

## HSTS

```nginx
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

## Conclusion

HTTPS is the foundation of web security. At Vynta we configure SSL/TLS with best practices including HSTS, 301 redirects, and expiry monitoring.
