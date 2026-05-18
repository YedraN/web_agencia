---
title: "OAuth 2.1 and OpenID Connect: modern authentication"
description: "Guide to OAuth 2.1 and OpenID Connect: authorization flows, security best practices, and delegated authentication implementation in 2026."
date: "2025-05-10"
tags: ["OAuth", "OpenID Connect", "Authentication", "Security"]
---

OAuth 2.1 and OpenID Connect (OIDC) form the foundation of modern authentication for web and mobile applications. OAuth 2.1 simplifies and hardens the previous standard by removing insecure flows.

## What's new in OAuth 2.1

OAuth 2.1 removes the implicit grant (insecure for SPAs) and resource owner password grant. The recommended flow is Authorization Code with PKCE for all applications, including SPAs and mobile apps. It also prohibits refresh token usage without client_secret unless PKCE is used.

## OpenID Connect: identity over OAuth

OIDC extends OAuth 2.0 with an identity layer. The ID Token (JWT) contains authenticated user information. The `/.well-known/openid-configuration` endpoint exposes provider configuration (issuer, endpoints, keys).

## Practical implementation

Providers like Auth0, Clerk, Supabase Auth, and Keycloak implement OIDC. Most frameworks (NextAuth.js, Lucia Auth, Supabase Auth) integrate OIDC natively.

## Best practices

Use PKCE in all public applications. Validate the ID Token's issuer and audience. Implement token rotation for refresh tokens. Store tokens securely (httpOnly cookies for web, secure storage for mobile).

OAuth 2.1 and OIDC are the correct way to implement delegated authentication. At Vynta, we implement secure and optimized OAuth flows for your application.
