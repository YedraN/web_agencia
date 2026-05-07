from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime
from uuid import UUID
from app.models.project import MilestoneStatus

class MilestoneBase(BaseModel):
    nombre: str = Field(..., min_length=1, max_length=255)
    descripcion: Optional[str] = None
    fecha_vencimiento: Optional[datetime] = None
    position: Optional[int] = 0

class MilestoneCreate(MilestoneBase):
    project_id: UUID

class MilestoneUpdate(BaseModel):
    nombre: Optional[str] = Field(None, min_length=1, max_length=255)
    descripcion: Optional[str] = None
    fecha_vencimiento: Optional[datetime] = None
    status: Optional[MilestoneStatus] = None
    position: Optional[int] = None
    completado_en: Optional[datetime] = None

class MilestoneProjectResponse(BaseModel):
    id: UUID
    nombre: str
    
    class Config:
        from_attributes = True

class MilestoneResponse(MilestoneBase):
    id: UUID
    project_id: UUID
    status: MilestoneStatus
    completado_en: Optional[datetime] = None
    creado: datetime
    actualizado: datetime
    project: Optional[MilestoneProjectResponse] = None

    class Config:
        from_attributes = True
