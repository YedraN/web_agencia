"""
Módulo de confirmación de email.

Endpoints para:
- Enviar email de confirmación
- Reenviar email de confirmación (sin auth)
- Confirmar email mediante token

## Flujo:
1. Usuario se registra → recibe email automático (si está configurado)
2. Usuario hace login sin verificar → ve opción de reenviar
3. Usuario clicks enlace → email verificado

## Rate Limiting:
- send-confirmation: 5/minuto por usuario
- resend-confirmation: 1/minuto por IP
"""
import uuid
from datetime import datetime, timezone, timedelta
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from app.database import get_db
from app.models.profile import Perfil
from app.models.confirmation import EmailConfirmationToken
from app.services.email import send_confirmation_email
from app.utils.dependencies import get_current_user
from app.config import settings

router = APIRouter(prefix="/api/auth", tags=["Email Confirmation"])


async def _get_user_email(user_id: uuid.UUID, db: AsyncSession) -> str:
    """Get user email from Supabase Auth."""
    import httpx
    url = f"{settings.supabase_url}/auth/v1/admin/users/{user_id}"
    headers = {
        "Authorization": f"Bearer {settings.supabase_service_role_key}",
        "apikey": settings.supabase_service_role_key,
    }
    async with httpx.AsyncClient(timeout=10.0) as client:
        r = await client.get(url, headers=headers)
        if r.status_code != 200:
            raise HTTPException(status_code=502, detail="No se pudo obtener el email del usuario")
        return r.json().get("email", "")


@router.post(
    "/send-confirmation",
    status_code=200,
    summary="Enviar email de confirmación",
    description="""
    Envía un email de confirmación al usuario actual.
    
    El token enviado es válido por 24 horas.
    Solo funciona si el usuario no está ya verificado.
    
    ## Rate Limit: 5 solicitudes por minuto
    
    ## Errores:
    - 400: El email ya está confirmado
    - 401: No autenticado
    - 502: Error al enviar el email
    """,
)
async def send_confirmation(
    db: AsyncSession = Depends(get_db),
    current_user: Perfil = Depends(get_current_user),
):
    if current_user.verificado:
        raise HTTPException(status_code=400, detail="El email ya está confirmado")

    # Eliminar tokens anteriores
    await db.execute(
        delete(EmailConfirmationToken).where(EmailConfirmationToken.user_id == current_user.id)
    )

    # Crear nuevo token
    token = EmailConfirmationToken(user_id=current_user.id)
    db.add(token)
    await db.commit()

    # Obtener email
    email = await _get_user_email(current_user.id, db)

    # Enviar email
    success = await send_confirmation_email(email, token.token, current_user.nombre_completo)
    if not success:
        raise HTTPException(status_code=502, detail="Error al enviar el email de confirmación")

    return {"detail": "Email de confirmación enviado"}


@router.post(
    "/resend-confirmation",
    status_code=200,
    summary="Reenviar email de confirmación",
    description="""
    Reenvía el email de confirmación a un usuario que no lo recibió.
    
    **No requiere autenticación** - el email se pasa en el body.
    
    ## Rate Limit: 1 solicitud por minuto por IP
    
    ## Request Body:
    ```json
    {
      "email": "usuario@ejemplo.com"
    }
    ```
    
    ## Errores:
    - 400: El email ya está confirmado
    - 404: Usuario no encontrado
    - 429: Esperar 1 minuto antes de reenviar
    """,
)
async def resend_confirmation(
    email: str,
    db: AsyncSession = Depends(get_db),
):
    # Buscar usuario por email en Supabase
    import httpx
    url = f"{settings.supabase_url}/auth/v1/admin/users/by_email"
    headers = {
        "Authorization": f"Bearer {settings.supabase_service_role_key}",
        "apikey": settings.supabase_service_role_key,
    }
    async with httpx.AsyncClient(timeout=10.0) as client:
        r = await client.get(url, headers=headers, params={"email": email})
        if r.status_code != 200:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        user_data = r.json()
        user_id = user_data.get("id")
        if not user_id:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Buscar perfil
    result = await db.execute(select(Perfil).where(Perfil.id == uuid.UUID(user_id)))
    perfil = result.scalar_one_or_none()
    if not perfil:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    if perfil.verificado:
        raise HTTPException(status_code=400, detail="El email ya está confirmado")

    # Verificar si pasó suficiente tiempo desde el último token (1 minuto)
    result = await db.execute(
        select(EmailConfirmationToken)
        .where(EmailConfirmationToken.user_id == perfil.id)
        .where(EmailConfirmationToken.used == False)
        .order_by(EmailConfirmationToken.created_at.desc())
    )
    last_token = result.scalar_one_or_none()
    if last_token and last_token.created_at > datetime.now(timezone.utc) - timedelta(minutes=1):
        raise HTTPException(status_code=429, detail="Espera un minuto antes de solicitar otro email")

    # Eliminar tokens anteriores
    await db.execute(
        delete(EmailConfirmationToken).where(EmailConfirmationToken.user_id == perfil.id)
    )

    # Crear nuevo token
    token = EmailConfirmationToken(user_id=perfil.id)
    db.add(token)
    await db.commit()

    # Enviar email
    success = await send_confirmation_email(email, token.token, perfil.nombre_completo)
    if not success:
        raise HTTPException(status_code=502, detail="Error al enviar el email de confirmación")

    return {"detail": "Email de confirmación reenviado"}


@router.get(
    "/confirm",
    status_code=200,
    summary="Confirmar email",
    description="""
    Confirma el email del usuario mediante el token recibido por email.
    
    **No requiere autenticación** - el token se pasa como query parameter.
    
    ## Parámetros:
    - `token` (required): Token de confirmación recibido por email
    
    ## Respuesta exitosa:
    ```json
    {
      "detail": "Email confirmado correctamente",
      "confirmed": true
    }
    ```
    
    ## Errores:
    - 400: Token inválido o expirado
    - 400: Token ya utilizado
    """,
)
async def confirm_email(
    token: str = Query(..., description="Token de confirmación recibido por email"),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(EmailConfirmationToken).where(EmailConfirmationToken.token == token)
    )
    confirmation = result.scalar_one_or_none()

    if not confirmation:
        raise HTTPException(status_code=400, detail="Token inválido")

    if not confirmation.is_valid:
        raise HTTPException(status_code=400, detail="Token expirado o ya utilizado")

    # Marcar token como usado
    confirmation.used = True
    confirmation.used_at = datetime.now(timezone.utc)

    # Marcar usuario como verificado
    result = await db.execute(select(Perfil).where(Perfil.id == confirmation.user_id))
    perfil = result.scalar_one_or_none()
    if perfil:
        perfil.verificado = True

    await db.commit()

    return {"detail": "Email confirmado correctamente", "confirmed": True}