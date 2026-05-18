---
title: "Web Bluetooth: conecta dispositivos IoT desde el navegador"
description: "Guía de Web Bluetooth API: cómo conectar y comunicarse con dispositivos Bluetooth Low Energy desde el navegador web."
date: "2026-04-22"
tags: ["Web Bluetooth", "IoT", "Bluetooth LE", "APIs Web"]
---

## ¿Qué es Web Bluetooth?

Web Bluetooth es una API del navegador que permite conectarse a dispositivos Bluetooth Low Energy (BLE) cercanos.

## Cómo funciona

El navegador actúa como GATT client. El usuario debe iniciar la conexión mediante un gesto (click). HTTPS es obligatorio.

## Proceso de conexión

1. navigator.bluetooth.requestDevice() abre un diálogo de selección
2. El usuario selecciona un dispositivo
3. Se establece conexión GATT
4. Se descubren servicios y características

## Servicios y características

Los dispositivos BLE exponen servicios (UUID estándar o personalizado) con características que se pueden leer, escribir o notificar.

## Casos de uso

Controlar luces inteligentes, leer sensores de temperatura, configurar dispositivos IoT, y recibir notificaciones de wearables.

## Limitaciones

Solo compatible con BLE (no Bluetooth Classic). Requiere interacción del usuario. No funciona en todos los navegadores (principalmente Chrome/Edge).

## Seguridad

HTTPS obligatorio. El usuario debe aprobar cada conexión. Las claves de cifrado se negocian durante el pairing.

## Conclusión

Web Bluetooth acerca el IoT al navegador. En Vynta desarrollamos interfaces web que se comunican directamente con dispositivos Bluetooth para aplicaciones de control y monitorización.
