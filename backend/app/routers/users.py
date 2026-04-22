from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.user import User
from app.models.organization import Organization, OrganizationMember
from app.schemas.auth import UserResponse
from app.utils.dependencies import get_current_user

router = APIRouter(prefix="/api/users", tags=["users"])


@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Obtiene el perfil del usuario actual"""

    # Obtener organización
    result = await db.execute(
        select(Organization)
        .join(OrganizationMember)
        .where(OrganizationMember.usuario_id == current_user.id)
        .order_by(OrganizationMember.creado)
    )
    organization = result.scalar_one_or_none()

    return UserResponse(
        id=current_user.id,
        name=current_user.nombre_completo or "Usuario",
        email=current_user.correo,
        company=organization.nombre if organization else "",
        avatar_url=current_user.avatar_url,
        plan=organization.plan.value if organization else "free"
    )
