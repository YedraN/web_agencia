import httpx
from app.config import settings


async def verify_supabase_token(token: str) -> dict | None:
    """Verifica el token contra la API de Supabase Auth y devuelve {sub, email}."""
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            resp = await client.get(
                f"{settings.supabase_url}/auth/v1/user",
                headers={
                    "Authorization": f"Bearer {token}",
                    "apikey": settings.supabase_service_role_key,
                },
            )
        if resp.status_code == 200:
            data = resp.json()
            return {"sub": data["id"], "email": data.get("email", "")}
    except httpx.RequestError:
        pass
    return None
