---
title: "Gestión de estado en React con Zustand: una alternativa ligera"
description: "Aprende cómo Zustand simplifica la gestión de estado en aplicaciones React. Compara Zustand con Redux y Context API, y descubre ejemplos prácticos de stores, acciones y middleware."
date: "2025-07-18"
tags: ["Desarrollo Web", "React", "Frontend"]
---

La gestión de estado en React ha evolucionado significativamente. Mientras Redux sigue siendo popular y Context API resuelve casos simples, Zustand ha emergido como un punto intermedio convincente — mínimo boilerplate, excelente soporte de TypeScript y suficientemente potente para aplicaciones complejas.

Esta guía explora por qué Zustand merece tu atención y cómo usarlo eficazmente.

## El problema de la gestión de estado

La gestión de estado integrada de React funciona bien para el estado local de componentes. Pero a medida que las aplicaciones crecen, necesitas estado compartido — datos que múltiples componentes necesitan acceder y actualizar.

**Context API** soluciona esto pero tiene problemas de rendimiento. Todos los consumidores se re-renderizan cuando cualquier valor del contexto cambia, independientemente de si su parte específica de datos cambió.

**Redux** es potente pero verboso. Actions, reducers, dispatch, connect, selectors — el boilerplate se acumula. Los recién llegados se enfrentan a una curva de aprendizaje pronunciada.

**Zustand** ofrece un modelo más simple: un store mínimo con acceso basado en hooks.

## Creando un store con Zustand

Un store de Zustand es una función simple que devuelve un objeto. Sin providers, sin reducers, sin tipos de acción:

```typescript
import { create } from "zustand";

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  total: () => number;
}

const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((i) => i.id !== id),
  })),
  total: () => get().items.reduce((sum, i) => sum + i.price, 0),
}));
```

Eso es todo el store. Sin proveedor envolviendo tu app, sin constantes de acción, sin dispatch.

## Usando el store en componentes

Los stores de Zustand son hooks de React. Los componentes se suscriben al store y obtienen los datos que necesitan:

```typescript
function CartSummary() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total());

  return (
    <div>
      <p>{items.length} artículos en el carrito</p>
      <p>Total: ${total}</p>
    </div>
  );
}
```

La función selectora (`(state) => state.items`) controla los re-renderizados. Los componentes solo se re-renderizan cuando la porción seleccionada cambia — evitando el problema de re-renderizado de Context API.

## Middleware y patrones avanzados

Zustand soporta middleware para necesidades comunes:

- **persist**: guarda y restaura el estado desde localStorage o AsyncStorage
- **immer**: permite actualizaciones de estado con sintaxis mutable usando Immer
- **devtools**: se conecta a Redux DevTools para depuración
- **subscribeWithSelector**: suscripciones detalladas fuera de componentes React

```typescript
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }),
    }),
    { name: "app-settings" }
  )
);
```

## Zustand vs alternativas

| Característica | Zustand | Redux Toolkit | Context API |
|---------------|---------|---------------|-------------|
| Boilerplate | Mínimo | Moderado | Mínimo |
| Rendimiento | Excelente (selectores) | Excelente | Malo (re-renderizados) |
| TypeScript | Integrado | Bueno | Bueno |
| Tamaño | ~1 KB | ~11 KB | 0 (integrado) |
| DevTools | Vía middleware | Integrado | Manual |

## Cuándo usar Zustand

Zustand es ideal para aplicaciones de complejidad media donde Context API se queda corto pero Redux parece excesivo. Carritos de compra, preferencias de usuario, sistemas de notificaciones y flujos de datos en tiempo real son opciones naturales.

Para casos muy simples, el estado local o Context son suficientes. Para aplicaciones empresariales masivas con lógica de estado compleja, la estructura y el ecosistema de middleware de Redux Toolkit pueden ser preferibles.

---

La gestión de estado no tiene por qué ser complicada. Zustand demuestra que una API simple y bien diseñada puede manejar requisitos complejos sin tanto ceremonial.

¿Estás construyendo una aplicación React y eligiendo tu enfoque de gestión de estado? En Vynta usamos Zustand, Redux Toolkit o Context según las necesidades del proyecto — eligiendo siempre la herramienta adecuada para cada trabajo.
