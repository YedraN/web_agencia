from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from enum import Enum
from typing import Optional

class NotificationSeverity(str, Enum):
    INFO = "info"
    WARNING = "warning"
    CRITICAL = "critical"

class NotificationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: str
    title: str = Field(..., validation_alias="titulo")
    message: Optional[str] = Field(None, validation_alias="mensaje")
    severity: NotificationSeverity = Field(..., validation_alias="severidad")
    read: bool = Field(..., validation_alias="leida")
    urlAction: Optional[str] = Field(None, validation_alias="url_accion")
    createdAt: datetime = Field(..., validation_alias="creado")
