---
title: "Streaming de vídeo: HLS y DASH para aplicaciones web"
description: "Guía de streaming de vídeo adaptativo: HLS y DASH, códecs, segmentación y cómo ofrecer vídeo de alta calidad en aplicaciones web."
date: "2026-03-10"
tags: ["Streaming", "HLS", "DASH", "Vídeo", "Web"]
---

## ¿Qué es streaming adaptativo?

El streaming adaptativo divide el vídeo en segmentos pequeños y ofrece múltiples calidades. El reproductor selecciona automáticamente la mejor calidad según el ancho de banda.

## HLS (HTTP Live Streaming)

Creado por Apple. El formato más compatible. Usa archivos .m3u8 para la playlist y .ts o .fmp4 para los segmentos.

## DASH (Dynamic Adaptive Streaming over HTTP)

Estándar abierto (MPEG-DASH). Usa archivos .mpd (Media Presentation Description). Más eficiente que HLS en algunos aspectos.

## Codecs de vídeo

H.264 es el más compatible. H.265/HEVC ofrece mejor compresión pero menos soporte. AV1 es el futuro: royalty-free y excelente compresión.

## Preparación del contenido

Usa FFmpeg para transcodificar y segmentar vídeos. Ejemplo:

```bash
ffmpeg -i input.mp4 -c:v libx264 -c:a aac -hls_time 6 -hls_playlist_type vod output.m3u8
```

## Reproductores web

HLS.js, Shaka Player (DASH), Video.js, y JW Player. Todos soportan reproducción adaptativa.

## DRM (Digital Rights Management)

Widevine, PlayReady y FairPlay protegen contenido premium. EME (Encrypted Media Extensions) es la API del navegador.

## Conclusión

El streaming adaptativo es esencial para ofrecer vídeo de calidad. En Vynta implementamos pipelines de streaming completos con HLS, DASH y DRM.
