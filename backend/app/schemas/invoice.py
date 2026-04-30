from pydantic import BaseModel
from typing import Literal
from datetime import datetime


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

    class Config:
        from_attributes = True
