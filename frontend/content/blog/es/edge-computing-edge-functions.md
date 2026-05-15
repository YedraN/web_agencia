---
title: "Edge computing y edge functions: el futuro del rendimiento web"
description: "Aprende cómo el edge computing y las edge functions reducen la latencia, mejoran la experiencia de usuario y permiten nuevas arquitecturas para aplicaciones web globales."
date: "2025-07-25"
tags: ["Desarrollo Web", "Edge", "Cloud"]
---

El edge computing acerca la computación a los usuarios. En lugar de ejecutar todo el código en un centro de datos central, las edge functions se ejecutan en nodos CDN distribuidos por todo el mundo. El resultado es una latencia drásticamente menor y una mejor experiencia de usuario para audiencias globales.

Esta guía explica qué es el edge computing, cómo funcionan las edge functions y cuándo usarlas.

## ¿Qué es el edge computing?

La computación en la nube tradicional ejecuta código en unos pocos centros de datos grandes. Un usuario en Tokio podría esperar 200 ms de ida y vuelta a un servidor en Virginia. El edge computing ejecuta código en decenas o cientos de ubicaciones en todo el mundo — la misma infraestructura CDN que sirve activos estáticos ahora ejecuta lógica dinámica.

**Plataformas principales:**
- **Cloudflare Workers:** se ejecuta en la red global de Cloudflare (más de 330 ciudades)
- **Vercel Edge Functions:** se ejecuta en la Edge Network de Vercel
- **Netlify Edge Functions:** se ejecuta en la red edge global de Netlify
- **AWS Lambda@Edge:** se ejecuta en ubicaciones edge de CloudFront

## Qué pueden hacer las edge functions

Las edge functions son funciones serverless que se ejecutan en ubicaciones edge. Comparten la mayoría de las características serverless — sin gestión de servidores, pago por ejecución — pero con distribución geográfica incorporada.

**Casos de uso habituales:**

- **Contenido basado en geolocalización:** sirve diferentes contenidos, precios o idiomas según la ubicación del usuario sin un viaje de ida y vuelta al servidor de origen
- **Pruebas A/B:** dirige a los usuarios a diferentes variantes del experimento en el edge, evitando el parpadeo del lado del cliente
- **Comprobaciones de autenticación:** valida tokens en el edge antes de que las peticiones lleguen a tu servidor de origen
- **Transformación de respuestas API:** modifica respuestas API (añade cabeceras, reescribe URLs, filtra campos) antes de que lleguen al cliente
- **Personalización:** inyecta contenido personalizado (recomendaciones, datos específicos del usuario) en páginas cacheadas
- **Limitación de velocidad y seguridad:** bloquea peticiones maliciosas en el edge antes de que lleguen a tu infraestructura

## Edge vs serverless: diferencias clave

| Aspecto | Funciones Serverless | Funciones Edge |
|---------|---------------------|----------------|
| Runtime | Node.js, Python, Go | V8 isolates (JavaScript, Wasm) |
| Arranque en frío | 100-500 ms | casi cero (~5 ms) |
| Límite de duración | hasta 15 minutos | 10-50 segundos |
| Ubicación | una sola región | global (muchas ubicaciones) |
| Memoria | hasta 10 GB | hasta 128 MB |

Las edge functions intercambian flexibilidad de ejecución por velocidad y distribución global. No pueden ejecutar procesos largos ni usar grandes cantidades de memoria, pero se ejecutan a la velocidad del rayo cerca de los usuarios.

## Construyendo con edge functions

Las edge functions siguen un patrón de petición-respuesta. Una redirección simple basada en geolocalización en Cloudflare Workers:

```javascript
export default {
  async fetch(request, env, ctx) {
    const country = request.cf?.country;
    if (country === "GB") {
      return Response.redirect("https://uk.example.com");
    }
    return fetch(request);
  },
};
```

Las edge functions se integran con tu framework existente. Next.js soporta `export const runtime = "edge"` a nivel de ruta, permitiendo que páginas individuales o rutas API se ejecuten en el edge.

## Cuándo no usar edge functions

Las edge functions no son adecuadas para todo. Evítalas para operaciones intensivas de base de datos (no hay conexión directa a base de datos desde el edge), cómputos intensivos de CPU y tareas de larga duración. Usa edge functions para el "primer kilómetro" del manejo de peticiones — luego pasa el trabajo complejo a los servidores de origen.

---

El edge computing cambia lo que es posible en rendimiento web. Ejecutar código en el edge reduce la latencia, mejora la experiencia de usuario y permite arquitecturas que eran impracticables hace unos años.

¿Estás construyendo una aplicación web global? En Vynta aprovechamos las edge functions para ofrecer experiencias rápidas y personalizadas a usuarios estén donde estén.
