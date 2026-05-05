import uuid
from datetime import datetime
from enum import Enum as PyEnum
from sqlalchemy import String, ForeignKey, DateTime, func, Text, Boolean, Enum
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class NotificationSeverity(str, PyEnum):
    INFO = "info"
    WARNING = "warning"
    CRITICAL = "critical"
    SUCCESS = "success"


class Notification(Base):
    __tablename__ = "notificaciones"

    id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organizacion_id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("organizaciones.id"), nullable=False)
    usuario_id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), nullable=False)
    titulo: Mapped[str] = mapped_column(String(255), nullable=False)
    mensaje: Mapped[str | None] = mapped_column(Text, nullable=True)
    severidad: Mapped[NotificationSeverity] = mapped_column(
        Enum(NotificationSeverity, name="severidad_notif", create_type=False),
        default=NotificationSeverity.INFO,
    )
    leida: Mapped[bool] = mapped_column(Boolean, default=False)
    url_accion: Mapped[str | None] = mapped_column(String(500), nullable=True)
    creado: Mapped[datetime] = mapped_column("created_at", DateTime(timezone=True), server_default=func.now())
