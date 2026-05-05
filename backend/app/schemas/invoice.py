from pydantic import BaseModel
from typing import Literal, Optional, List
from datetime import datetime


class InvoiceCreate(BaseModel):
    numero: str
    proyecto_id: Optional[str] = None
    subtotal_cents: int = 0
    tax_cents: int = 0
    total_cents: int = 0
    moneda: str = "EUR"
    vencimiento: Optional[datetime] = None
    notas: Optional[str] = None


class InvoiceResponse(BaseModel):
    id: str
    numero: str
    status: Literal["draft", "sent", "viewed", "paid", "overdue", "cancelled"]
    subtotal_cents: int
    tax_cents: int
    total_cents: int
    paid_cents: int
    moneda: str
    emitida_en: datetime | None
    vencimiento: datetime | None
    pagada_en: datetime | None
    notas: str | None
    proyecto_id: str | None
    creado: datetime
    cliente_nombre: str | None = None

    class Config:
        from_attributes = True


class InvoiceListResponse(BaseModel):
    items: List[InvoiceResponse]
    total: int
    page: int
    page_size: int
    total_pages: int
