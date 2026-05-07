from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from sqlalchemy.orm import selectinload
import uuid
from typing import List
from datetime import datetime, timezone

from app.database import get_db
from app.models.profile import Perfil
from app.models.project import Project, ProjectMilestone, MilestoneStatus
from app.models.organization import OrganizationMember
from app.schemas.milestone import MilestoneCreate, MilestoneUpdate, MilestoneResponse
from app.utils.dependencies import get_current_user

router = APIRouter(prefix="/api/milestones", tags=["Milestones"])

@router.get(
    "",
    response_model=List[MilestoneResponse],
    summary="Listar todos los hitos",
    description="Devuelve los hitos de los proyectos pertenecientes a la organización del usuario."
)
async def get_milestones(
    db: AsyncSession = Depends(get_db),
    current_user: Perfil = Depends(get_current_user),
    limit: int = Query(50, ge=1, le=100)
):
    result = await db.execute(
        select(ProjectMilestone)
        .join(Project, Project.id == ProjectMilestone.project_id)
        .join(OrganizationMember, OrganizationMember.organizacion_id == Project.organizacion_id)
        .where(OrganizationMember.usuario_id == current_user.id)
        .options(selectinload(ProjectMilestone.project))
        .order_by(ProjectMilestone.fecha_vencimiento.asc().nulls_last(), ProjectMilestone.creado.desc())
        .limit(limit)
    )
    return result.scalars().all()


@router.post(
    "",
    response_model=MilestoneResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Crear hito",
)
async def create_milestone(
    data: MilestoneCreate,
    db: AsyncSession = Depends(get_db),
    current_user: Perfil = Depends(get_current_user),
):
    # Validar acceso al proyecto
    project_result = await db.execute(
        select(Project)
        .join(OrganizationMember, OrganizationMember.organizacion_id == Project.organizacion_id)
        .where(Project.id == data.project_id)
        .where(OrganizationMember.usuario_id == current_user.id)
    )
    project = project_result.scalar_one_or_none()
    
    if not project:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado o sin acceso")

    # Validar fechas si existen
    if data.fecha_vencimiento and project.deadline_at:
        if data.fecha_vencimiento > project.deadline_at:
            raise HTTPException(status_code=400, detail="La fecha del hito no puede ser posterior a la fecha de entrega del proyecto")

    new_milestone = ProjectMilestone(
        project_id=data.project_id,
        nombre=data.nombre,
        descripcion=data.descripcion,
        fecha_vencimiento=data.fecha_vencimiento,
        position=data.position or 0
    )
    
    db.add(new_milestone)
    await db.commit()
    await db.refresh(new_milestone)
    
    # Cargar proyecto para la respuesta
    await db.refresh(new_milestone, ["project"])

    return new_milestone


@router.patch(
    "/{milestone_id}",
    response_model=MilestoneResponse,
    summary="Actualizar hito"
)
async def update_milestone(
    milestone_id: uuid.UUID,
    data: MilestoneUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: Perfil = Depends(get_current_user),
):
    result = await db.execute(
        select(ProjectMilestone)
        .join(Project, Project.id == ProjectMilestone.project_id)
        .join(OrganizationMember, OrganizationMember.organizacion_id == Project.organizacion_id)
        .where(ProjectMilestone.id == milestone_id)
        .where(OrganizationMember.usuario_id == current_user.id)
        .options(selectinload(ProjectMilestone.project))
    )
    milestone = result.scalar_one_or_none()

    if not milestone:
        raise HTTPException(status_code=404, detail="Hito no encontrado o sin acceso")

    update_data = data.model_dump(exclude_unset=True)
    
    if "status" in update_data:
        if update_data["status"] == MilestoneStatus.COMPLETED and milestone.status != MilestoneStatus.COMPLETED:
            update_data["completado_en"] = datetime.now(timezone.utc)
        elif update_data["status"] != MilestoneStatus.COMPLETED:
            update_data["completado_en"] = None

    # Date validation
    if "fecha_vencimiento" in update_data and update_data["fecha_vencimiento"]:
        if milestone.project and milestone.project.deadline_at:
            if update_data["fecha_vencimiento"].replace(tzinfo=timezone.utc) > milestone.project.deadline_at.replace(tzinfo=timezone.utc):
                raise HTTPException(status_code=400, detail="La fecha del hito no puede ser posterior a la fecha de entrega del proyecto")

    for key, value in update_data.items():
        setattr(milestone, key, value)

    await db.commit()
    await db.refresh(milestone)
    return milestone
