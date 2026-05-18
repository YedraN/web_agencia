---
title: "Sitemap XML: priorización y estructura óptima"
description: "Guía de sitemap XML: cómo estructurar, priorizar y optimizar tus sitemaps para mejorar el descubrimiento de contenido por Google."
date: "2025-02-18"
tags: ["Sitemap XML", "Indexación", "SEO Técnico", "Crawling"]
---

## ¿Qué es un sitemap XML?

Un sitemap XML es un archivo que lista las URLs importantes de tu sitio web, ayudando a los buscadores a descubrir y priorizar contenido.

## Estructura básica

```xml
<urlset>
  <url>
    <loc>https://ejemplo.com/</loc>
    <lastmod>2026-01-01</lastmod>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>
</urlset>
```

## Priorización

Usa priority de 0.0 a 1.0. La homepage debe ser 1.0. Las categorías 0.8. Los artículos 0.5. Las páginas secundarias 0.3.

## Cambio de frecuencia

changefreq indica cada cuánto cambia una página: always, hourly, daily, weekly, monthly, yearly, never.

## Sitemaps múltiples

Para sitios grandes (más de 50k URLs), usa un sitemap index que agrupe múltiples sitemaps por sección.

## Errores comunes

Incluir URLs noindex o bloqueadas por robots.txt, URLs canónicas incorrectas, y URLs con fragmentos (#).

## Conclusión

Un sitemap XML bien estructurado acelera la indexación. En Vynta generamos sitemaps dinámicos optimizados que garantizan que Google descubra todo tu contenido importante.
