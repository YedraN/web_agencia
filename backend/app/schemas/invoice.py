from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


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
    status: str
    subtotal_cents: int
    tax_cents: int
    total_cents: int
    paid_cents: int
    moneda: str
    emitida_en: Optional[datetime]
    vencimiento: Optional[datetime]
    pagada_en: Optional[datetime]
    notas: Optional[str]
    creado: datetime
    proyecto_id: Optional[str]
    cliente_nombre: Optional[str] = None

    class Config:
        from_attributes = True


class InvoiceListResponse(BaseModel):
    items: List[InvoiceResponse]
    total: int
    page: int
    page_size: int
    total_pages: int
