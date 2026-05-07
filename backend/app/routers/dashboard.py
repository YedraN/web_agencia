"""
Módulo de dashboard.

Endpoints para obtener datos del dashboard del usuario:
- Estadísticas generales (proyectos, facturas, hitos próximos)
- Actividad reciente
- Próximos hitos de proyectos

## Autenticación: Token JWT de Supabase (Bearer token)
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from datetime import datetime
from app.database import get_db
from app.models.invoice import Invoice, InvoiceStatus
from app.models.project import Project, ProjectStatus, ProjectMilestone, MilestoneStatus
from app.models.activity import ActivityLog
from app.models.organization import OrganizationMember
from app.schemas.dashboard import DashboardStatsResponse, ActivityItem, MilestoneItem, DashboardDataResponse
from app.utils.dependencies import get_current_user
from app.models.profile import Perfil

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


# ---------------------------------------------------------------------------
# Query helpers
# ---------------------------------------------------------------------------

async def _get_org_id(db: AsyncSession, user_id: str) -> str:
    result = await db.execute(
        select(OrganizationMember)
        .where(OrganizationMember.usuario_id == user_id)
        .order_by(OrganizationMember.created_at)
    )
    membership = result.scalar_one_or_none()
    if not membership:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario sin organización asignada"
        )
    return membership.organizacion_id


async def _count_active_projects(db: AsyncSession, org_id: str) -> int:
    result = await db.execute(
        select(func.count(Project.id))
        .where(
            and_(
                Project.organizacion_id == org_id,
                Project.estado.in_([
                    ProjectStatus.PLANNING,
                    ProjectStatus.IN_PROGRESS,
                    ProjectStatus.REVIEW,
                ])
            )
        )
    )
    return result.scalar() or 0


async def _sum_paid_invoices(db: AsyncSession, org_id: str) -> int:
    """Returns total paid in whole currency units (cents / 100)."""
    result = await db.execute(
        select(func.sum(Invoice.total_cents))
        .where(
            and_(
                Invoice.organizacion_id == org_id,
                Invoice.status == InvoiceStatus.PAID,
            )
        )
    )
    return (result.scalar() or 0) // 100


async def _count_pending_invoices(db: AsyncSession, org_id: str) -> int:
    result = await db.execute(
        select(func.count(Invoice.id))
        .where(
            and_(
                Invoice.organizacion_id == org_id,
                Invoice.status.in_([
                    InvoiceStatus.SENT,
                    InvoiceStatus.VIEWED,
                    InvoiceStatus.OVERDUE,
                ])
            )
        )
    )
    return result.scalar() or 0


async def _get_next_milestone_date(db: AsyncSession, org_id: str) -> str | None:
    result = await db.execute(
        select(ProjectMilestone)
        .join(Project)
        .where(
            and_(
                Project.organizacion_id == org_id,
                ProjectMilestone.status.in_([
                    MilestoneStatus.PENDING,
                    MilestoneStatus.IN_PROGRESS,
                ]),
                ProjectMilestone.fecha_vencimiento != None,
            )
        )
        .order_by(ProjectMilestone.fecha_vencimiento)
        .limit(1)
    )
    milestone = result.scalar_one_or_none()
    if milestone and milestone.fecha_vencimiento:
        return milestone.fecha_vencimiento.strftime("%b %d, %Y")
    return None


async def _build_stats(db: AsyncSession, org_id: str) -> DashboardStatsResponse:
    active_projects, total_spent, unread_invoices, next_milestone_date = (
        await _count_active_projects(db, org_id),
        await _sum_paid_invoices(db, org_id),
        await _count_pending_invoices(db, org_id),
        await _get_next_milestone_date(db, org_id),
    )
    return DashboardStatsResponse(
        activeProjects=active_projects,
        totalSpent=total_spent,
        nextMilestoneDate=next_milestone_date,
        unreadInvoices=unread_invoices,
    )


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.get("/stats", response_model=DashboardStatsResponse)
async def get_dashboard_stats(
    db: AsyncSession = Depends(get_db),
    current_user: Perfil = Depends(get_current_user),
):
    org_id = await _get_org_id(db, current_user.id)
    return await _build_stats(db, org_id)


@router.get("/data", response_model=DashboardDataResponse)
async def get_dashboard_data(
    db: AsyncSession = Depends(get_db),
    current_user: Perfil = Depends(get_current_user),
):
    org_id = await _get_org_id(db, current_user.id)
    stats = await _build_stats(db, org_id)

    # Recent activity
    result = await db.execute(
        select(ActivityLog)
        .where(ActivityLog.organizacion_id == org_id)
        .order_by(ActivityLog.creado.desc())
        .limit(10)
    )
    activities = [
        ActivityItem(
            id=activity.id,
            title=activity.accion,
            time=_get_time_ago(activity.creado),
            hasDocument=activity.tipo_recurso in ["invoice", "document"],
        )
        for activity in result.scalars().all()
    ]

    # Upcoming milestones
    result = await db.execute(
        select(ProjectMilestone)
        .join(Project)
        .where(Project.organizacion_id == org_id)
        .order_by(ProjectMilestone.position)
        .limit(5)
    )
    milestones = [
        MilestoneItem(
            id=ms.id,
            title=ms.nombre,
            date=ms.fecha_vencimiento.strftime("%b %d") if ms.fecha_vencimiento else "TBD",
            description=ms.descripcion or "",
            completed=ms.status == MilestoneStatus.COMPLETED,
        )
        for ms in result.scalars().all()
    ]

    return DashboardDataResponse(stats=stats, activities=activities, milestones=milestones)


# ---------------------------------------------------------------------------
# Utilities
# ---------------------------------------------------------------------------

def _get_time_ago(created_at: datetime) -> str:
    diff = datetime.utcnow() - created_at.replace(tzinfo=None)
    if diff.days == 0:
        hours = diff.seconds // 3600
        if hours == 0:
            minutes = diff.seconds // 60
            return "ahora" if minutes < 5 else f"hace {minutes} minutos"
        return f"hace {hours} horas"
    if diff.days == 1:
        return "ayer"
    if diff.days < 7:
        return f"hace {diff.days} días"
    if diff.days < 30:
        return f"hace {diff.days // 7} semanas"
    return created_at.strftime("%b %d")
