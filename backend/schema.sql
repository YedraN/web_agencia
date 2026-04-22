-- Schema SQLite en español para la base de datos de la agencia web

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id TEXT PRIMARY KEY,
    correo TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    nombre_completo TEXT,
    avatar_url TEXT,
    activo BOOLEAN DEFAULT 1,
    verificado BOOLEAN DEFAULT 0,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de organizaciones
CREATE TABLE IF NOT EXISTS organizaciones (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    logo_url TEXT,
    plan TEXT DEFAULT "free",
    activo BOOLEAN DEFAULT 1,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de miembros de organización
CREATE TABLE IF NOT EXISTS miembros_organizacion (
    id TEXT PRIMARY KEY,
    organizacion_id TEXT NOT NULL REFERENCES organizaciones(id) ON DELETE CASCADE,
    usuario_id TEXT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    rol TEXT DEFAULT "member",
    aceptado_en TIMESTAMP,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de proyectos
CREATE TABLE IF NOT EXISTS proyectos (
    id TEXT PRIMARY KEY,
    organizacion_id TEXT NOT NULL REFERENCES organizaciones(id) ON DELETE CASCADE,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    estado TEXT DEFAULT "draft",
    presupuesto_cents INTEGER DEFAULT 0,
    precio_cents INTEGER DEFAULT 0,
    inicio_en TIMESTAMP,
    deadline_at TIMESTAMP,
    completado_en TIMESTAMP,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de hitos de proyecto
CREATE TABLE IF NOT EXISTS hitos_proyecto (
    id TEXT PRIMARY KEY,
    proyecto_id TEXT NOT NULL REFERENCES proyectos(id) ON DELETE CASCADE,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    fecha_vencimiento TIMESTAMP,
    completado_en TIMESTAMP,
    estado TEXT DEFAULT "pending",
    posicion INTEGER DEFAULT 0,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de facturas
CREATE TABLE IF NOT EXISTS facturas (
    id TEXT PRIMARY KEY,
    organizacion_id TEXT NOT NULL REFERENCES organizaciones(id) ON DELETE CASCADE,
    proyecto_id TEXT REFERENCES proyectos(id),
    numero TEXT NOT NULL,
    estado TEXT DEFAULT "draft",
    subtotal_cents INTEGER DEFAULT 0,
    tax_cents INTEGER DEFAULT 0,
    total_cents INTEGER DEFAULT 0,
    pagado_cents INTEGER DEFAULT 0,
    moneda TEXT DEFAULT "EUR",
    emitida_en TIMESTAMP,
    vencimiento TIMESTAMP,
    pagada_en TIMESTAMP,
    ruta_pdf TEXT,
    notas TEXT,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de registro de actividad
CREATE TABLE IF NOT EXISTS registro_actividad (
    id TEXT PRIMARY KEY,
    organizacion_id TEXT NOT NULL REFERENCES organizaciones(id) ON DELETE CASCADE,
    usuario_id TEXT REFERENCES usuarios(id),
    accion TEXT NOT NULL,
    tipo_recurso TEXT NOT NULL,
    recurso_id TEXT,
    payload JSON,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
