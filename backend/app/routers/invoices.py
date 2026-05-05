from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import Optional
import math
import io

from app.database import get_db
from app.utils.dependencies import get_current_user
from app.models.profile import Perfil
from app.models.invoice import Invoice, InvoiceStatus
from app.models.organization import OrganizationMember, Organization
from app.schemas.invoice import InvoiceCreate, InvoiceResponse, InvoiceListResponse

router = APIRouter(prefix="/api/invoices", tags=["invoices"])


def _get_user_org_subquery(user_id: str):
    return (
        select(OrganizationMember.organizacion_id)
        .where(OrganizationMember.usuario_id == user_id)
        .scalar_subquery()
    )


@router.get("", response_model=InvoiceListResponse)
async def list_invoices(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    status: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
    current_user: Perfil = Depends(get_current_user),
):
    org_subq = _get_user_org_subquery(current_user.id)

    base_query = (
        select(Invoice, Organization.nombre.label("cliente_nombre"))
        .join(Organization, Organization.id == Invoice.organizacion_id)
        .where(Invoice.organizacion_id.in_(org_subq))
    )

    if status:
        try:
            status_enum = InvoiceStatus(status)
            base_query = base_query.where(Invoice.status == status_enum)
        except ValueError:
            raise HTTPException(status_code=400, detail=f"Estado inválido: {status}")

    if search:
        base_query = base_query.where(Invoice.numero.ilike(f"%{search}%"))

    count_query = select(func.count()).select_from(base_query.subquery())
    total_result = await db.execute(count_query)
    total = total_result.scalar_one()

    offset = (page - 1) * page_size
    rows = await db.execute(
        base_query.order_by(Invoice.creado.desc()).offset(offset).limit(page_size)
    )

    items = [
        InvoiceResponse.model_validate(invoice, from_attributes=True).model_copy(
            update={"cliente_nombre": cliente_nombre}
        )
        for invoice, cliente_nombre in rows.all()
    ]

    return InvoiceListResponse(
        items=items,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=math.ceil(total / page_size) if total > 0 else 1,
    )


@router.get("/{invoice_id}", response_model=InvoiceResponse)
async def get_invoice(
    invoice_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: Perfil = Depends(get_current_user),
):
    org_subq = _get_user_org_subquery(current_user.id)

    result = await db.execute(
        select(Invoice, Organization.nombre.label("cliente_nombre"))
        .join(Organization, Organization.id == Invoice.organizacion_id)
        .where(Invoice.id == invoice_id, Invoice.organizacion_id.in_(org_subq))
    )
    row = result.one_or_none()
    if not row:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Factura no encontrada")

    invoice, cliente_nombre = row
    return InvoiceResponse.model_validate(invoice, from_attributes=True).model_copy(
        update={"cliente_nombre": cliente_nombre}
    )


@router.post("", response_model=InvoiceResponse, status_code=status.HTTP_201_CREATED)
async def create_invoice(
    data: InvoiceCreate,
    db: AsyncSession = Depends(get_db),
    current_user: Perfil = Depends(get_current_user),
):
    org_result = await db.execute(
        select(OrganizationMember.organizacion_id)
        .where(OrganizationMember.usuario_id == current_user.id)
        .limit(1)
    )
    org_id = org_result.scalar_one_or_none()

    if not org_id:
        raise HTTPException(status_code=400, detail="El usuario no pertenece a ninguna organización")

    invoice = Invoice(organizacion_id=org_id, **data.model_dump())
    db.add(invoice)
    await db.commit()
    await db.refresh(invoice)
    return invoice


@router.get("/{invoice_id}/pdf")
async def download_invoice_pdf(
    invoice_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: Perfil = Depends(get_current_user),
):
    org_subq = _get_user_org_subquery(current_user.id)

    result = await db.execute(
        select(Invoice).where(
            Invoice.id == invoice_id,
            Invoice.organizacion_id.in_(org_subq),
        )
    )
    invoice = result.scalar_one_or_none()

    if not invoice:
        raise HTTPException(status_code=404, detail="Factura no encontrada")

    try:
        from reportlab.lib.pagesizes import A4
        from reportlab.lib import colors
        from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
        from reportlab.lib.styles import getSampleStyleSheet
        from reportlab.lib.units import cm

        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4)
        styles = getSampleStyleSheet()
        elements = []

        elements.append(Paragraph(f"Factura {invoice.numero}", styles["Title"]))
        elements.append(Spacer(1, 0.5 * cm))

        rows = [
            ["Campo", "Valor"],
            ["Número", invoice.numero],
            ["Estado", invoice.status.value],
            ["Moneda", invoice.moneda],
            ["Subtotal", f"{invoice.subtotal_cents / 100:.2f} {invoice.moneda}"],
            ["Impuestos", f"{invoice.tax_cents / 100:.2f} {invoice.moneda}"],
            ["Total", f"{invoice.total_cents / 100:.2f} {invoice.moneda}"],
        ]
        if invoice.emitida_en:
            rows.append(["Fecha emisión", invoice.emitida_en.strftime("%d/%m/%Y")])
        if invoice.vencimiento:
            rows.append(["Vencimiento", invoice.vencimiento.strftime("%d/%m/%Y")])
        if invoice.notas:
            rows.append(["Notas", invoice.notas])

        table = Table(rows, colWidths=[5 * cm, 10 * cm])
        table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1a1a2e")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, -1), 10),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f5f5f5")]),
            ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#cccccc")),
            ("PADDING", (0, 0), (-1, -1), 6),
        ]))
        elements.append(table)

        doc.build(elements)
        buffer.seek(0)

        return StreamingResponse(
            buffer,
            media_type="application/pdf",
            headers={"Content-Disposition": f'attachment; filename="factura-{invoice.numero}.pdf"'},
        )

    except ImportError:
        raise HTTPException(
            status_code=501,
            detail="La generación de PDF requiere instalar 'reportlab': pip install reportlab",
        )
