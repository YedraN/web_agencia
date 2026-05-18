---
title: "Video streaming: HLS and DASH for web applications"
description: "Guide to adaptive video streaming: HLS and DASH, codecs, segmentation, and how to deliver high-quality video in web applications."
date: "2026-03-10"
tags: ["Streaming", "HLS", "DASH", "Video", "Web"]
---

## What is adaptive streaming?

Adaptive streaming divides video into small segments and offers multiple qualities. The player automatically selects the best quality based on bandwidth.

## HLS (HTTP Live Streaming)

Created by Apple. The most compatible format. Uses .m3u8 files for playlists and .ts or .fmp4 for segments.

## DASH (Dynamic Adaptive Streaming over HTTP)

Open standard (MPEG-DASH). Uses .mpd files (Media Presentation Description). More efficient than HLS in some aspects.

## Video codecs

H.264 is most compatible. H.265/HEVC offers better compression but less support. AV1 is the future: royalty-free with excellent compression.

## Content preparation

Use FFmpeg to transcode and segment videos:

```bash
ffmpeg -i input.mp4 -c:v libx264 -c:a aac -hls_time 6 -hls_playlist_type vod output.m3u8
```

## Web players

HLS.js, Shaka Player (DASH), Video.js, and JW Player. All support adaptive playback.

## DRM

Widevine, PlayReady, and FairPlay protect premium content. EME (Encrypted Media Extensions) is the browser API.

## Conclusion

Adaptive streaming is essential for quality video delivery. At Vynta we implement complete streaming pipelines with HLS, DASH, and DRM.
