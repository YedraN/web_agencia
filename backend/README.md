# Web Agencia Backend (Python + FastAPI)

Backend construido con Python, FastAPI y MySQL.

## Estructura

```
backend/
├── app/
│   ├── models/          # Modelos SQLAlchemy
│   ├── schemas/         # Pydantic schemas (validación)
│   ├── routers/         # Endpoints API
│   ├── services/        # Lógica de negocio
│   ├── utils/           # Utilidades (JWT, bcrypt, deps)
│   ├── config.py        # Configuración
│   ├── database.py      # Conexión a BD
│   └── main.py          # Punto de entrada
├── requirements.txt
├── schema.sql           # Script SQL para crear tablas
└── .env.example         # Variables de entorno de ejemplo
```

## Setup

1. **Crear entorno virtual:**
   ```bash
   cd backend
   python -m venv venv
   # Windows:
   venv\Scripts\activate
   # Mac/Linux:
   source venv/bin/activate
   ```

2. **Instalar dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Crear base de datos MySQL:**
   ```bash
   mysql -u root -p < schema.sql
   ```
   O ejecuta el SQL directamente en tu cliente MySQL.

4. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   # Editar .env con tus credenciales
   ```

5. **Iniciar servidor:**
   ```bash
   python app/main.py
   ```
   O:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

## Endpoints

- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/health` - Health check
- `GET /docs` - Documentación Swagger UI

## Autenticación

El sistema usa JWT con cookies httpOnly. Al hacer login/register, se setean automáticamente las cookies:
- `wa_access_token` - Válido por 1 hora
- `wa_refresh_token` - Válido por 30 días

Para endpoints protegidos, usar el header:
```
Authorization: Bearer <token>
```
