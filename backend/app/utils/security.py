from jose import jwt, JWTError
from app.config import settings


async def verify_supabase_token(token: str) -> dict | None:
    """Verifica el JWT de Supabase localmente. Sin llamadas de red."""
    try:
        payload = jwt.decode(
            token,
            settings.supabase_jwt_secret,
            algorithms=["HS256"],
            options={"verify_aud": False},
        )
        return payload
    except JWTError:
        return None
