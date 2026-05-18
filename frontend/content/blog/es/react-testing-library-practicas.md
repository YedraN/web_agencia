---
title: "React Testing Library: buenas prácticas para testear componentes"
description: "Aprende las mejores prácticas de React Testing Library para testear componentes React de forma efectiva, centrándote en el comportamiento del usuario."
date: "2025-08-15"
tags: ["React", "Testing", "React Testing Library", "Frontend"]
---

## Filosofía de RTL

React Testing Library (RTL) se enfoca en testear el comportamiento del usuario, no los detalles de implementación. Si tu test rompe al cambiar el nombre de una prop, estás testeando implementación. RTL fomenta tests que resisten refactors.

## Queries accesibles

Prefiere queries que se parecen a cómo el usuario encuentra elementos: `getByRole`, `getByLabelText`, `getByPlaceholderText`, `getByText`. Evita `testId` a menos que sea estrictamente necesario.

```typescript
render(<LoginForm />);
const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
const emailInput = screen.getByLabelText(/correo/i);
```

## userEvent vs fireEvent

`fireEvent` dispara eventos directamente. `userEvent` simula interacciones reales (clics, escritura, navegación). Siempre prefiere `userEvent`.

```typescript
import userEvent from '@testing-library/user-event';

await userEvent.type(emailInput, 'test@test.com');
await userEvent.click(submitButton);
```

## Esperar cambios asíncronos

Usa `waitFor` o `findBy*` para elementos que aparecen después de operaciones asíncronas.

## Lo que NO debes testear

- Estilos inline y clases CSS (son de implementación).
- Estado interno de componentes (prueba el resultado en la UI).
- Métodos privados (son detalle interno).

¿Quieres mejorar el testing de tus componentes React? En Vynta escribimos tests robustos con RTL.
