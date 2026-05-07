"""
Módulo de autenticación y configuración de usuario.

Endpoints para:
- Onboarding de nuevos usuarios (configurar perfil y organización)

Autenticación: Token JWT de Supabase (Bearer token)
"""
import re
import uuid
import secrets
from datetime import datetime, timezone, timedelta
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from app.database import get_db
from app.models.profile import Perfil
from app.models.user import User, PasswordResetToken
from app.models.organization import Organization, OrganizationMember, OrganizationRole
from app.schemas.auth import OnboardingData, UserResponse, ForgotPasswordRequest, ResetPasswordRequest
from app.services.email import send_recovery_email
from app.utils.dependencies import get_current_user
from app.utils.security import hash_password

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


def _slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    return re.sub(r"^-+|-+$", "", text)


@router.post(
    "/onboarding",
    response_model=UserResponse,
    status_code=201,
    summary="Completar configuración de usuario",
    description="""
    Configura el perfil del usuario y crea su organización tras el registro en Supabase Auth.
    
    **Este endpoint debe llamarse solo una vez** después del registro exitoso.
    
    ## Proceso:
    1. Guarda el nombre completo del usuario
    2. Crea una nueva organización con el nombre de empresa
    3. Genera un slug único para la organización
    4. Asigna al usuario como owner de la organización
    
    ## Errores:
    - 409: La organización ya está configurada para este usuario
    - 401: Token de autenticación inválido o expirado
    """,
)
async def onboarding(
    data: OnboardingData,
    request: Request,
    db: AsyncSession = Depends(get_db),
    current_user: Perfil = Depends(get_current_user),
):

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


@router.post(
    "/forgot-password",
    status_code=200,
    summary="Solicitar restablecimiento de contraseña",
    description="Genera un token temporal de recuperación y lo envía al email del usuario.",
)
async def forgot_password(
    data: ForgotPasswordRequest,
    db: AsyncSession = Depends(get_db),
):
    # Lookup the local User
    result = await db.execute(select(User).where(User.correo == data.email))
    user = result.scalar_one_or_none()
    
    if not user:
        # Return 200 anyway to prevent email enumeration
        return {"detail": "Si el email está registrado, recibirás un enlace de recuperación."}

    # Delete any existing tokens for this user
    await db.execute(delete(PasswordResetToken).where(PasswordResetToken.user_id == user.id))
    
    # Create new token valid for 1 hour
    token_str = secrets.token_urlsafe(32)
    expires = datetime.now(timezone.utc) + timedelta(hours=1)
    
    token = PasswordResetToken(
        user_id=user.id,
        token=token_str,
        expires_at=expires
    )
    db.add(token)
    await db.commit()

    # Send email
    success = await send_recovery_email(user.correo, token_str, user.nombre_completo)
    if not success:
        raise HTTPException(status_code=502, detail="Error al enviar el email de recuperación")

    return {"detail": "Si el email está registrado, recibirás un enlace de recuperación."}


@router.post(
    "/reset-password",
    status_code=200,
    summary="Restablecer contraseña con token",
    description="Permite al usuario elegir una nueva contraseña utilizando el token válido.",
)
async def reset_password(
    data: ResetPasswordRequest,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(PasswordResetToken).where(PasswordResetToken.token == data.token)
    )
    token_record = result.scalar_one_or_none()

    if not token_record or not token_record.is_valid:
        raise HTTPException(status_code=400, detail="El enlace de recuperación es inválido o ha expirado")

    # Mark token as used
    token_record.used = True

    # Find the user and update password
    user_result = await db.execute(select(User).where(User.id == token_record.user_id))
    user = user_result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    user.password_hash = hash_password(data.password)
    
    await db.commit()

    return {"detail": "Tu contraseña ha sido restablecida correctamente. Ya puedes iniciar sesión."}
