import uuid
from datetime import datetime
from enum import Enum as PyEnum
from sqlalchemy import String, ForeignKey, DateTime, Text, Boolean, func, Enum
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base


class OrganizationRole(str, PyEnum):
    OWNER = "owner"
    ADMIN = "admin"
    MEMBER = "member"
    VIEWER = "viewer"


class OrganizationPlan(str, PyEnum):
    FREE = "free"
    STARTER = "starter"
    PRO = "pro"
    ENTERPRISE = "enterprise"


class Organization(Base):
    __tablename__ = "organizaciones"

    id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nombre: Mapped[str] = mapped_column(Text, nullable=False)
    slug: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    logo_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    website: Mapped[str | None] = mapped_column(Text, nullable=True)
    plan: Mapped[OrganizationPlan] = mapped_column(
        Enum(OrganizationPlan, name="plan_tipo", create_type=False),
        default=OrganizationPlan.FREE,
    )
    nif_cif: Mapped[str | None] = mapped_column(String(50), nullable=True)
    ciudad: Mapped[str | None] = mapped_column(String(100), nullable=True)
    pais: Mapped[str] = mapped_column(String(10), default="ES")
    activo: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    members: Mapped[list["OrganizationMember"]] = relationship(
        "OrganizationMember", back_populates="organization", lazy="selectin"
    )


class OrganizationMember(Base):
    __tablename__ = "miembros_organizacion"

    id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organizacion_id: Mapped[uuid.UUID] = mapped_column(
        PGUUID(as_uuid=True), ForeignKey("organizaciones.id"), nullable=False
    )
    usuario_id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), nullable=False)
    rol: Mapped[OrganizationRole] = mapped_column(
        Enum(OrganizationRole, name="rol_org", create_type=False),
        default=OrganizationRole.MEMBER,
    )
    aceptado_en: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    organization: Mapped["Organization"] = relationship("Organization", back_populates="members")
