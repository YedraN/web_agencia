# TAREAS VYNTA - PRIORIZADO PARA TRELLO

---

## 🔴 CRÍTICA (Hacer AHORA)

### 1. Regenerar y Asegurar JWT Secret Key
**Prioridad:** CRÍTICA  
**Estimación:** 1-2 horas  
**Descripción:**
- La clave JWT actual está commitida en .env en el repositorio público
- Generar nueva clave segura (usar `secrets.token_urlsafe(32)`)
- Actualizar en Render backend y Vercel frontend
- Remover clave vieja del historial de git (git filter-branch o similar)
- Crear .env.example SIN la clave
- Documentar proceso de setup para nuevos devs

**Checklist:**
- [ ] Generar nueva clave
- [ ] Actualizar en producción
- [ ] Limpiar historial de git
- [ ] Crear .env.example
- [ ] Documentar en README

---

### 2. Configurar Google Calendar en Producción (Vercel)
**Prioridad:** CRÍTICA  
**Estimación:** 30 minutos  
**Descripción:**
- El booking está fallando en producción porque faltan variables de ambiente
- Agregar a Vercel: GOOGLE_CALENDAR_ID, GOOGLE_CALENDAR_EMAIL, GOOGLE_PRIVATE_KEY
- Validar que los valores sean correctos (evitar truncamientos)
- Testear booking end-to-end en producción
- Documentar en CLAUDE.md qué hacer si falla

**Checklist:**
- [ ] Agregar variables a Vercel
- [ ] Validar formato (especialmente PRIVATE_KEY con saltos de línea)
- [ ] Test booking en prod
- [ ] Documentar proceso

---

### 3. Arreglar Flash Bug en ProtectedRoute
**Prioridad:** CRÍTICA  
**Estimación:** 1 hora  
**Descripción:**
- Los usuarios no autenticados ven el contenido por un momento antes de ser redirigidos
- Crear componente de "Loading Skeleton" mientras se valida el token
- Mostrar pantalla en blanco/loader hasta que `isLoading` sea false
- Testear en navegador real (verificar que no hay flash)

**Checklist:**
- [ ] Agregar estado `isLoading` en AuthContext
- [ ] Crear componente LoadingShell
- [ ] Implementar en ProtectedRoute
- [ ] Test en incognito (sin token)

---

### 4. Completar Google Calendar Integration
**Prioridad:** CRÍTICA  
**Estimación:** 2-3 horas  
**Descripción:**
- Actualmente hay conflicto: Google Meet no se puede crear en Gmail personal
- Opción A: Cambiar a Google Workspace (recomendado si es para empresa)
- Opción B: Usar Google Meet directamente sin conferenceData (usuarios crean link después)
- Opción C: Implementar Zoom/otro proveedor
- Agregar validación: verificar que el calendar ID existe antes de crear evento
- Testear: crear booking → ver en Google Calendar

**Checklist:**
- [ ] Decidir proveedor de video conferencia
- [ ] Validar calendarId en route.ts
- [ ] Error handling mejorado
- [ ] Test end-to-end

---

## 🟠 ALTA (Esta semana)

### 5. Completar Facturas Page
**Prioridad:** ALTA  
**Estimación:** 3-4 horas  
**Descripción:**
- Actualmente es un placeholder estático sin API calls
- Crear listado de facturas desde backend: `GET /api/facturas`
- Agregar filtros: por fecha, estado, monto
- Implementar paginación (25-50 items por página)
- Agregar botón de descargar/ver PDF
- Estados visuales: emitida, pagada, vencida
- Buscar por número de factura

**Backend:**
- [ ] Crear router `/api/facturas` con GET/POST
- [ ] Implementar filtrado y paginación
- [ ] Endpoint para descargar PDF

**Frontend:**
- [ ] Conectar con TanStack Query
- [ ] Tabla con columnas: #, fecha, cliente, monto, estado
- [ ] Filtros laterales
- [ ] Paginación

---

