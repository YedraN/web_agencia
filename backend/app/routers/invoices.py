from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from app.database import get_db
from app.utils.dependencies import get_current_user
from app.models.user import User
from app.models.invoice import Invoice
from app.models.organization import OrganizationMember
from app.schemas.invoice import InvoiceResponse

router = APIRouter(prefix="/api/invoices", tags=["invoices"])


@router.get("", response_model=List[InvoiceResponse])
async def get_invoices(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    offset = (page - 1) * limit
    result = await db.execute(
        select(Invoice)
        .join(
            OrganizationMember,
            OrganizationMember.organizacion_id == Invoice.organizacion_id
        )
        .where(OrganizationMember.usuario_id == current_user.id)
        .order_by(Invoice.creado.desc())
        .offset(offset)
        .limit(limit)
    )
    return result.scalars().unique().all()


@router.get("/{invoice_id}", response_model=InvoiceResponse)
async def get_invoice(
    invoice_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = await db.execute(
        select(Invoice)
        .join(
            OrganizationMember,
            OrganizationMember.organizacion_id == Invoice.organizacion_id
        )
        .where(
            Invoice.id == invoice_id,
            OrganizationMember.usuario_id == current_user.id
        )
    )
    invoice = result.scalar_one_or_none()
    if not invoice:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Factura no encontrada")
    return invoice
