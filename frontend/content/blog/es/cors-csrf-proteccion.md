---
title: "CORS y CSRF: protege tu aplicación web"
description: "Guía completa sobre CORS y CSRF: cómo funcionan, vulnerabilidades comunes y mejores prácticas para proteger tu aplicación web."
date: "2025-08-15"
tags: ["CORS", "CSRF", "Seguridad", "Web"]
---

CORS y CSRF son dos de los mecanismos de seguridad más importantes en aplicaciones web modernas. Aunque ambos protegen contra ataques, operan en capas diferentes.

## CORS (Cross-Origin Resource Sharing)

CORS es un mecanismo del navegador que controla qué orígenes pueden acceder a tus recursos. Cuando un frontend en `midominio.com` intenta acceder a tu API en `api.midominio.com`, el navegador envía una preflight request (OPTIONS) para verificar los permisos.

Configura CORS correctamente: no uses `Access-Control-Allow-Origin: *` en producción si la API maneja datos sensibles. Especifica orígenes exactos, métodos HTTP permitidos y cabeceras personalizadas. Ten cuidado con `credentials: include` y `Access-Control-Allow-Credentials: true` que exponen cookies a orígenes cruzados.

## CSRF (Cross-Site Request Forgery)

CSRF engaña al navegador para que ejecute acciones no intencionadas en una aplicación donde el usuario está autenticado. Las protecciones incluyen CSRF tokens (enviados como cabecera personalizada), SameSite cookies (Strict o Lax) y verificación de cabecera Origin/Referer.

## Diferencias clave

CORS controla qué orígenes pueden leer respuestas de tu API. CSRF previene que se ejecuten acciones autenticadas no autorizadas. CORS es opcional (solo navegador), CSRF es un ataque activo contra sesiones autenticadas.

## Mejores prácticas en 2026

Usa SameSite=Strict (o Lax) en cookies de sesión. Implementa CSRF tokens en formularios. Configura Content Security Policy. Usa CORS restrictivo con lista blanca de orígenes.

La seguridad web es una capa, no una característica. En Vynta realizamos auditorías de seguridad y aplicamos las mejores prácticas para proteger tus aplicaciones.
