---
title: "HTTPS y SSL: configuración segura para tu web"
description: "Guía completa de HTTPS y SSL: cómo configurar certificados, redirigir tráfico HTTP y mantener la seguridad de tu sitio web."
date: "2025-01-25"
tags: ["HTTPS", "SSL", "Seguridad Web", "Certificados"]
---

## ¿Por qué HTTPS es obligatorio?

Google marca los sitios HTTP como no seguros. HTTPS es un factor de ranking y esencial para la confianza del usuario.

## Cómo funcionan los certificados SSL

Un certificado SSL/TLS cifra la comunicación entre el navegador y el servidor. Utiliza criptografía asimétrica para el handshake inicial.

## Tipos de certificados

### DV (Domain Validation)

Verifica solo la propiedad del dominio. Emisión en minutos. Suficiente para la mayoría de sitios.

### OV (Organization Validation)

Verifica la organización. Mayor nivel de confianza. Recomendado para empresas.

### EV (Extended Validation)

Muestra el nombre de la empresa en la barra de direcciones. Cada vez menos común.

## Let's Encrypt

Certificados gratuitos DV con renovación automática. Compatibles con la mayoría de hosting y CDNs.

## Configuración recomendada

Usa TLS 1.3, desactiva TLS 1.0 y 1.1, configura HSTS, y redirige HTTP a HTTPS con 301.

## HSTS (HTTP Strict Transport Security)

```nginx
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

## Conclusión

HTTPS es la base de la seguridad web. En Vynta configuramos SSL/TLS con las mejores prácticas, incluyendo HSTS, redirecciones 301 y monitorización de caducidad.
