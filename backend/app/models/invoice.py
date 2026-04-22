import uuid
from datetime import datetime
from enum import Enum as PyEnum
from sqlalchemy import String, ForeignKey, DateTime, func, Enum, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class InvoiceStatus(str, PyEnum):
    DRAFT = "draft"
    SENT = "sent"
    VIEWED = "viewed"
    PAID = "paid"
    OVERDUE = "overdue"
    CANCELLED = "cancelled"


class Invoice(Base):
    __tablename__ = "facturas"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    organizacion_id: Mapped[str] = mapped_column(String(36), ForeignKey("organizaciones.id"), nullable=False)
    proyecto_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("proyectos.id"), nullable=True)
    numero: Mapped[str] = mapped_column(String(100), nullable=False)
    status: Mapped[InvoiceStatus] = mapped_column(Enum(InvoiceStatus), default=InvoiceStatus.DRAFT)
    subtotal_cents: Mapped[int] = mapped_column(Integer, default=0)
    tax_cents: Mapped[int] = mapped_column(Integer, default=0)
    total_cents: Mapped[int] = mapped_column(Integer, default=0)
    paid_cents: Mapped[int] = mapped_column(Integer, default=0)
    moneda: Mapped[str] = mapped_column(String(3), default="EUR")
    emitida_en: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    vencimiento: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    pagada_en: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    ruta_pdf: Mapped[str | None] = mapped_column(String(500), nullable=True)
    notas: Mapped[str | None] = mapped_column(Text, nullable=True)
    creado: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    actualizado: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
