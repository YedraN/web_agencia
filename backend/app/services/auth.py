from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status
from datetime import datetime
from app.models.user import User
from app.models.organization import Organization, OrganizationMember, OrganizationRole
from app.schemas.auth import UserRegister, UserLogin
from app.utils.security import hash_password, verify_password, create_access_token, create_refresh_token
import re
import random
import string


class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db

    @staticmethod
    def _slugify(text: str) -> str:
        slug = re.sub(r'[^\w\s-]', '', text.lower())
        slug = re.sub(r'[-\s]+', '-', slug)
        return slug.strip('-')

    async def register(self, data: UserRegister) -> dict:
        result = await self.db.execute(
            select(User).where(User.correo == data.email)
        )
        if result.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El email ya está registrado"
            )

        user = User(
            correo=data.email,
            password_hash=hash_password(data.password),
            nombre_completo=data.name
        )
        self.db.add(user)
        await self.db.flush()

        base_slug = self._slugify(data.company) or "workspace"
        random_suffix = ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))
        slug = f"{base_slug}-{random_suffix}"

        organization = Organization(
            nombre=data.company,
            slug=slug
        )
        self.db.add(organization)
        await self.db.flush()

        membership = OrganizationMember(
            organizacion_id=organization.id,
            usuario_id=user.id,
            rol=OrganizationRole.OWNER,       # era role=
            aceptado_en=datetime.utcnow()
        )
        self.db.add(membership)

        await self.db.commit()
        await self.db.refresh(user)
        await self.db.refresh(organization)

        access_token = create_access_token({"sub": user.id})
        refresh_token = create_refresh_token({"sub": user.id})

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": user.id,
                "name": user.nombre_completo or "Usuario",  # era full_name
                "email": user.correo,                       # era email
                "company": organization.nombre,             # era name
                "avatar_url": user.avatar_url,
                "plan": organization.plan.value
            }
        }

    async def login(self, data: UserLogin) -> dict:
        result = await self.db.execute(
            select(User).where(User.correo == data.email)
        )
        user = result.scalar_one_or_none()

        if not user or not verify_password(data.password, user.password_hash):  # era hashed_password
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Credenciales inválidas",
                headers={"WWW-Authenticate": "Bearer"},
            )

        if not user.activo:                                 # era is_active
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Usuario desactivado"
            )

        result = await self.db.execute(
            select(Organization)
            .join(OrganizationMember)
            .where(OrganizationMember.usuario_id == user.id)  # era user_id
            .order_by(OrganizationMember.creado)              # era created_at
        )
        organization = result.scalar_one_or_none()

        access_token = create_access_token({"sub": user.id})
        refresh_token = create_refresh_token({"sub": user.id})

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": user.id,
                "name": user.nombre_completo or "Usuario",  # era full_name
                "email": user.correo,                       # era email
                "company": organization.nombre if organization else "",  # era name
                "avatar_url": user.avatar_url,
                "plan": organization.plan.value if organization else "free"
            }
        }