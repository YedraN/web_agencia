from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class ProjectMilestoneResponse(BaseModel):
    id: str
    nombre: str
    descripcion: Optional[str]
    fecha_vencimiento: Optional[datetime]
    completado_en: Optional[datetime]
    status: str
    position: int

    class Config:
        from_attributes = True


class ProjectResponse(BaseModel):
    id: str
    nombre: str
    descripcion: Optional[str]
    estado: str
    creado: datetime
    milestones: List[ProjectMilestoneResponse] = []

    class Config:
        from_attributes = True