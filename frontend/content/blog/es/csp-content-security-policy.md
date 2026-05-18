---
title: "CSP: Content Security Policy para proteger tu web"
description: "Guía de Content Security Policy (CSP): cómo implementar políticas de seguridad de contenido para prevenir XSS y otras vulnerabilidades."
date: "2026-05-10"
tags: ["CSP", "Seguridad Web", "XSS", "Content Security Policy"]
---

## ¿Qué es CSP?

Content Security Policy (CSP) es una capa de seguridad que ayuda a detectar y mitigar ataques como Cross-Site Scripting (XSS) y data injection.

## Cómo funciona

CSP funciona mediante cabeceras HTTP que indican al navegador qué recursos puede cargar y desde qué orígenes.

## Directivas principales

### default-src

Sirve como fallback para todas las directivas no especificadas. Usa 'self' como valor base.

### script-src

Controla qué scripts pueden ejecutarse. Evita 'unsafe-inline' siempre que sea posible.

### style-src

Controla las fuentes de CSS. Similar a script-src pero para estilos.

### img-src

Controla las imágenes que puede cargar la página. Incluye data: si usas imágenes en base64.

## Implementación gradual

Comienza en modo report-only para detectar violaciones sin bloquear. Usa report-uri o report-to para recibir informes.

## Errores comunes

CSP demasiado restrictivo que rompe funcionalidades, o demasiado permisivo que no ofrece protección.

## Conclusión

CSP es una de las defensas más efectivas contra XSS. En Vynta implementamos Content Security Policy personalizadas que protegen sin romper la funcionalidad.