### 6. Implementar Bookings Management Page
**Prioridad:** ALTA  
**Estimación:** 4-5 horas  
**Descripción:**
- Actualmente no hay interfaz para gestionar bookings (solo crear)
- Crear página `/dashboard/bookings` con:
  - Listado de bookings próximos (próximos 30 días)
  - Estados: confirmado, completado, cancelado
  - Filtros por estado, cliente, rango de fechas
  - Opción de editación rápida (reagendar)
  - Opción de cancelación
- Mostrar Google Calendar link
- Notificaciones: enviar recordatorios 24h antes

**Backend:**
- [ ] Router `GET /api/bookings` con filtros
- [ ] Router `PATCH /api/bookings/{id}` para editar
- [ ] Router `DELETE /api/bookings/{id}` para cancelar
- [ ] Lógica de notificaciones (email 24h antes)

**Frontend:**
- [ ] Página /dashboard/bookings
- [ ] Componente BookingCard
- [ ] Modal de editar/cancelar
- [ ] Integración con Google Calendar

---

### 7. Refactorizar Home Page
**Prioridad:** ALTA  
**Estimación:** 2-3 horas  
**Descripción:**
- Home page tiene 487 líneas en un único componente "use client"
- Antipattern: mala para SEO, renderizado, mantenibilidad
- Dividir en: HeroSection, Features, Testimonials, CTA, Footer
- Hacer partes que pueden ser SSR (static) vs dinámicas (client)
- Mejorar performance: lazy load images, code splitting
- Mejorar SEO: metadatos, schema markup

**Checklist:**
- [ ] Dividir en 4-5 componentes
- [ ] Marcar como SSR donde sea posible
- [ ] Lazy load images
- [ ] Metrics: Lighthouse score > 80

---

### 8. Crear Milestones Management Page
**Prioridad:** ALTA  
**Estimación:** 2-3 horas  
**Descripción:**
- Milestones existen en DB pero no hay interfaz para gestionar
- Crear página `/dashboard/milestones` con:
  - Crear nuevo hito (nombre, fecha, descripción)
  - Vincular a proyecto
  - Marcar como completado
  - Mostrar en timeline/dashboard
- Mostrar en dashboard: "Próximos hitos" en widget

**Backend:**
- [ ] Router `GET/POST /api/milestones`
- [ ] Router `PATCH /api/milestones/{id}`
- [ ] Validación de fechas

**Frontend:**
- [ ] Página /dashboard/milestones
- [ ] Form de creación
- [ ] Timeline visual
- [ ] Widget en dashboard

---

### 9. Arreglar Mismatch English/Spanish en ORM Models
**Prioridad:** ALTA  
**Estimación:** 2-3 horas  
**Descripción:**
- Los nombres de campos en modelos Pydantic (backend) no coinciden con schema.sql
- Ejemplo: camelCase en ORM pero snake_case en DB
- Auditar TODOS los modelos y alinearlos
- Crear mapping claro: `class Config: populate_by_name = True`
- Actualizar tests si existen
- Documentar convención elegida para nuevos modelos

**Checklist:**
- [ ] Listar todos los modelos
- [ ] Comparar con schema.sql
- [ ] Crear aliases donde sea necesario
- [ ] Test de serialización/deserialización
- [ ] Documentar en CODING_STANDARDS.md

---

### 10. Implementar Notificaciones en Tiempo Real (WebSockets)
**Prioridad:** ALTA  
**Estimación:** 4-6 horas  
**Descripción:**
- Actualmente hay router de notificaciones pero no son "reales"
- Implementar WebSocket en FastAPI para notificaciones push
- Casos: nuevo booking, project update, mensaje de cliente
- Frontend: conectar WebSocket en AuthContext
- Mostrar toast/badge con notificaciones
- Marcar como leído

**Backend:**
- [ ] Endpoint WebSocket en FastAPI
- [ ] Manager de conexiones
- [ ] Guardar notificaciones en DB
- [ ] Enviar cuando hay evento

**Frontend:**
- [ ] Hook useNotifications
- [ ] Conectar WebSocket
- [ ] Componente NotificationBell
- [ ] Toast de notificaciones nuevas

---

## 🟡 MEDIA (Este mes)

