---
title: "Storybook: documentación y desarrollo aislado de componentes"
description: "Aprende Storybook para desarrollar y documentar componentes UI de forma aislada. Integración con React, TypeScript y testing visual."
date: "2026-01-20"
tags: ["Storybook", "Componentes", "Frontend", "Documentación"]
---

## ¿Qué es Storybook?

Storybook es una herramienta de frontend para desarrollar componentes UI de forma aislada. Funciona como un catálogo interactivo donde cada componente se muestra en diferentes estados, con sus props y variantes.

## Instalación

```bash
npx storybook@latest init
```

Detecta automáticamente tu framework (React, Vue, Angular, Svelte) y configura todo.

## Creando una historia

```typescript
// Button.stories.ts
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary'] },
  },
} satisfies Meta<typeof Button>;

export default meta;

export const Primary: StoryObj = {
  args: { label: 'Click me', variant: 'primary' },
};

export const Disabled: StoryObj = {
  args: { label: 'Disabled', disabled: true },
};
```

## Addons

- **Controls**: modifica props interactivamente.
- **Actions**: registra eventos.
- **Accessibility**: auditoría de accesibilidad.
- **Measure/Outline**: herramientas de layout.
- **Theming**: soporte para múltiples temas.

## Beneficios

- Desarrollo sin depender del backend ni de la navegación.
- Documentación viva que siempre refleja el código real.
- Testing visual con Chromatic.
- Colaboración con diseñadores y stakeholders.

## Documentación

Storybook 7+ genera páginas de documentación automáticamente. Añade comentarios `@param` JSDoc para documentar props.

¿Quieres Storybook en tu proyecto? En Vynta documentamos y aislamos tus componentes UI.
