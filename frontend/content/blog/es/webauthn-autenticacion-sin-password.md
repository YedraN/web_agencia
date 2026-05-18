---
title: "WebAuthn: autenticación sin contraseñas"
description: "Guía de WebAuthn: cómo implementar autenticación sin contraseñas usando passkeys, biométricos y llaves de seguridad FIDO2."
date: "2026-01-10"
tags: ["WebAuthn", "Autenticación", "Passkeys", "Seguridad"]
---

## ¿Qué es WebAuthn?

WebAuthn (Web Authentication) es un estándar del W3C que permite la autenticación sin contraseñas mediante criptografía de clave pública.

## Cómo funciona

El servidor genera un challenge que el navegador firma con una clave privada. La clave pública se almacena en el servidor. Nunca se comparten secretos.

## Tipos de autenticadores

### Platform authenticators

Touch ID, Face ID, Windows Hello. Integrados en el dispositivo.

### Roaming authenticators

Llaves de seguridad USB (YubiKey, Google Titan), NFC o Bluetooth.

### Passkeys

Sincronizados entre dispositivos mediante iCloud Keychain, Google Password Manager o 1Password.

## Ventajas

Elimina el phishing (no hay contraseñas que robar), mejora la experiencia de usuario, y cumple con regulaciones de seguridad.

## Implementación

Usa la API navigator.credentials.create() para registro y navigator.credentials.get() para autenticación. Bibliotecas como SimpleWebAuthn facilitan la implementación.

## Conclusión

WebAuthn es el futuro de la autenticación web. En Vynta implementamos passkeys y WebAuthn para ofrecer a los usuarios una experiencia segura y sin fricción.
