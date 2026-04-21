from fastapi import APIRouter, Depends, Response
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.auth import UserRegister, UserLogin, TokenResponse
from app.services.auth import AuthService

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=TokenResponse, status_code=201)
async def register(
    data: UserRegister,
    response: Response,
    db: AsyncSession = Depends(get_db)
):
    """Registra un nuevo usuario con su organización"""
    auth_service = AuthService(db)
    result = await auth_service.register(data)

    # Setear cookies
    response.set_cookie(
        key="wa_access_token",
        value=result["access_token"],
        httponly=True,
        max_age=3600,  # 1 hora
        samesite="lax"
    )
    response.set_cookie(
        key="wa_refresh_token",
        value=result["refresh_token"],
        httponly=True,
        max_age=2592000,  # 30 días
        samesite="lax"
    )

    return result


@router.post("/login", response_model=TokenResponse)
async def login(
    data: UserLogin,
    response: Response,
    db: AsyncSession = Depends(get_db)
):
    """Inicia sesión con email y contraseña"""
    auth_service = AuthService(db)
    result = await auth_service.login(data)

    # Setear cookies
    response.set_cookie(
        key="wa_access_token",
        value=result["access_token"],
        httponly=True,
        max_age=3600,
        samesite="lax"
    )
    response.set_cookie(
        key="wa_refresh_token",
        value=result["refresh_token"],
        httponly=True,
        max_age=2592000,
        samesite="lax"
    )

    return result


@router.post("/logout")
async def logout(response: Response):
    """Cierra la sesión del usuario"""
    response.delete_cookie("wa_access_token")
    response.delete_cookie("wa_refresh_token")
    return {"success": True}
