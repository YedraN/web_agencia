import uuid
from datetime import datetime
from enum import Enum as PyEnum
from sqlalchemy import String, ForeignKey, DateTime, func, Text, Boolean, Enum
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class NotificationSeverity(str, PyEnum):
    INFO = "info"
    WARNING = "warning"
    CRITICAL = "critical"


class Notification(Base):
    __tablename__ = "notificaciones"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    organizacion_id: Mapped[str] = mapped_column(String(36), ForeignKey("organizaciones.id"), nullable=False)
    usuario_id: Mapped[str] = mapped_column(String(36), ForeignKey("usuarios.id"), nullable=False)
    titulo: Mapped[str] = mapped_column(String(255), nullable=False)
    mensaje: Mapped[str | None] = mapped_column(Text, nullable=True)
    severidad: Mapped[NotificationSeverity] = mapped_column(Enum(NotificationSeverity), default=NotificationSeverity.INFO)
    leida: Mapped[bool] = mapped_column(Boolean, default=False)
    url_accion: Mapped[str | None] = mapped_column(String(500), nullable=True)
    creado: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())