import uuid
from datetime import datetime
from sqlalchemy import String, ForeignKey, DateTime, func, Text
from sqlalchemy.dialects.postgresql import UUID as PGUUID, JSONB
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class ActivityLog(Base):
    __tablename__ = "registro_actividad"

    id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organizacion_id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("organizaciones.id"), nullable=False)
    usuario_id: Mapped[uuid.UUID | None] = mapped_column(PGUUID(as_uuid=True), nullable=True)
    accion: Mapped[str] = mapped_column(String(100), nullable=False)
    tipo_recurso: Mapped[str] = mapped_column(String(50), nullable=False)
    recurso_id: Mapped[uuid.UUID | None] = mapped_column(PGUUID(as_uuid=True), nullable=True)
    payload: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    creado: Mapped[datetime] = mapped_column("created_at", DateTime(timezone=True), server_default=func.now())
