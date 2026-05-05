import uuid
from datetime import datetime
from enum import Enum as PyEnum
from sqlalchemy import String, ForeignKey, DateTime, func, Enum, Text, BigInteger
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base


class ProjectStatus(str, PyEnum):
    DRAFT = "draft"
    PLANNING = "planning"
    IN_PROGRESS = "in_progress"
    REVIEW = "review"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    ON_HOLD = "on_hold"


class MilestoneStatus(str, PyEnum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    BLOCKED = "blocked"


class Project(Base):
    __tablename__ = "proyectos"

    id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organizacion_id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("organizaciones.id"), nullable=False)
    nombre: Mapped[str] = mapped_column(String(255), nullable=False)
    descripcion: Mapped[str | None] = mapped_column(Text, nullable=True)
    estado: Mapped[ProjectStatus] = mapped_column(
        Enum(ProjectStatus, name="estado_proyecto", create_type=False),
        default=ProjectStatus.DRAFT,
    )
    presupuesto_cents: Mapped[int] = mapped_column(BigInteger, default=0)
    precio_cents: Mapped[int] = mapped_column(BigInteger, default=0)
    inicio_en: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    deadline_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    completado_en: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    creado: Mapped[datetime] = mapped_column("created_at", DateTime(timezone=True), server_default=func.now())
    actualizado: Mapped[datetime] = mapped_column("updated_at", DateTime(timezone=True), server_default=func.now())

    milestones: Mapped[list["ProjectMilestone"]] = relationship(
        "ProjectMilestone", back_populates="project", lazy="selectin"
    )


class ProjectMilestone(Base):
    __tablename__ = "hitos_proyecto"

    id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id: Mapped[uuid.UUID] = mapped_column("proyecto_id", PGUUID(as_uuid=True), ForeignKey("proyectos.id"), nullable=False)
    nombre: Mapped[str] = mapped_column(String(255), nullable=False)
    descripcion: Mapped[str | None] = mapped_column(Text, nullable=True)
    fecha_vencimiento: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    completado_en: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    status: Mapped[MilestoneStatus] = mapped_column(
        "estado",
        Enum(MilestoneStatus, name="estado_hito", create_type=False),
        default=MilestoneStatus.PENDING,
    )
    position: Mapped[int] = mapped_column("posicion", default=0)
    creado: Mapped[datetime] = mapped_column("created_at", DateTime(timezone=True), server_default=func.now())
    actualizado: Mapped[datetime] = mapped_column("updated_at", DateTime(timezone=True), server_default=func.now())

    project: Mapped["Project"] = relationship("Project", back_populates="milestones")
