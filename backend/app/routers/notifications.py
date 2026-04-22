from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, and_
from app.database import get_db
from app.models.notification import Notification
from app.schemas.notification import NotificationResponse
from app.utils.dependencies import get_current_user
from app.models.user import User
from typing import List

router = APIRouter(prefix="/api/notifications", tags=["notifications"])

@router.get("", response_model=List[NotificationResponse])
async def get_notifications(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Obtiene las notificaciones del usuario actual"""
    result = await db.execute(
        select(Notification)
        .where(Notification.usuario_id == current_user.id)
        .order_by(Notification.creado.desc())
    )
    return result.scalars().all()

@router.patch("/{notification_id}/read")
async def mark_notification_as_read(
    notification_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Marca una notificación como leída"""
    result = await db.execute(
        update(Notification)
        .where(and_(Notification.id == notification_id, Notification.usuario_id == current_user.id))
        .values(leida=True)
    )
    await db.commit()
    
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Notificación no encontrada")
        
    return {"status": "success"}

@router.patch("/read-all")
async def mark_all_notifications_as_read(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Marca todas las notificaciones del usuario como leídas"""
    await db.execute(
        update(Notification)
        .where(Notification.usuario_id == current_user.id)
        .values(leida=True)
    )
    await db.commit()
    return {"status": "success"}
