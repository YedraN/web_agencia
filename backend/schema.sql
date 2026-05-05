-- ============================================================
-- Nova Studio — Web Agency Management System
-- PostgreSQL / Supabase Schema v2.0
-- Base de datos: koqkmhqyofhvjqtxwqrj (eu-west-1)
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- búsqueda de texto difusa

-- ── Enums ──────────────────────────────────────────────────────
CREATE TYPE plan_tipo        AS ENUM ('free', 'starter', 'pro', 'enterprise');
CREATE TYPE rol_org          AS ENUM ('owner', 'admin', 'member', 'viewer');
CREATE TYPE estado_proyecto  AS ENUM ('draft', 'planning', 'in_progress', 'review', 'completed', 'cancelled', 'on_hold');
CREATE TYPE estado_hito      AS ENUM ('pending', 'in_progress', 'completed', 'blocked');
CREATE TYPE estado_tarea     AS ENUM ('todo', 'in_progress', 'done', 'blocked', 'cancelled');
CREATE TYPE estado_factura   AS ENUM ('draft', 'sent', 'viewed', 'partial', 'paid', 'overdue', 'cancelled', 'refunded');
CREATE TYPE severidad_notif  AS ENUM ('info', 'warning', 'critical', 'success');
CREATE TYPE metodo_pago      AS ENUM ('bank_transfer', 'credit_card', 'paypal', 'stripe', 'cash', 'other');
CREATE TYPE moneda_tipo      AS ENUM ('EUR', 'USD', 'GBP', 'MXN', 'ARS', 'COP');

