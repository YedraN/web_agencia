from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.services.search import global_search
from app.utils.dependencies import get_current_user
from app.models.profile import Perfil

router = APIRouter(prefix="/api/search", tags=["Search"])

@router.get("")
async def search(
    q: str = Query(..., min_length=1),
    db: AsyncSession = Depends(get_db),
    current_user: Perfil = Depends(get_current_user)
):
    """
    Búsqueda global en proyectos, clientes y facturas.
    """
    return await global_search(db, q, current_user.id)