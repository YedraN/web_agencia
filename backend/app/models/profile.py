import uuid
from datetime import datetime
from sqlalchemy import String, Boolean, DateTime, Text, func
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class Perfil(Base):
    __tablename__ = "perfiles"

    id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True)
    nombre_completo: Mapped[str | None] = mapped_column(Text, nullable=True)
    avatar_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    bio: Mapped[str | None] = mapped_column(Text, nullable=True)
    telefono: Mapped[str | None] = mapped_column(Text, nullable=True)
    zona_horaria: Mapped[str] = mapped_column(String(100), default="Europe/Madrid")
    idioma: Mapped[str] = mapped_column(String(10), default="es")
    activo: Mapped[bool] = mapped_column(Boolean, default=True)
    verificado: Mapped[bool] = mapped_column(Boolean, default=False)
    ultimo_acceso: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
