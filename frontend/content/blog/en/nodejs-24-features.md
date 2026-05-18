---
title: "Node.js 24: new features and improvements"
description: "Explore Node.js 24 new features: V8 performance upgrades, native ESM, improved diagnostics, OpenSSL 4.0, and WebSocket stabilization."
date: "2026-05-15"
tags: ["Node.js", "JavaScript", "Backend", "Runtime"]
---

Node.js 24 delivers significant improvements in performance, security, and developer experience. Based on V8 12.6, this release introduces optimizations that promise up to 18% faster server-side JavaScript.

## Key highlights

The Node.js team has focused on several fronts. **ESM (ECMAScript Modules) integration** reaches full maturity, gradually phasing out CommonJS support. The new `--experimental-require-esm` flag allows loading ESM modules from CommonJS environments.

The enhanced V8 JIT compiler reduces cold start times for serverless and edge functions. Diagnostic APIs like `node:test` and `node:report` now include real-time memory heap metrics.

## Security and observability

Node.js 24 ships with native OpenSSL 4.0 support, improved TLS 1.3 encryption, and a granular permission API that restricts file system, network, and child process access without external modules.

The native `fetch()` API receives significant performance optimizations, and `WebSocket` stabilizes as a native runtime API, reducing dependency on third-party libraries like `ws`.

Node.js 24 proves the runtime continues evolving to meet modern backend development needs. At Vynta, we help you design scalable, high-performance Node.js architectures tailored to your business.
