from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import auth_router
from app.routers.dashboard import router as dashboard_router
from app.routers.users import router as users_router
from app.routers.notifications import router as notifications_router
from app.routers.projects import router as projects_router
from app.database import engine, Base

app = FastAPI(
    title="Web Agencia API",
    description="API para la gestión de agencia web",
    version="0.1.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth_router)
app.include_router(dashboard_router)
app.include_router(users_router)
app.include_router(notifications_router)
app.include_router(projects_router)


@app.on_event("startup")
async def startup():
    """Crear tablas al iniciar (solo en desarrollo)"""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@app.get("/api/health")
async def health_check():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=settings.port,
        reload=settings.app_env == "development"
    )
