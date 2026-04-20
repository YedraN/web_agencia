# Backend

Backend base para `web_agencia`, construido con Fastify + TypeScript + Supabase.

## Qué incluye

- servidor Fastify con TypeScript
- configuración por variables de entorno
- clientes de Supabase para uso público y service role
- middleware de autenticación basado en access token / cookies
- rutas alineadas con el frontend actual
- validación de payloads con Zod

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm start`

## Variables de entorno

Copia `.env.example` a `.env` y completa:

- `NODE_ENV`
- `PORT`
- `HOST`
- `TRUST_PROXY`
- `ALLOWED_ORIGINS`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PUBLIC_ORGANIZATION_ID`
- `AUTH_ACCESS_COOKIE`
- `AUTH_REFRESH_COOKIE`
- `AUTH_COOKIE_SECURE`
- `AUTH_COOKIE_SAME_SITE`
- `AUTH_COOKIE_DOMAIN`

## Endpoints implementados

- `GET /health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/users/me`
- `PATCH /api/users/me`
- `POST /api/contact`
- `POST /api/bookings`
- `GET /api/dashboard/stats`
- `GET /api/automations`
- `GET /api/automations/:id`
- `PATCH /api/automations/:id/status`
- `PATCH /api/automations/:id/config`
- `GET /api/executions`
- `GET /api/notifications`
- `PATCH /api/notifications/:id/read`
- `PATCH /api/notifications/read-all`

## Suposiciones importantes

1. `PUBLIC_ORGANIZATION_ID` representa la organización interna de la agencia, para capturar leads y bookings públicos.
2. El frontend todavía tiene mocks en varias pantallas, así que el backend se ha alineado sobre todo con `frontend/src/lib/api.ts` y con los formularios públicos.
3. Hay pequeñas diferencias entre frontend y schema:
   - `organizations.plan` usa `free` en BD pero el frontend habla de `Starter | Pro | Enterprise`, así que el backend mapea `free` a `Starter`.
   - `automations.status` y `automation_runs.status` parecen tener más estados en BD que en frontend, así que el backend normaliza esos valores.
   - `leads` no tiene campos explícitos para `service` y `budget` del formulario público, así que se guardan en `source`, `notes` y `tags`.
4. `webhook_secret` existe en el schema de contexto, pero este backend no lo expone ni lo gestiona todavía.
5. La autenticación se apoya en Supabase Auth. Si quieres sesiones 100% cerradas con SSR/cookies finas, luego conviene definir el flujo exacto con el frontend.

## Producción y despliegue

Se ha dejado preparado para desplegarlo fuera de local con:

- `Dockerfile`
- `.dockerignore`
- `railway.json`
- endpoint de salud en `/health`
- cabeceras de seguridad con Helmet
- rate limiting básico para auth y formularios públicos
- CORS basado en lista de orígenes permitidos
- cookies configurables para entornos con frontend y backend en dominios o subdominios distintos

Recomendación de despliegue:

- frontend en Vercel
- backend en Railway
- backend con dominio tipo `api.tudominio.com`
- frontend con `tudominio.com`
- `ALLOWED_ORIGINS` apuntando al frontend final
- `AUTH_COOKIE_SECURE=true` en producción
- si usas subdominios, revisar `AUTH_COOKIE_DOMAIN` y `AUTH_COOKIE_SAME_SITE`

## Siguiente paso recomendado

Conectar el frontend a estas rutas, sustituir los mocks del dashboard por llamadas reales y terminar de fijar el flujo final de auth para producción.
