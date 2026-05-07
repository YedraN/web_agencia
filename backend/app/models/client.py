import uuid
from datetime import datetime
from sqlalchemy import String, ForeignKey, DateTime, func, Text, Boolean
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base


class Client(Base):
    __tablename__ = "clientes"

    id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organizacion_id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("organizaciones.id"), nullable=False)
    nombre: Mapped[str] = mapped_column(Text, nullable=False)
    empresa: Mapped[str | None] = mapped_column(Text, nullable=True)
    correo: Mapped[str | None] = mapped_column(Text, nullable=True)
    telefono: Mapped[str | None] = mapped_column(Text, nullable=True)
    nif_cif: Mapped[str | None] = mapped_column(Text, nullable=True)
    direccion: Mapped[str | None] = mapped_column(Text, nullable=True)
    ciudad: Mapped[str | None] = mapped_column(Text, nullable=True)
    pais: Mapped[str] = mapped_column(Text, default="ES")
    codigo_postal: Mapped[str | None] = mapped_column(Text, nullable=True)
    notas: Mapped[str | None] = mapped_column(Text, nullable=True)
    activo: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relaciones
    projects: Mapped[list["Project"]] = relationship("Project", backref="client", lazy="selectin")
    invoices: Mapped[list["Invoice"]] = relationship("Invoice", backref="client", lazy="selectin")
