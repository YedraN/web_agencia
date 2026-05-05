# Supabase — Nova Studio

## Proyecto

| Campo         | Valor                                        |
|---------------|----------------------------------------------|
| Proyecto      | `web-agencia`                                |
| Project ID    | `koqkmhqyofhvjqtxwqrj`                       |
| Región        | `eu-west-1` (Irlanda)                        |
| URL           | `https://koqkmhqyofhvjqtxwqrj.supabase.co`  |
| Dashboard     | https://supabase.com/dashboard/project/koqkmhqyofhvjqtxwqrj |

## Credenciales públicas (seguras para el frontend)

```
NEXT_PUBLIC_SUPABASE_URL=https://koqkmhqyofhvjqtxwqrj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_ntFYhiThZUcqA7uh_knF-Q_KBlSP35y
```

## Credenciales privadas (solo backend / servidor)

Obtener en: **Dashboard → Settings → API**

- `SUPABASE_SERVICE_ROLE_KEY` — nunca exponer en el cliente

Obtener en: **Dashboard → Settings → Database → Connection string**

- `DATABASE_URL` — `postgresql+asyncpg://postgres.koqkmhqyofhvjqtxwqrj:[PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres`

## Esquema de la base de datos (v2.0)

### Tablas

| Tabla                  | Descripción                                              |
|------------------------|----------------------------------------------------------|
| `perfiles`             | Extiende `auth.users` con datos de perfil de usuario    |
| `organizaciones`       | Empresas / agencias con plan, CIF y datos fiscales      |
| `miembros_organizacion`| Relación usuario ↔ organización con roles               |
| `clientes`             | Clientes de cada organización                           |
| `proyectos`            | Proyectos con presupuesto, estado y fechas              |
| `etiquetas`            | Etiquetas de color por organización                     |
| `proyecto_etiquetas`   | Relación N:M proyectos ↔ etiquetas                      |
| `hitos_proyecto`       | Hitos/fases dentro de un proyecto                       |
| `tareas_proyecto`      | Tareas dentro de un hito (con tiempo estimado/real)     |
| `facturas`             | Facturas completas con IVA, descuento y estado          |
| `lineas_factura`       | Líneas de detalle de cada factura                       |
| `pagos`                | Pagos registrados contra una factura                    |
| `notificaciones`       | Notificaciones por usuario con severidad                |
| `registro_actividad`   | Audit log inmutable de todas las acciones               |

### Enums

| Enum               | Valores                                                                       |
|--------------------|-------------------------------------------------------------------------------|
| `plan_tipo`        | `free`, `starter`, `pro`, `enterprise`                                        |
| `rol_org`          | `owner`, `admin`, `member`, `viewer`                                          |
| `estado_proyecto`  | `draft`, `planning`, `in_progress`, `review`, `completed`, `cancelled`, `on_hold` |
| `estado_hito`      | `pending`, `in_progress`, `completed`, `blocked`                              |
| `estado_tarea`     | `todo`, `in_progress`, `done`, `blocked`, `cancelled`                         |
| `estado_factura`   | `draft`, `sent`, `viewed`, `partial`, `paid`, `overdue`, `cancelled`, `refunded` |
| `severidad_notif`  | `info`, `warning`, `critical`, `success`                                      |
| `metodo_pago`      | `bank_transfer`, `credit_card`, `paypal`, `stripe`, `cash`, `other`           |
| `moneda_tipo`      | `EUR`, `USD`, `GBP`, `MXN`, `ARS`, `COP`                                      |

### Seguridad

- **RLS activo** en todas las tablas.
- Función `mis_organizaciones()` — devuelve las orgs del usuario autenticado.
- Función `tiene_rol_en_org(org_id, roles[])` — comprueba permisos por rol.
- Trigger `on_auth_user_created` — crea automáticamente un perfil al registrar un usuario.
- Trigger `set_updated_at` — actualiza `updated_at` en cada modificación.
- Los importes monetarios se almacenan en **céntimos** (BIGINT) para evitar errores de precisión flotante.
- `registro_actividad` no tiene política de escritura directa desde el cliente: solo el backend puede insertar.

### Decisiones de diseño

- **`perfiles` separado de `auth.users`**: permite extender datos sin tocar el schema de Auth.
- **`clientes` independiente**: los clientes no son usuarios del sistema, solo contactos facturables.
- **`lineas_factura` y `pagos` separados**: soporte para facturas con múltiples conceptos y pagos parciales.
- **`tareas_proyecto`**: nivel de granularidad extra bajo los hitos para gestión tipo kanban.
- **Índices GIN (pg_trgm)** en `nombre` de `clientes` y `proyectos` para búsqueda de texto difusa.
- **Índice parcial** en `facturas.vencimiento` que excluye facturas cerradas, reduciendo su tamaño.

## Migraciones

La migración inicial está registrada en `supabase_migrations.schema_migrations` como `initial_schema`.

Para futuras migraciones, usar el MCP de Supabase con `apply_migration`.

## Pasos pendientes tras la migración

1. **Completar `DATABASE_URL`** en `backend/.env` con la contraseña de la base de datos (Dashboard → Settings → Database).
2. **Añadir `SUPABASE_SERVICE_ROLE_KEY`** en `backend/.env` (Dashboard → Settings → API).
3. **Actualizar el backend** para usar `asyncpg` en lugar de `aiosqlite`.
4. **Actualizar los modelos SQLAlchemy** para reflejar el nuevo esquema (UUIDs, enums PG, nuevas tablas).
5. **Integrar Supabase Auth** en el frontend usando `@supabase/ssr` o `@supabase/auth-helpers-nextjs`.
