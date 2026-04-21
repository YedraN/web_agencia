from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from datetime import datetime, timedelta
from app.database import get_db
from app.models.invoice import Invoice, InvoiceStatus
from app.models.project import Project, ProjectStatus, ProjectMilestone, MilestoneStatus
from app.models.activity import ActivityLog
from app.schemas.dashboard import DashboardStatsResponse, ActivityItem, MilestoneItem, DashboardDataResponse
from app.utils.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("/stats", response_model=DashboardStatsResponse)
async def get_dashboard_stats(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Obtiene las estadísticas del dashboard para el usuario actual"""

    # Obtener la organización del usuario
    from app.models.organization import OrganizationMember
    result = await db.execute(
        select(OrganizationMember)
        .where(OrganizationMember.user_id == current_user.id)
        .order_by(OrganizationMember.created_at)
    )
    membership = result.scalar_one_or_none()

    if not membership:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario sin organización asignada"
        )

    org_id = membership.organization_id

    # Contar proyectos activos
    result = await db.execute(
        select(func.count(Project.id))
        .where(
            and_(
                Project.organization_id == org_id,
                Project.status.in_(["planning", "in_progress", "review"])
            )
        )
    )
    active_projects = result.scalar() or 0

    # Calcular total gastado (facturas pagadas)
    result = await db.execute(
        select(func.sum(Invoice.total_cents))
        .where(
            and_(
                Invoice.organization_id == org_id,
                Invoice.status == InvoiceStatus.PAID
            )
        )
    )
    total_spent = result.scalar() or 0

    # Contar facturas no leídas/pendientes
    result = await db.execute(
        select(func.count(Invoice.id))
        .where(
            and_(
                Invoice.organization_id == org_id,
                Invoice.status.in_([InvoiceStatus.SENT, InvoiceStatus.VIEWED, InvoiceStatus.OVERDUE])
            )
        )
    )
    unread_invoices = result.scalar() or 0

    # Obtener próximo hito
    result = await db.execute(
        select(ProjectMilestone)
        .join(Project)
        .where(
            and_(
                Project.organization_id == org_id,
                ProjectMilestone.status.in_([MilestoneStatus.PENDING, MilestoneStatus.IN_PROGRESS]),
                ProjectMilestone.due_at != None
            )
        )
        .order_by(ProjectMilestone.due_at)
        .limit(1)
    )
    next_milestone = result.scalar_one_or_none()

    next_milestone_date = None
    if next_milestone and next_milestone.due_at:
        next_milestone_date = next_milestone.due_at.strftime("%b %d, %Y")

    return DashboardStatsResponse(
        activeProjects=active_projects,
        totalSpent=total_spent // 100,  # Convertir cents a euros/dólares
        nextMilestoneDate=next_milestone_date,
        unreadInvoices=unread_invoices
    )


@router.get("/data", response_model=DashboardDataResponse)
async def get_dashboard_data(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Obtiene todos los datos del dashboard"""

    from app.models.organization import OrganizationMember
    result = await db.execute(
        select(OrganizationMember)
        .where(OrganizationMember.user_id == current_user.id)
        .order_by(OrganizationMember.created_at)
    )
    membership = result.scalar_one_or_none()

    if not membership:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario sin organización asignada"
        )

    org_id = membership.organization_id

    # Estadísticas
    result = await db.execute(
        select(func.count(Project.id))
        .where(
            and_(
                Project.organization_id == org_id,
                Project.status.in_(["planning", "in_progress", "review"])
            )
        )
    )
    active_projects = result.scalar() or 0

    result = await db.execute(
        select(func.sum(Invoice.total_cents))
        .where(
            and_(
                Invoice.organization_id == org_id,
                Invoice.status == InvoiceStatus.PAID
            )
        )
    )
    total_spent = (result.scalar() or 0) // 100

    result = await db.execute(
        select(func.count(Invoice.id))
        .where(
            and_(
                Invoice.organization_id == org_id,
                Invoice.status.in_([InvoiceStatus.SENT, InvoiceStatus.VIEWED, InvoiceStatus.OVERDUE])
            )
        )
    )
    unread_invoices = result.scalar() or 0

    result = await db.execute(
        select(ProjectMilestone)
        .join(Project)
        .where(
            and_(
                Project.organization_id == org_id,
                ProjectMilestone.status.in_([MilestoneStatus.PENDING, MilestoneStatus.IN_PROGRESS]),
                ProjectMilestone.due_at != None
            )
        )
        .order_by(ProjectMilestone.due_at)
        .limit(1)
    )
    next_milestone = result.scalar_one_or_none()

    next_milestone_date = next_milestone.due_at.strftime("%b %d, %Y") if next_milestone and next_milestone.due_at else None

    stats = DashboardStatsResponse(
        activeProjects=active_projects,
        totalSpent=total_spent,
        nextMilestoneDate=next_milestone_date,
        unreadInvoices=unread_invoices
    )

    # Actividad reciente (últimos 10 registros)
    result = await db.execute(
        select(ActivityLog)
        .where(ActivityLog.organization_id == org_id)
        .order_by(ActivityLog.created_at.desc())
        .limit(10)
    )
    activities_db = result.scalars().all()

    activities = []
    for activity in activities_db:
        time_ago = _get_time_ago(activity.created_at)
        activities.append(ActivityItem(
            id=activity.id,
            title=activity.action,
            time=time_ago,
            hasDocument=activity.resource_type in ["invoice", "document"]
        ))

    # Milestones
    result = await db.execute(
        select(ProjectMilestone)
        .join(Project)
        .where(
            and_(
                Project.organization_id == org_id,
            )
        )
        .order_by(ProjectMilestone.position)
        .limit(5)
    )
    milestones_db = result.scalars().all()

    milestones = []
    for ms in milestones_db:
        milestones.append(MilestoneItem(
            id=ms.id,
            title=ms.name,
            date=ms.due_at.strftime("%b %d") if ms.due_at else "TBD",
            description=ms.description or "",
            completed=ms.status == MilestoneStatus.COMPLETED
        ))

    return DashboardDataResponse(
        stats=stats,
        activities=activities,
        milestones=milestones
    )


def _get_time_ago(created_at: datetime) -> str:
    """Convierte una fecha a formato relativo"""
    now = datetime.utcnow()
    diff = now - created_at.replace(tzinfo=None)

    if diff.days == 0:
        hours = diff.seconds // 3600
        if hours == 0:
            minutes = diff.seconds // 60
            if minutes < 5:
                return "ahora"
            return f"hace {minutes} minutos"
        return f"hace {hours} horas"
    elif diff.days == 1:
        return "ayer"
    elif diff.days < 7:
        return f"hace {diff.days} días"
    elif diff.days < 30:
        weeks = diff.days // 7
        return f"hace {weeks} semanas"
    else:
        return created_at.strftime("%b %d")
