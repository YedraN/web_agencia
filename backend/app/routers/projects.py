from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.utils.dependencies import get_current_user
from app.models.user import User
from app.models.project import Project
from app.models.organization import OrganizationMember
from app.schemas.project import ProjectResponse

from typing import List

router = APIRouter(prefix="/api/projects", tags=["projects"])


@router.get("", response_model=List[ProjectResponse])
async def get_projects(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    offset = (page - 1) * limit
    result = await db.execute(
        select(Project)
        .join(
            OrganizationMember,
            OrganizationMember.organizacion_id == Project.organizacion_id
        )
        .where(OrganizationMember.usuario_id == current_user.id)
        .options(selectinload(Project.milestones))
        .order_by(Project.creado.desc())
        .offset(offset)
        .limit(limit)
    )

    return result.scalars().unique().all()