### 11. Remover aiomysql de requirements.txt
**Prioridad:** MEDIA  
**Estimación:** 30 minutos  
**Descripción:**
- El proyecto usa SQLite, no MySQL
- Remover `aiomysql` de requirements.txt (causa confusión y peso innecesario)
- Verificar que no hay imports de aiomysql en el código
- Actualizar requirements.txt en Git
- Documentar cuál es la stack correcta

**Checklist:**
- [ ] Remover aiomysql
- [ ] Grep para verificar no hay imports
- [ ] Commit y push
- [ ] Actualizar README

---

### 12. Implementar Sistema de Búsqueda
**Prioridad:** MEDIA  
**Estimación:** 2-3 horas  
**Descripción:**
- Agregar barra de búsqueda global en dashboard
- Buscar en: projects, facturas, clients, bookings
- Implementar en frontend con debounce
- Backend: crear endpoint `/api/search?q=...`
- Mostrar resultados en dropdown

**Backend:**
- [ ] Router `GET /api/search`
- [ ] Buscar en múltiples tablas
- [ ] Limitar a 10-20 resultados

**Frontend:**
- [ ] Componente SearchBar
- [ ] Hook useSearch con debounce
- [ ] Dropdown de resultados

---

### 13. Mejorar Manejo de Errores en API
**Prioridad:** MEDIA  
**Estimación:** 2-3 horas  
**Descripción:**
- Crear error handler consistente en todo el backend
- Todos los routers deben devolver: `{ error, code, message }`
- Frontend: mostrar mensajes de error amigables
- Logging de errores para debugging

**Checklist:**
- [ ] Crear exception handler en FastAPI
- [ ] Auditar todos los routers
- [ ] Actualizar frontend para mostrar errores
- [ ] Documentar error codes

---

### 14. Agregar Paginación a Endpoints
**Prioridad:** MEDIA  
**Estimación:** 2-3 horas  
**Descripción:**
- Routers que devuelven listas deben paginar
- Parámetros: `?page=1&limit=25`
- Respuesta: `{ data: [], total, page, pages }`
- Aplicar a: projects, facturas, clients, bookings, notifications

**Checklist:**
- [ ] Crear helper para paginación
- [ ] Aplicar a todos los GET list
- [ ] Frontend: actualizar TanStack Query
- [ ] Test con datos grandes

---

### 15. Implementar Recovery de Contraseña
**Prioridad:** MEDIA  
**Estimación:** 2-3 horas  
**Descripción:**
- Si no existe, crear flujo de "Olvidé mi contraseña"
- Usuario ingresa email → recibe link de reset
- Link válido por 1 hora
- Nuevo password → redirect a login
- Backend: tokens temporales, hash de password

**Backend:**
- [ ] Endpoint `POST /api/auth/forgot-password`
- [ ] Endpoint `POST /api/auth/reset-password`
- [ ] Token temporal en DB
- [ ] Email con link

**Frontend:**
- [ ] Página /forgot-password
- [ ] Página /reset-password
- [ ] Validación de password fuerte

---

### 16. Confirmación de Email para Nuevos Users
**Prioridad:** MEDIA  
**Estimación:** 1-2 horas  
**Descripción:**
- Nuevos usuarios reciben email de confirmación
- Email inactivo hasta confirmar
- Link válido por 24 horas
- Resend option si expiró

**Backend:**
- [ ] Campo `email_verified` en users
- [ ] Endpoint `POST /api/auth/verify-email`
- [ ] Enviar email en signup
- [ ] Validar en login

**Frontend:**
- [ ] Página de "Verificando email..."
- [ ] Link directo en email
- [ ] Opción de resend

---

### 17. Agregar Linting & Formatting
**Prioridad:** MEDIA  
**Estimación:** 1-2 horas  
**Descripción:**
- Frontend: ESLint + Prettier (si no está ya configurado)
- Backend: Black + Ruff
- Pre-commit hooks para formatear antes de commit
- CI/CD: fallar si hay linting errors

**Checklist:**
- [ ] Configurar ESLint/Prettier frontend
- [ ] Configurar Black/Ruff backend
- [ ] Pre-commit hooks
- [ ] Actualizar CI/CD

