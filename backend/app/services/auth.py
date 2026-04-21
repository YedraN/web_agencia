from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status
from datetime import datetime
from app.models.user import User
from app.models.organization import Organization, OrganizationMember, OrganizationRole
from app.schemas.auth import UserRegister, UserLogin
from app.utils.security import hash_password, verify_password, create_access_token, create_refresh_token
import re


class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db

    @staticmethod
    def _slugify(text: str) -> str:
        """Convierte un texto a slug URL-friendly"""
        slug = re.sub(r'[^\w\s-]', '', text.lower())
        slug = re.sub(r'[-\s]+', '-', slug)
        return slug.strip('-')

    async def register(self, data: UserRegister) -> dict:
        # Verificar si el email ya existe
        result = await self.db.execute(
            select(User).where(User.email == data.email)
        )
        if result.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El email ya está registrado"
            )

        # Crear usuario
        user = User(
            email=data.email,
            hashed_password=hash_password(data.password),
            full_name=data.name
        )
        self.db.add(user)
        await self.db.flush()  # Para obtener el ID del usuario

        # Crear slug único para la organización
        base_slug = self._slugify(data.company) or "workspace"
        import random
        import string
        random_suffix = ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))
        slug = f"{base_slug}-{random_suffix}"

        # Crear organización
        organization = Organization(
            name=data.company,
            slug=slug
        )
        self.db.add(organization)
        await self.db.flush()

        # Crear membresía
        membership = OrganizationMember(
            organization_id=organization.id,
            user_id=user.id,
            role=OrganizationRole.OWNER,
            accepted_at=datetime.utcnow()
        )
        self.db.add(membership)

        await self.db.commit()
        await self.db.refresh(user)
        await self.db.refresh(organization)

        # Generar tokens
        access_token = create_access_token({"sub": user.id})
        refresh_token = create_refresh_token({"sub": user.id})

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": user.id,
                "name": user.full_name or "Usuario",
                "email": user.email,
                "company": organization.name,
                "avatar_url": user.avatar_url,
                "plan": organization.plan.value
            }
        }

    async def login(self, data: UserLogin) -> dict:
        # Buscar usuario
        result = await self.db.execute(
            select(User).where(User.email == data.email)
        )
        user = result.scalar_one_or_none()

        if not user or not verify_password(data.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Credenciales inválidas",
                headers={"WWW-Authenticate": "Bearer"},
            )

        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Usuario desactivado"
            )

        # Obtener organización principal del usuario
        result = await self.db.execute(
            select(Organization)
            .join(OrganizationMember)
            .where(OrganizationMember.user_id == user.id)
            .order_by(OrganizationMember.created_at)
        )
        organization = result.scalar_one_or_none()

        # Generar tokens
        access_token = create_access_token({"sub": user.id})
        refresh_token = create_refresh_token({"sub": user.id})

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": user.id,
                "name": user.full_name or "Usuario",
                "email": user.email,
                "company": organization.name if organization else "",
                "avatar_url": user.avatar_url,
                "plan": organization.plan.value if organization else "free"
            }
        }
