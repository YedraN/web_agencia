---
title: "Web Bluetooth: connect IoT devices from the browser"
description: "Guide to Web Bluetooth API: how to connect and communicate with Bluetooth Low Energy devices from the web browser."
date: "2026-04-22"
tags: ["Web Bluetooth", "IoT", "Bluetooth LE", "Web APIs"]
---

## What is Web Bluetooth?

Web Bluetooth is a browser API that allows connecting to nearby Bluetooth Low Energy (BLE) devices.

## How it works

The browser acts as a GATT client. The user must initiate the connection with a gesture (click). HTTPS is required.

## Connection process

1. navigator.bluetooth.requestDevice() opens a selection dialog
2. User selects a device
3. GATT connection is established
4. Services and characteristics are discovered

## Services and characteristics

BLE devices expose services (standard or custom UUID) with characteristics that can be read, written, or notified.

## Use cases

Control smart lights, read temperature sensors, configure IoT devices, and receive wearable notifications.

## Limitations

Only compatible with BLE (not Bluetooth Classic). Requires user interaction. Not supported in all browsers (mainly Chrome/Edge).

## Security

HTTPS required. User must approve each connection. Encryption keys negotiated during pairing.

## Conclusion

Web Bluetooth brings IoT closer to the browser. At Vynta we develop web interfaces that communicate directly with Bluetooth devices for control and monitoring applications.
