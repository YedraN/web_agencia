---
title: "Robots.txt: configuración avanzada para buscadores"
description: "Guía avanzada de robots.txt: directivas, patrones, crawling presupuesto y cómo controlar el acceso de bots a tu sitio web."
date: "2025-12-20"
tags: ["Robots.txt", "Crawling", "SEO Técnico", "Bots"]
---

## ¿Qué es robots.txt?

robots.txt es un archivo que indica a los crawlers qué URLs pueden o no pueden rastrear en tu sitio web.

## Directivas principales

### User-agent

Especifica a qué bot se aplican las reglas. * aplica a todos los bots. Googlebot para Google, Bingbot para Bing.

### Disallow

Indica qué rutas no deben rastrearse. Usa / para bloquear todo o rutas específicas como /admin/.

### Allow

Permite el rastreo de una ruta específica dentro de una bloqueada. Útil para CSS o imágenes dentro de /admin/.

### Sitemap

Indica la ubicación de tu sitemap XML. Puedes incluir múltiples sitemaps.

## Configuración avanzada

### Crawl-delay

Recomienda un intervalo entre solicitudes. Útil para servidores con recursos limitados.

### Patrones con wildcards

$ para final de URL, * para cualquier secuencia. Ejemplo: /*?print=true$ bloquea páginas de impresión.

## Errores comunes

Bloquear CSS o JS (empeora el renderizado de Google), usar Disallow en lugar de Noindex, o tener reglas contradictorias.

## Conclusión

robots.txt es una herramienta poderosa para gestionar el presupuesto de crawling. En Vynta auditamos y optimizamos robots.txt para maximizar la eficiencia del rastreo de Google.
