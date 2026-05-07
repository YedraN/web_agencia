"""
Módulo de gestión de usuarios.

Endpoints para obtener información del usuario autenticado.

Autenticación: Token JWT de Supabase (Bearer token)
"""
from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.profile import Perfil
from app.models.organization import Organization, OrganizationMember
from app.schemas.auth import UserResponse
from app.utils.dependencies import get_current_user

router = APIRouter(prefix="/api/users", tags=["Users"])


@router.get(
    "/me",
    response_model=UserResponse,
    summary="Obtener perfil del usuario actual",
    description="""
    Devuelve la información del usuario autenticado, incluyendo:
    - Datos personales (nombre, email, avatar)
    - Información de la organización (nombre, plan)
    - Estado de verificación del email
    
    ## Respuesta:
    ```json
    {
      "id": "uuid-del-usuario",
      "name": "Nombre completo",
      "email": "email@ejemplo.com",
      "company": "Nombre de la empresa",
      "avatar_url": "https://...",
      "plan": "free",
      "verified": true
    }
    ```
    
    ## Errores:
    - 401: Token de autenticación inválido o expirado
    """,
)
async def get_me(
    request: Request,
    db: AsyncSession = Depends(get_db),
    current_user: Perfil = Depends(get_current_user),
):
    result = await db.execute(
        select(Organization)
        .join(OrganizationMember, OrganizationMember.organizacion_id == Organization.id)
        .where(OrganizationMember.usuario_id == current_user.id)
        .order_by(OrganizationMember.created_at)
        .limit(1)
    )
    org = result.scalar_one_or_none()

    return UserResponse(
        id=str(current_user.id),
        name=current_user.nombre_completo or "Usuario",
        email=getattr(request.state, "user_email", ""),
        company=org.nombre if org else "",
        avatar_url=current_user.avatar_url,
        plan=org.plan.value if org else "free",
        verified=current_user.verificado,
    )