---

### 18. Crear Tests Unitarios para Auth
**Prioridad:** MEDIA  
**Estimación:** 2-3 horas  
**Descripción:**
- Tests para: login, token generation, refresh, logout
- Cubrir casos: email inválido, contraseña incorrecta, usuario no existe
- Usar pytest para backend
- Fixtures para user de prueba

**Checklist:**
- [ ] Setup pytest
- [ ] Tests para auth router
- [ ] Tests para auth service
- [ ] Coverage > 80%

---

## 🟢 BAJA (Cuando haya tiempo)

### 19. Unificar Lógica Duplicada en Dashboard Router
**Prioridad:** BAJA  
**Estimación:** 2 horas  
**Descripción:**
- Dashboard router tiene 259 líneas con queries duplicadas entre `/stats` y `/data`
- Refactorizar: crear helper functions para queries comunes
- Mejorar legibilidad y mantenibilidad

**Checklist:**
- [ ] Identificar código duplicado
- [ ] Crear helper functions
- [ ] Refactorizar endpoints
- [ ] Asegurar tests pasan

---

### 20. Implementar Soft Deletes
**Prioridad:** BAJA  
**Estimación:** 2 horas  
**Descripción:**
- Agregar columna `deleted_at` a tablas principales
- Proyectos, facturas, etc. nunca se borran realmente
- Filtrar automáticamente registros borrados en queries
- Crear admin function para recuperar/purgar

**Checklist:**
- [ ] Migración DB
- [ ] Actualizar modelos
- [ ] Crear helper de queries
- [ ] Admin endpoint para restaurar

---

### 21. Documentación API con Swagger/OpenAPI
**Prioridad:** BAJA  
**Estimación:** 2-3 horas  
**Descripción:**
- FastAPI auto-genera docs en `/docs`
- Mejorar: agregar ejemplos en docstrings
- Documentar parámetros, requests, responses
- Tags por router para organizar

**Checklist:**
- [ ] Revisar docstrings en routers
- [ ] Agregar ejemplos
- [ ] Crear modelo Response estándar
- [ ] Documentar auth en Swagger

---

### 22. Implementar Logging Centralizado
**Prioridad:** BAJA  
**Estimación:** 2 horas  
**Descripción:**
- Usar library como `python-json-logger` para logs estructurados
- Logs a archivo + stdout para debugging
- Frontend: agregar error logging (Sentry)
- Monitorear en producción

**Backend:**
- [ ] Configurar logging con JSON
- [ ] Log requests/responses importantes
- [ ] Log de errors con stack trace

**Frontend:**
- [ ] Integrar Sentry
- [ ] Capturar errors automáticamente

---

### 23. Agregar Multi-idioma (i18n)
**Prioridad:** BAJA  
**Estimación:** 3-4 horas  
**Descripción:**
- Setup next-i18n o similar
- Strings en archivo de traducción (JSON/YAML)
- Español e inglés por defecto
- Selector de idioma en header

**Checklist:**
- [ ] Instalar next-i18n
- [ ] Crear archivos de traducción
- [ ] Reemplazar strings hardcoded
- [ ] Selector de idioma

---

### 24. TypeScript Strict Mode Audit
**Prioridad:** BAJA  
**Estimación:** 2-3 horas  
**Descripción:**
- Habilitar `strict: true` en tsconfig.json
- Fijar todos los errores que aparezcan
- Mejorar type safety del proyecto

**Checklist:**
- [ ] Habilitar strict mode
- [ ] Arreglar errores
- [ ] Verificar que compila
- [ ] Documentar tipos complejos

---

### 25. Implementar Exportación de Reportes
**Prioridad:** BAJA  
**Estimación:** 2-3 horas  
**Descripción:**
- Descargar facturas como PDF
- Exportar projects/bookings como CSV
- Reportes mensuales de ingresos

**Backend:**
- [ ] Librería para generar PDF (reportlab)
- [ ] Endpoint para PDF de factura
- [ ] Endpoint para CSV de projects

**Frontend:**
- [ ] Botón de descargar/exportar
- [ ] Modal de opciones (PDF, CSV)

