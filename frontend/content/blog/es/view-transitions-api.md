---
title: "View Transitions API: animaciones entre páginas nativas"
description: "View Transitions API permite animaciones fluidas entre páginas web sin librerías externas. Aprende a implementar transiciones nativas con un ejemplo."
date: "2025-02-18"
tags: ["CSS", "View Transitions", "Animaciones", "SPA"]
---

## Introducción

La View Transitions API permite crear animaciones fluidas entre páginas web sin JavaScript ni librerías externas. Es una de las características más emocionantes de la web moderna.

## Cómo funciona

Cuando navegas entre páginas, la API captura el estado visual anterior, aplica la transición y muestra el nuevo estado. Todo ocurre en el navegador.

## Transiciones de ida y vuelta

Define cómo cada elemento transiciona entre páginas. Un mismo elemento puede tener animaciones diferentes al entrar y al salir.

## Uso con SPA

Para aplicaciones SPA, la API se activa con `document.startViewTransition()`. Ideal para React, Vue o Angular con mínimo código.

## Personalización

Controla duración, easing y qué elementos participan. Puedes crear efectos de morphing, deslizamiento o fundido entre páginas.

## Conclusión

View Transitions API aporta animaciones nativas de nivel nativo. En **Vynta** las implementamos para mejorar la experiencia de usuario con transiciones elegantes.
