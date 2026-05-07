import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from app.models import Project, Client, Invoice, OrganizationMember

async def global_search(db: AsyncSession, query: str, user_id: uuid.UUID):
    # Obtener IDs de las organizaciones a las que pertenece el usuario
    org_ids_query = await db.execute(
        select(OrganizationMember.organizacion_id)
        .where(OrganizationMember.usuario_id == user_id)
    )
    org_ids = [row[0] for row in org_ids_query.all()]

    if not org_ids:
        return {
            "projects": [],
            "clients": [],
            "invoices": [],
            "bookings": []
        }

    search_pattern = f"%{query}%"

    # Buscar proyectos
    projects_result = await db.execute(
        select(Project.id, Project.nombre)
        .where(Project.organizacion_id.in_(org_ids))
        .where(Project.nombre.ilike(search_pattern))
        .limit(5)
    )
    projects = [{"id": str(p.id), "title": p.nombre} for p in projects_result.all()]

    # Buscar clientes
    clients_result = await db.execute(
        select(Client.id, Client.nombre)
        .where(Client.organizacion_id.in_(org_ids))
        .where(Client.nombre.ilike(search_pattern))
        .limit(5)
    )
    clients = [{"id": str(c.id), "name": c.nombre} for c in clients_result.all()]

    # Buscar facturas
    invoices_result = await db.execute(
        select(Invoice.id, Invoice.numero)
        .where(Invoice.organizacion_id.in_(org_ids))
        .where(Invoice.numero.ilike(search_pattern))
        .limit(5)
    )
    invoices = [{"id": str(i.id), "invoice_number": i.numero} for i in invoices_result.all()]

    # Para bookings, como aún no hay tabla, devolvemos vacío o buscamos en hitos si aplica
    # Por ahora devolvemos vacío para no romper la interfaz pero mantener la estructura
    bookings = []

    return {
        "projects": projects,
        "clients": clients,
        "invoices": invoices,
        "bookings": bookings
    }