import re
import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.profile import Perfil
from app.models.organization import Organization, OrganizationMember, OrganizationRole
from app.schemas.auth import OnboardingData, UserResponse
from app.utils.dependencies import get_current_user

router = APIRouter(prefix="/api/auth", tags=["auth"])


def _slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    return re.sub(r"^-+|-+$", "", text)


@router.post("/onboarding", response_model=UserResponse, status_code=201)
async def onboarding(
    data: OnboardingData,
    request: Request,
    db: AsyncSession = Depends(get_db),
    current_user: Perfil = Depends(get_current_user),
):
    """Configura perfil y organización tras el registro en Supabase Auth.
    Llamar una sola vez justo después del signUp."""

    existing = await db.execute(
        select(OrganizationMember).where(OrganizationMember.usuario_id == current_user.id)
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="Ya tienes una organización configurada")

    current_user.nombre_completo = data.nombre_completo

    base_slug = _slugify(data.company)
    slug, counter = base_slug, 1
    while True:
        row = await db.execute(select(Organization).where(Organization.slug == slug))
        if not row.scalar_one_or_none():
            break
        slug = f"{base_slug}-{counter}"
        counter += 1

    org = Organization(nombre=data.company, slug=slug)
    db.add(org)
    await db.flush()

    member = OrganizationMember(
        organizacion_id=org.id,
        usuario_id=current_user.id,
        rol=OrganizationRole.OWNER,
        aceptado_en=datetime.now(timezone.utc),
    )
    db.add(member)
    await db.commit()

    return UserResponse(
        id=str(current_user.id),
        name=current_user.nombre_completo or "",
        email=getattr(request.state, "user_email", ""),
        company=org.nombre,
        avatar_url=current_user.avatar_url,
        plan=org.plan.value,
    )
