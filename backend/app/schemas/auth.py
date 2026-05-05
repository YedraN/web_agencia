from pydantic import BaseModel, Field
from typing import Literal


class OnboardingData(BaseModel):
    nombre_completo: str = Field(..., min_length=2, max_length=100)
    company: str = Field(..., min_length=1, max_length=100)


class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    company: str
    avatar_url: str | None = None
    plan: Literal["free", "starter", "pro", "enterprise"] = "free"

    class Config:
        from_attributes = True