-- ── Función de actualización automática updated_at ─────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ── 1. Perfiles (extiende auth.users de Supabase) ──────────────
-- Se crea automáticamente con el trigger on_auth_user_created
CREATE TABLE perfiles (
  id              UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre_completo TEXT,
  avatar_url      TEXT,
  bio             TEXT,
  telefono        TEXT,
  zona_horaria    TEXT        NOT NULL DEFAULT 'Europe/Madrid',
  idioma          TEXT        NOT NULL DEFAULT 'es',
  activo          BOOLEAN     NOT NULL DEFAULT TRUE,
  verificado      BOOLEAN     NOT NULL DEFAULT FALSE,
  ultimo_acceso   TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_perfiles_updated_at
  BEFORE UPDATE ON perfiles FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Auto-crear perfil al registrar usuario en Supabase Auth
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.perfiles (id, nombre_completo, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nombre_completo', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ── 2. Organizaciones ──────────────────────────────────────────
CREATE TABLE organizaciones (
  id            UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre        TEXT      NOT NULL,
  slug          TEXT      NOT NULL UNIQUE,
  logo_url      TEXT,
  website       TEXT,
  descripcion   TEXT,
  plan          plan_tipo NOT NULL DEFAULT 'free',
  nif_cif       TEXT,                             -- CIF/NIF para facturación
  direccion     TEXT,
  ciudad        TEXT,
  pais          TEXT      NOT NULL DEFAULT 'ES',
  codigo_postal TEXT,
  activo        BOOLEAN   NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_organizaciones_slug ON organizaciones(slug);
CREATE TRIGGER trg_organizaciones_updated_at
  BEFORE UPDATE ON organizaciones FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── 3. Miembros de organización ────────────────────────────────
CREATE TABLE miembros_organizacion (
  id              UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacion_id UUID    NOT NULL REFERENCES organizaciones(id) ON DELETE CASCADE,
  usuario_id      UUID    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rol             rol_org NOT NULL DEFAULT 'member',
  invitado_por    UUID    REFERENCES auth.users(id),
  aceptado_en     TIMESTAMPTZ,                    -- NULL = invitación pendiente
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(organizacion_id, usuario_id)
);

CREATE INDEX idx_miembros_usuario ON miembros_organizacion(usuario_id);
CREATE INDEX idx_miembros_org     ON miembros_organizacion(organizacion_id);
CREATE TRIGGER trg_miembros_updated_at
  BEFORE UPDATE ON miembros_organizacion FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── 4. Clientes ────────────────────────────────────────────────
CREATE TABLE clientes (
  id              UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacion_id UUID    NOT NULL REFERENCES organizaciones(id) ON DELETE CASCADE,
  nombre          TEXT    NOT NULL,
  empresa         TEXT,
  correo          TEXT,
  telefono        TEXT,
  nif_cif         TEXT,
  direccion       TEXT,
  ciudad          TEXT,
  pais            TEXT    NOT NULL DEFAULT 'ES',
  codigo_postal   TEXT,
  notas           TEXT,
  activo          BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_clientes_org    ON clientes(organizacion_id);
CREATE INDEX idx_clientes_nombre ON clientes USING gin(nombre gin_trgm_ops);  -- búsqueda difusa
CREATE TRIGGER trg_clientes_updated_at
  BEFORE UPDATE ON clientes FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── 5. Proyectos ───────────────────────────────────────────────
CREATE TABLE proyectos (
  id                UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacion_id   UUID            NOT NULL REFERENCES organizaciones(id) ON DELETE CASCADE,
  cliente_id        UUID            REFERENCES clientes(id) ON DELETE SET NULL,
  responsable_id    UUID            REFERENCES auth.users(id) ON DELETE SET NULL,
  nombre            TEXT            NOT NULL,
  descripcion       TEXT,
  estado            estado_proyecto NOT NULL DEFAULT 'draft',
  presupuesto_cents BIGINT          NOT NULL DEFAULT 0 CHECK (presupuesto_cents >= 0),
  precio_cents      BIGINT          NOT NULL DEFAULT 0 CHECK (precio_cents >= 0),
  moneda            moneda_tipo     NOT NULL DEFAULT 'EUR',
  inicio_en         TIMESTAMPTZ,
  deadline_at       TIMESTAMPTZ,
  completado_en     TIMESTAMPTZ,
  url_repositorio   TEXT,
  url_produccion    TEXT,
  created_at        TIMESTAMPTZ     NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ     NOT NULL DEFAULT now()
);

CREATE INDEX idx_proyectos_org     ON proyectos(organizacion_id);
CREATE INDEX idx_proyectos_cliente ON proyectos(cliente_id);
CREATE INDEX idx_proyectos_estado  ON proyectos(estado);
CREATE INDEX idx_proyectos_nombre  ON proyectos USING gin(nombre gin_trgm_ops);
CREATE TRIGGER trg_proyectos_updated_at
  BEFORE UPDATE ON proyectos FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── 6. Etiquetas + tabla de relación ──────────────────────────
CREATE TABLE etiquetas (
  id              UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacion_id UUID    NOT NULL REFERENCES organizaciones(id) ON DELETE CASCADE,
  nombre          TEXT    NOT NULL,
  color           TEXT    NOT NULL DEFAULT '#6366f1',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(organizacion_id, nombre)
);

CREATE TABLE proyecto_etiquetas (
  proyecto_id UUID NOT NULL REFERENCES proyectos(id) ON DELETE CASCADE,
  etiqueta_id UUID NOT NULL REFERENCES etiquetas(id) ON DELETE CASCADE,
  PRIMARY KEY (proyecto_id, etiqueta_id)
);

-- ── 7. Hitos de proyecto ───────────────────────────────────────
CREATE TABLE hitos_proyecto (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  proyecto_id   UUID        NOT NULL REFERENCES proyectos(id) ON DELETE CASCADE,
  nombre        TEXT        NOT NULL,
  descripcion   TEXT,
  estado        estado_hito NOT NULL DEFAULT 'pending',
  posicion      SMALLINT    NOT NULL DEFAULT 0,
  fecha_inicio  TIMESTAMPTZ,
  fecha_fin     TIMESTAMPTZ,
  completado_en TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_hitos_proyecto ON hitos_proyecto(proyecto_id, posicion);
CREATE TRIGGER trg_hitos_updated_at
  BEFORE UPDATE ON hitos_proyecto FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── 8. Tareas de proyecto ──────────────────────────────────────
CREATE TABLE tareas_proyecto (
  id                UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  hito_id           UUID         NOT NULL REFERENCES hitos_proyecto(id) ON DELETE CASCADE,
  asignado_a        UUID         REFERENCES auth.users(id) ON DELETE SET NULL,
  titulo            TEXT         NOT NULL,
  descripcion       TEXT,
  estado            estado_tarea NOT NULL DEFAULT 'todo',
  prioridad         SMALLINT     NOT NULL DEFAULT 2 CHECK (prioridad BETWEEN 1 AND 5),
  posicion          SMALLINT     NOT NULL DEFAULT 0,
  fecha_inicio      TIMESTAMPTZ,
  fecha_fin         TIMESTAMPTZ,
  completado_en     TIMESTAMPTZ,
  tiempo_estimado_h NUMERIC(6,2),  -- horas estimadas
  tiempo_real_h     NUMERIC(6,2),  -- horas reales registradas
  created_at        TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_tareas_hito     ON tareas_proyecto(hito_id, posicion);
CREATE INDEX idx_tareas_asignado ON tareas_proyecto(asignado_a);
CREATE TRIGGER trg_tareas_updated_at
  BEFORE UPDATE ON tareas_proyecto FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── 9. Facturas ────────────────────────────────────────────────
-- Todos los importes se almacenan en céntimos para evitar problemas de precisión
CREATE TABLE facturas (
  id              UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacion_id UUID           NOT NULL REFERENCES organizaciones(id) ON DELETE CASCADE,
  cliente_id      UUID           REFERENCES clientes(id) ON DELETE SET NULL,
  proyecto_id     UUID           REFERENCES proyectos(id) ON DELETE SET NULL,
  numero          TEXT           NOT NULL,
  estado          estado_factura NOT NULL DEFAULT 'draft',
  subtotal_cents  BIGINT         NOT NULL DEFAULT 0 CHECK (subtotal_cents >= 0),
  descuento_cents BIGINT         NOT NULL DEFAULT 0 CHECK (descuento_cents >= 0),
  tax_cents       BIGINT         NOT NULL DEFAULT 0 CHECK (tax_cents >= 0),
  total_cents     BIGINT         NOT NULL DEFAULT 0 CHECK (total_cents >= 0),
  pagado_cents    BIGINT         NOT NULL DEFAULT 0 CHECK (pagado_cents >= 0),
  moneda          moneda_tipo    NOT NULL DEFAULT 'EUR',
  porcentaje_iva  NUMERIC(5,2)   NOT NULL DEFAULT 21.00,
  emitida_en      TIMESTAMPTZ,
  vencimiento     TIMESTAMPTZ,
  pagada_en       TIMESTAMPTZ,
  ruta_pdf        TEXT,
  notas           TEXT,
  terminos_pago   TEXT,
  created_at      TIMESTAMPTZ    NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ    NOT NULL DEFAULT now(),
  UNIQUE(organizacion_id, numero)
);

CREATE INDEX idx_facturas_org         ON facturas(organizacion_id);
CREATE INDEX idx_facturas_cliente     ON facturas(cliente_id);
CREATE INDEX idx_facturas_estado      ON facturas(estado);
CREATE INDEX idx_facturas_vencimiento ON facturas(vencimiento)
  WHERE estado NOT IN ('paid', 'cancelled', 'refunded');  -- índice parcial para facturas activas
CREATE TRIGGER trg_facturas_updated_at
  BEFORE UPDATE ON facturas FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── 10. Líneas de factura ──────────────────────────────────────
CREATE TABLE lineas_factura (
  id                UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  factura_id        UUID         NOT NULL REFERENCES facturas(id) ON DELETE CASCADE,
  descripcion       TEXT         NOT NULL,
  cantidad          NUMERIC(10,3) NOT NULL DEFAULT 1 CHECK (cantidad > 0),
  precio_unit_cents BIGINT       NOT NULL DEFAULT 0 CHECK (precio_unit_cents >= 0),
  descuento_pct     NUMERIC(5,2) NOT NULL DEFAULT 0 CHECK (descuento_pct BETWEEN 0 AND 100),
  total_cents       BIGINT       NOT NULL DEFAULT 0,
  posicion          SMALLINT     NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_lineas_factura ON lineas_factura(factura_id, posicion);

-- ── 11. Pagos ──────────────────────────────────────────────────
CREATE TABLE pagos (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  factura_id    UUID        NOT NULL REFERENCES facturas(id) ON DELETE CASCADE,
  importe_cents BIGINT      NOT NULL CHECK (importe_cents > 0),
  moneda        moneda_tipo NOT NULL DEFAULT 'EUR',
  metodo        metodo_pago NOT NULL DEFAULT 'bank_transfer',
  referencia    TEXT,
  notas         TEXT,
  pagado_en     TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_pagos_factura ON pagos(factura_id);

-- ── 12. Notificaciones ─────────────────────────────────────────
CREATE TABLE notificaciones (
  id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacion_id UUID            NOT NULL REFERENCES organizaciones(id) ON DELETE CASCADE,
  usuario_id      UUID            NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  titulo          TEXT            NOT NULL,
  mensaje         TEXT            NOT NULL,
  severidad       severidad_notif NOT NULL DEFAULT 'info',
  leida           BOOLEAN         NOT NULL DEFAULT FALSE,
  url_accion      TEXT,
  tipo_recurso    TEXT,
  recurso_id      UUID,
  created_at      TIMESTAMPTZ     NOT NULL DEFAULT now()
);

CREATE INDEX idx_notif_usuario ON notificaciones(usuario_id, leida);
CREATE INDEX idx_notif_org     ON notificaciones(organizacion_id);

-- ── 13. Registro de actividad (audit log) ─────────────────────
CREATE TABLE registro_actividad (
  id              UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacion_id UUID    NOT NULL REFERENCES organizaciones(id) ON DELETE CASCADE,
  usuario_id      UUID    REFERENCES auth.users(id) ON DELETE SET NULL,
  accion          TEXT    NOT NULL,
  tipo_recurso    TEXT    NOT NULL,
  recurso_id      UUID,
  payload         JSONB,
  ip_address      INET,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_actividad_org     ON registro_actividad(organizacion_id, created_at DESC);
CREATE INDEX idx_actividad_usuario ON registro_actividad(usuario_id);
CREATE INDEX idx_actividad_recurso ON registro_actividad(tipo_recurso, recurso_id);

-- ── Row Level Security ─────────────────────────────────────────

-- Devuelve los IDs de organización a los que pertenece el usuario actual
CREATE OR REPLACE FUNCTION mis_organizaciones()
RETURNS SETOF UUID LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT organizacion_id FROM miembros_organizacion
  WHERE usuario_id = auth.uid() AND aceptado_en IS NOT NULL;
$$;

-- Comprueba si el usuario actual tiene alguno de los roles indicados en la org
CREATE OR REPLACE FUNCTION tiene_rol_en_org(org_id UUID, roles rol_org[])
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM miembros_organizacion
    WHERE organizacion_id = org_id
      AND usuario_id = auth.uid()
      AND rol = ANY(roles)
      AND aceptado_en IS NOT NULL
  );
$$;

-- Activar RLS en todas las tablas
ALTER TABLE perfiles              ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizaciones        ENABLE ROW LEVEL SECURITY;
ALTER TABLE miembros_organizacion ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes              ENABLE ROW LEVEL SECURITY;
ALTER TABLE proyectos             ENABLE ROW LEVEL SECURITY;
ALTER TABLE etiquetas             ENABLE ROW LEVEL SECURITY;
ALTER TABLE proyecto_etiquetas    ENABLE ROW LEVEL SECURITY;
ALTER TABLE hitos_proyecto        ENABLE ROW LEVEL SECURITY;
ALTER TABLE tareas_proyecto       ENABLE ROW LEVEL SECURITY;
ALTER TABLE facturas              ENABLE ROW LEVEL SECURITY;
ALTER TABLE lineas_factura        ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagos                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE notificaciones        ENABLE ROW LEVEL SECURITY;
ALTER TABLE registro_actividad    ENABLE ROW LEVEL SECURITY;

-- Políticas: perfiles (solo el propio)
CREATE POLICY "perfiles: ver propio"    ON perfiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "perfiles: editar propio" ON perfiles FOR UPDATE USING (id = auth.uid());

-- Políticas: organizaciones
CREATE POLICY "orgs: ver"    ON organizaciones FOR SELECT USING (id IN (SELECT mis_organizaciones()));
CREATE POLICY "orgs: editar" ON organizaciones FOR UPDATE USING (tiene_rol_en_org(id, ARRAY['owner','admin']::rol_org[]));
CREATE POLICY "orgs: crear"  ON organizaciones FOR INSERT WITH CHECK (true);
CREATE POLICY "orgs: borrar" ON organizaciones FOR DELETE USING (tiene_rol_en_org(id, ARRAY['owner']::rol_org[]));

-- Políticas: miembros
CREATE POLICY "miembros: ver"    ON miembros_organizacion FOR SELECT USING (organizacion_id IN (SELECT mis_organizaciones()));
CREATE POLICY "miembros: crear"  ON miembros_organizacion FOR INSERT WITH CHECK (tiene_rol_en_org(organizacion_id, ARRAY['owner','admin']::rol_org[]));
CREATE POLICY "miembros: editar" ON miembros_organizacion FOR UPDATE USING (tiene_rol_en_org(organizacion_id, ARRAY['owner','admin']::rol_org[]));
CREATE POLICY "miembros: borrar" ON miembros_organizacion FOR DELETE USING (tiene_rol_en_org(organizacion_id, ARRAY['owner']::rol_org[]));

-- Políticas: clientes
CREATE POLICY "clientes: ver"    ON clientes FOR SELECT USING (organizacion_id IN (SELECT mis_organizaciones()));
CREATE POLICY "clientes: crear"  ON clientes FOR INSERT WITH CHECK (tiene_rol_en_org(organizacion_id, ARRAY['owner','admin','member']::rol_org[]));
CREATE POLICY "clientes: editar" ON clientes FOR UPDATE USING (tiene_rol_en_org(organizacion_id, ARRAY['owner','admin','member']::rol_org[]));
CREATE POLICY "clientes: borrar" ON clientes FOR DELETE USING (tiene_rol_en_org(organizacion_id, ARRAY['owner','admin']::rol_org[]));

-- Políticas: proyectos
CREATE POLICY "proyectos: ver"    ON proyectos FOR SELECT USING (organizacion_id IN (SELECT mis_organizaciones()));
CREATE POLICY "proyectos: crear"  ON proyectos FOR INSERT WITH CHECK (tiene_rol_en_org(organizacion_id, ARRAY['owner','admin','member']::rol_org[]));
CREATE POLICY "proyectos: editar" ON proyectos FOR UPDATE USING (tiene_rol_en_org(organizacion_id, ARRAY['owner','admin','member']::rol_org[]));
CREATE POLICY "proyectos: borrar" ON proyectos FOR DELETE USING (tiene_rol_en_org(organizacion_id, ARRAY['owner','admin']::rol_org[]));

-- Políticas: etiquetas
CREATE POLICY "etiquetas: ver"    ON etiquetas FOR SELECT USING (organizacion_id IN (SELECT mis_organizaciones()));
CREATE POLICY "etiquetas: crear"  ON etiquetas FOR INSERT WITH CHECK (tiene_rol_en_org(organizacion_id, ARRAY['owner','admin','member']::rol_org[]));
CREATE POLICY "etiquetas: borrar" ON etiquetas FOR DELETE USING (tiene_rol_en_org(organizacion_id, ARRAY['owner','admin']::rol_org[]));

-- Políticas: proyecto_etiquetas
CREATE POLICY "proy_etiq: ver"    ON proyecto_etiquetas FOR SELECT USING (proyecto_id IN (SELECT id FROM proyectos WHERE organizacion_id IN (SELECT mis_organizaciones())));
CREATE POLICY "proy_etiq: crear"  ON proyecto_etiquetas FOR INSERT WITH CHECK (proyecto_id IN (SELECT id FROM proyectos WHERE organizacion_id IN (SELECT mis_organizaciones())));
CREATE POLICY "proy_etiq: borrar" ON proyecto_etiquetas FOR DELETE USING (proyecto_id IN (SELECT id FROM proyectos WHERE organizacion_id IN (SELECT mis_organizaciones())));

-- Políticas: hitos
CREATE POLICY "hitos: ver"    ON hitos_proyecto FOR SELECT USING (proyecto_id IN (SELECT id FROM proyectos WHERE organizacion_id IN (SELECT mis_organizaciones())));
CREATE POLICY "hitos: crear"  ON hitos_proyecto FOR INSERT WITH CHECK (proyecto_id IN (SELECT id FROM proyectos WHERE organizacion_id IN (SELECT mis_organizaciones())));
CREATE POLICY "hitos: editar" ON hitos_proyecto FOR UPDATE USING (proyecto_id IN (SELECT id FROM proyectos WHERE organizacion_id IN (SELECT mis_organizaciones())));
CREATE POLICY "hitos: borrar" ON hitos_proyecto FOR DELETE USING (proyecto_id IN (SELECT id FROM proyectos WHERE organizacion_id IN (SELECT mis_organizaciones())));

-- Políticas: tareas
CREATE POLICY "tareas: ver"    ON tareas_proyecto FOR SELECT USING (hito_id IN (SELECT h.id FROM hitos_proyecto h JOIN proyectos p ON p.id = h.proyecto_id WHERE p.organizacion_id IN (SELECT mis_organizaciones())));
CREATE POLICY "tareas: crear"  ON tareas_proyecto FOR INSERT WITH CHECK (hito_id IN (SELECT h.id FROM hitos_proyecto h JOIN proyectos p ON p.id = h.proyecto_id WHERE p.organizacion_id IN (SELECT mis_organizaciones())));
CREATE POLICY "tareas: editar" ON tareas_proyecto FOR UPDATE USING (hito_id IN (SELECT h.id FROM hitos_proyecto h JOIN proyectos p ON p.id = h.proyecto_id WHERE p.organizacion_id IN (SELECT mis_organizaciones())));
CREATE POLICY "tareas: borrar" ON tareas_proyecto FOR DELETE USING (hito_id IN (SELECT h.id FROM hitos_proyecto h JOIN proyectos p ON p.id = h.proyecto_id WHERE p.organizacion_id IN (SELECT mis_organizaciones())));

-- Políticas: facturas
CREATE POLICY "facturas: ver"    ON facturas FOR SELECT USING (organizacion_id IN (SELECT mis_organizaciones()));
CREATE POLICY "facturas: crear"  ON facturas FOR INSERT WITH CHECK (tiene_rol_en_org(organizacion_id, ARRAY['owner','admin','member']::rol_org[]));
CREATE POLICY "facturas: editar" ON facturas FOR UPDATE USING (tiene_rol_en_org(organizacion_id, ARRAY['owner','admin','member']::rol_org[]));
CREATE POLICY "facturas: borrar" ON facturas FOR DELETE USING (tiene_rol_en_org(organizacion_id, ARRAY['owner','admin']::rol_org[]));

-- Políticas: lineas_factura
CREATE POLICY "lineas: ver"    ON lineas_factura FOR SELECT USING (factura_id IN (SELECT id FROM facturas WHERE organizacion_id IN (SELECT mis_organizaciones())));
CREATE POLICY "lineas: crear"  ON lineas_factura FOR INSERT WITH CHECK (factura_id IN (SELECT id FROM facturas WHERE organizacion_id IN (SELECT mis_organizaciones())));
CREATE POLICY "lineas: editar" ON lineas_factura FOR UPDATE USING (factura_id IN (SELECT id FROM facturas WHERE organizacion_id IN (SELECT mis_organizaciones())));
CREATE POLICY "lineas: borrar" ON lineas_factura FOR DELETE USING (factura_id IN (SELECT id FROM facturas WHERE organizacion_id IN (SELECT mis_organizaciones())));

-- Políticas: pagos
CREATE POLICY "pagos: ver"    ON pagos FOR SELECT USING (factura_id IN (SELECT id FROM facturas WHERE organizacion_id IN (SELECT mis_organizaciones())));
CREATE POLICY "pagos: crear"  ON pagos FOR INSERT WITH CHECK (factura_id IN (SELECT id FROM facturas WHERE tiene_rol_en_org(organizacion_id, ARRAY['owner','admin','member']::rol_org[])));
CREATE POLICY "pagos: borrar" ON pagos FOR DELETE USING (factura_id IN (SELECT id FROM facturas WHERE tiene_rol_en_org(organizacion_id, ARRAY['owner','admin']::rol_org[])));

-- Políticas: notificaciones (solo el propio usuario)
CREATE POLICY "notif: ver"    ON notificaciones FOR SELECT USING (usuario_id = auth.uid());
CREATE POLICY "notif: editar" ON notificaciones FOR UPDATE USING (usuario_id = auth.uid());
CREATE POLICY "notif: borrar" ON notificaciones FOR DELETE USING (usuario_id = auth.uid());

-- Políticas: registro_actividad (lectura para miembros de la org)
CREATE POLICY "actividad: ver" ON registro_actividad FOR SELECT
  USING (organizacion_id IN (SELECT mis_organizaciones()));
