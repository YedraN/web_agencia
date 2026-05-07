"""
Módulo de administración del sistema.

Endpoints exclusivos para super administradores.

## Funcionalidades:
- Estadísticas globales del sistema
- Gestión de usuarios (ver, activar/desactivar, eliminar)
- Gestión de organizaciones (ver, eliminar)

## Autenticación:
Requiere token JWT de un usuario con rol de super_admin.
El flag `is_super_admin` debe estar enabled en la tabla de perfiles.

## Rate Limiting:
- GET /stats: 60/min
- POST/PATCH/DELETE en usuarios: 10-30/min según operación
"""
import uuid
import httpx
from fastapi import APIRouter, Depends, HTTPException, status, Query, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, delete, or_
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi.responses import JSONResponse

from app.database import get_db
from app.models.profile import Perfil
from app.models.organization import Organization, OrganizationMember
from app.models.project import Project
from app.models.invoice import Invoice
from app.utils.dependencies import get_super_admin_user
from app.config import settings

limiter = Limiter(key_func=get_remote_address)

router = APIRouter(prefix="/api/admin", tags=["Admin"])


@router.exception_handler(RateLimitExceeded)
async def admin_rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={
            "detail": "Demasiadas solicitudes. Por favor, inténtalo más tarde.",
            "retry_after": exc.detail,
        },
)


def _supabase_admin_headers() -> dict:
    return {
        "Authorization": f"Bearer {settings.supabase_service_role_key}",
        "apikey": settings.supabase_service_role_key,
        "Content-Type": "application/json",
    }


async def _supabase_get_users() -> list[dict]:
    """Fetches all users from the Supabase Auth Admin API."""
    url = f"{settings.supabase_url}/auth/v1/admin/users?page=1&per_page=1000"
    async with httpx.AsyncClient(timeout=10.0) as client:
        r = await client.get(url, headers=_supabase_admin_headers())
        if r.status_code != 200:
            return []
        data = r.json()
        return data.get("users", [])


# ══════════════════════════════════════════════════════════════════════════════
# STATS - Estadísticas globales del sistema
# ══════════════════════════════════════════════════════════════════════════════

@router.get(
    "/stats",
    summary="Estadísticas globales",
    description="""
    Devuelve estadísticas agregadas de todo el sistema:
    
    - Total de usuarios registrados
    - Usuarios activos
    - Total de organizaciones
    - Total de proyectos
    - Total de facturas
    - Ingresos totales (suma de todas las facturas)
    
    ## Rate Limit: 60 solicitudes por minuto
    
    ## Requiere: Rol de super_admin
    """,
)
@limiter.limit("60/minute")
async def admin_stats(
    request: Request,
    _: Perfil = Depends(get_super_admin_user),
    db: AsyncSession = Depends(get_db),
):
    total_users = (await db.execute(select(func.count()).select_from(Perfil))).scalar_one()
    active_users = (await db.execute(
        select(func.count()).select_from(Perfil).where(Perfil.activo == True)
    )).scalar_one()
    total_orgs = (await db.execute(select(func.count()).select_from(Organization))).scalar_one()
    total_projects = (await db.execute(select(func.count()).select_from(Project))).scalar_one()
    total_invoices = (await db.execute(select(func.count()).select_from(Invoice))).scalar_one()
    total_revenue = (await db.execute(
        select(func.coalesce(func.sum(Invoice.total_cents), 0)).select_from(Invoice)
    )).scalar_one()

    return {
        "total_users": total_users,
        "active_users": active_users,
        "total_orgs": total_orgs,
        "total_projects": total_projects,
        "total_invoices": total_invoices,
        "total_revenue_cents": int(total_revenue),
    }


# ══════════════════════════════════════════════════════════════════════════════
# USERS - Gestión de usuarios
# ══════════════════════════════════════════════════════════════════════════════

@router.get(
    "/users",
    summary="Listar usuarios",
    description="""
    Lista todos los usuarios del sistema con paginación.
    
    ## Parámetros:
    - `page` (default=1): Página actual
    - `page_size` (default=10, máx=100): Elementos por página
    - `search` (opcional): Filtrar por nombre completo
    
    ## Respuesta:
    ```json
    {
      "data": [
        {
          "id": "uuid",
          "nombre_completo": "Juan Pérez",
          "email": "juan@ejemplo.com",
          "activo": true,
          "verificado": true,
          "ultimo_acceso": "2024-01-01T00:00:00Z",
          "created_at": "2024-01-01T00:00:00Z"
        }
      ],
      "total": 100,
      "page": 1,
      "page_size": 10,
      "total_pages": 10
    }
    ```
    """,
)
async def admin_list_users(
    _: Perfil = Depends(get_super_admin_user),
    db: AsyncSession = Depends(get_db),
    page: int = Query(1, ge=1, description="Número de página"),
    page_size: int = Query(10, ge=1, le=100, description="Elementos por página"),
    search: str | None = Query(None, description="Buscar por nombre"),
):
    # Build email lookup from Supabase Auth
    supabase_users = await _supabase_get_users()
    email_by_id = {u["id"]: u.get("email", "") for u in supabase_users}

    # Base query with optional search (only by nombre_completo, email is in Supabase)
    base_filter = []
    if search:
        search_pattern = f"%{search}%"
        base_filter.append(Perfil.nombre_completo.ilike(search_pattern))
    
    # Count total
    count_query = select(func.count()).select_from(Perfil)
    if base_filter:
        count_query = count_query.where(*base_filter)
    total = (await db.execute(count_query)).scalar_one()
    
    # Calculate pagination
    total_pages = (total + page_size - 1) // page_size
    offset = (page - 1) * page_size
    
    # Fetch paginated results
    query = select(Perfil).order_by(Perfil.created_at.desc()).offset(offset).limit(page_size)
    if base_filter:
        query = query.where(*base_filter)
    perfiles_result = await db.execute(query)
    perfiles = perfiles_result.scalars().all()

    return {
        "data": [
            {
                "id": str(p.id),
                "nombre_completo": p.nombre_completo,
                "email": email_by_id.get(str(p.id), ""),
                "activo": p.activo,
                "verificado": p.verificado,
                "ultimo_acceso": p.ultimo_acceso.isoformat() if p.ultimo_acceso else None,
                "created_at": p.created_at.isoformat(),
            }
            for p in perfiles
        ],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": total_pages,
    }