---

### 26. Mejora de Performance con Índices DB
**Prioridad:** BAJA  
**Estimación:** 1-2 horas  
**Descripción:**
- Auditar queries lentas
- Agregar índices en: user_id, organization_id, created_at
- Usar EXPLAIN para verificar

**Checklist:**
- [ ] Identificar queries lentas
- [ ] Crear índices
- [ ] Verificar con EXPLAIN
- [ ] Documentar índices

---

### 27. Crear Página de Admin
**Prioridad:** BAJA  
**Estimación:** 3-4 horas  
**Descripción:**
- Listado de usuarios y organizaciones
- Estadísticas generales (usuarios activos, bookings, facturas)
- Herramientas: resetear password, purgar datos
- Solo acceso para super admin

**Checklist:**
- [ ] Crear role super_admin
- [ ] Página /admin
- [ ] Widgets de estadísticas
- [ ] Acciones de usuario

---

### 28. Implementar Rate Limiting
**Prioridad:** BAJA  
**Estimación:** 1-2 horas  
**Descripción:**
- Proteger contra abuso: 100 requests por minuto por IP
- Más estricto para login: 5 intentos por 15 minutos
- Retornar 429 Too Many Requests

**Checklist:**
- [ ] Instalar slowapi o similar
- [ ] Configurar en FastAPI
- [ ] Aplicar a endpoints sensibles
- [ ] Test de rate limit

---

### 29. Crear CODING_STANDARDS.md
**Prioridad:** BAJA  
**Estimación:** 1 hora  
**Descripción:**
- Documentar convenciones del proyecto
- Naming: camelCase vs snake_case
- Estructura de carpetas
- Patrones recurrentes

**Checklist:**
- [ ] Documentar convenciones
- [ ] Ejemplos de código
- [ ] Checklist de PR
- [ ] Linkar en README

---

### 30. Configurar GitHub Actions/CI Pipeline
**Prioridad:** BAJA  
**Estimación:** 2-3 horas  
**Descripción:**
- Tests automáticos en cada push
- Linting checks
- Build verification
- Coverage reports

**Checklist:**
- [ ] Crear workflows
- [ ] Tests en CI
- [ ] Linting checks
- [ ] Documentar en README

---

---

## 📊 RESUMEN POR PRIORIDAD

| Prioridad | Cantidad | Estimación | 
|-----------|----------|-----------|
| 🔴 CRÍTICA | 4 | 7-9 horas |
| 🟠 ALTA | 6 | 19-24 horas |
| 🟡 MEDIA | 9 | 18-25 horas |
| 🟢 BAJA | 11 | 27-36 horas |
| **TOTAL** | **30** | **~72-95 horas** |

---

## 🎯 ORDEN DE EJECUCIÓN RECOMENDADO

**Semana 1 (Crítica + Alta):**
1. Regenerar JWT (1-2h)
2. Configurar Google Calendar en Vercel (30m)
3. Arreglar ProtectedRoute flash (1h)
4. Completar Google Calendar integration (2-3h)
5. Completar Facturas page (3-4h)

**Semana 2 (Alta + Media):**
6. Implementar Bookings management (4-5h)
7. Refactorizar Home page (2-3h)
8. Crear Milestones page (2-3h)
9. Arreglar ORM/schema mismatch (2-3h)
10. Implementar WebSockets (4-6h)

**Semana 3 (Media + Baja):**
11-20. Implementar tareas media
21-30. Cuando haya tiempo

---

## 💡 TIPS PARA TRELLO

1. **Usar labels:** 
   - Backend
   - Frontend
   - Fullstack
   - Bugfix
   - Feature
   - Devops

2. **Usar size estimates:**
   - Small (< 1h)
   - Medium (1-3h)
   - Large (3-6h)
   - XLarge (6+h)

3. **Dividir en subtasks:**
   - Las tareas ALTA/MEDIA tienen subtasks en los checklists
   - Usar checkboxes en descripción de Trello

4. **Workflow de Trello:**
   - Backlog → En progreso → Review → Done
   - O: Backlog → Este sprint → En progreso → Done

