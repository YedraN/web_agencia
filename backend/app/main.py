from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.config import settings
from app.routers import auth_router
from app.routers.dashboard import router as dashboard_router
from app.routers.users import router as users_router
from app.routers.notifications import router as notifications_router
from app.routers.projects import router as projects_router
from app.routers.invoices import router as invoices_router
from app.routers.search import router as search_router
from app.routers.admin import router as admin_router
from app.routers.confirmation import router as confirmation_router
from app.routers.milestones import router as milestones_router

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="Vynta API",
    description="""## Introducción
API REST para la gestión de la agencia digital Vynta.

## Autenticación
Todos los endpoints (excepto `/auth/confirm` y `/auth/resend-confirmation`) requieren un token de acceso JWT en el header:
```
Authorization: Bearer <token>
```

El token se obtiene mediante Supabase Auth.

## Rate Limiting
- General: 100 requests/minuto por IP
- Endpoints sensibles tienen límites más restrictivos

## Respuestas
Todas las respuestas siguen el formato:
```json
{ "detail": "..." }
```

Los endpoints que devuelven datos incluyen el objeto correspondiente.""",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)
app.state.limiter = limiter

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(dashboard_router)
app.include_router(users_router)
app.include_router(notifications_router)
app.include_router(projects_router)
app.include_router(invoices_router)
app.include_router(search_router)
app.include_router(admin_router)
app.include_router(confirmation_router)
app.include_router(milestones_router)


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})


@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(status_code=500, content={"detail": "Error interno del servidor"})


@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={
            "detail": "Demasiadas solicitudes. Por favor, inténtalo más tarde.",
            "retry_after": exc.detail,
        },
    )


@app.get("/")
async def root():
    return {"status": "ok", "message": "Web Agencia API v2"}


@app.get("/api/health")
async def health_check():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=settings.port,
        reload=settings.app_env == "development",
    )