@router.post("/users/{user_id}/reset-password", status_code=200)
@limiter.limit("10/minute")
async def admin_reset_password(
    request: Request,
    user_id: str,
    _: Perfil = Depends(get_super_admin_user),
    db: AsyncSession = Depends(get_db),
):
    # Verify user exists in our DB
    result = await db.execute(select(Perfil).where(Perfil.id == uuid.UUID(user_id)))
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")

    # Get email from Supabase Auth
    url = f"{settings.supabase_url}/auth/v1/admin/users/{user_id}"
    async with httpx.AsyncClient(timeout=10.0) as client:
        r = await client.get(url, headers=_supabase_admin_headers())
        if r.status_code != 200:
            raise HTTPException(status_code=502, detail="No se pudo obtener el usuario de Supabase")
        email = r.json().get("email", "")

    if not email:
        raise HTTPException(status_code=400, detail="El usuario no tiene email")

    # Trigger recovery email
    recover_url = f"{settings.supabase_url}/auth/v1/recover"
    recover_headers = {
        "apikey": settings.supabase_anon_key,
        "Content-Type": "application/json",
    }
    async with httpx.AsyncClient(timeout=10.0) as client:
        r = await client.post(recover_url, headers=recover_headers, json={"email": email})
        if r.status_code not in (200, 204):
            raise HTTPException(status_code=502, detail="Error al enviar email de recuperación")

    return {"detail": "Email de recuperación enviado"}


@router.patch("/users/{user_id}/toggle-active", status_code=200)
@limiter.limit("30/minute")
async def admin_toggle_user_active(
    request: Request,
    user_id: str,
    _: Perfil = Depends(get_super_admin_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Perfil).where(Perfil.id == uuid.UUID(user_id)))
    perfil = result.scalar_one_or_none()
    if not perfil:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")

    perfil.activo = not perfil.activo
    await db.commit()
    return {"id": user_id, "activo": perfil.activo}


@router.delete("/users/{user_id}", status_code=200)
@limiter.limit("10/minute")
async def admin_purge_user(
    request: Request,
    user_id: str,
    _: Perfil = Depends(get_super_admin_user),
    db: AsyncSession = Depends(get_db),
):
    uid = uuid.UUID(user_id)
    result = await db.execute(select(Perfil).where(Perfil.id == uid))
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")

    await db.execute(delete(OrganizationMember).where(OrganizationMember.usuario_id == uid))
    await db.execute(delete(Perfil).where(Perfil.id == uid))
    await db.commit()
    return {"detail": "Datos del usuario eliminados"}


# ──────────────────────────────────────────────────────────────────────────────
# Organizations
# ──────────────────────────────────────────────────────────────────────────────

@router.get("/organizations")
async def admin_list_organizations(
    _: Perfil = Depends(get_super_admin_user),
    db: AsyncSession = Depends(get_db),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    search: str | None = Query(None),
):
    # Base query with optional search
    base_filter = []
    if search:
        search_pattern = f"%{search}%"
        base_filter.append(
            or_(
                Organization.nombre.ilike(search_pattern),
                Organization.slug.ilike(search_pattern),
            )
        )
    
    # Count total
    count_query = select(func.count()).select_from(Organization)
    if base_filter:
        count_query = count_query.where(*base_filter)
    total = (await db.execute(count_query)).scalar_one()
    
    # Calculate pagination
    total_pages = (total + page_size - 1) // page_size
    offset = (page - 1) * page_size
    
    # Fetch paginated results with members eager loaded
    query = (
        select(Organization)
        .order_by(Organization.created_at.desc())
        .offset(offset)
        .limit(page_size)
    )
    if base_filter:
        query = query.where(*base_filter)
    result = await db.execute(query)
    orgs = result.scalars().all()

    return {
        "data": [
            {
                "id": str(o.id),
                "nombre": o.nombre,
                "slug": o.slug,
                "plan": o.plan.value,
                "activo": o.activo,
                "ciudad": o.ciudad,
                "pais": o.pais,
                "member_count": len(o.members),
                "created_at": o.created_at.isoformat(),
            }
            for o in orgs
        ],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": total_pages,
    }


@router.delete("/organizations/{org_id}", status_code=200)
@limiter.limit("10/minute")
async def admin_delete_organization(
    request: Request,
    org_id: str,
    _: Perfil = Depends(get_super_admin_user),
    db: AsyncSession = Depends(get_db),
):
    oid = uuid.UUID(org_id)
    result = await db.execute(select(Organization).where(Organization.id == oid))
    org = result.scalar_one_or_none()
    if not org:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Organización no encontrada")

    await db.delete(org)
    await db.commit()
    return {"detail": "Organización eliminada"}
