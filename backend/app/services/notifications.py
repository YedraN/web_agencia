# services/notifications.py

from app.websocket.manager import manager

async def create_notification(
    supabase,
    *,
    organization_id,
    user_id,
    titulo,
    mensaje,
    severidad="info",
    url_accion=None,
    tipo_recurso=None,
    recurso_id=None
):

    result = (
        supabase
        .table("notifications")
        .insert({
            "organizacion_id":
                organization_id,

            "usuario_id":
                user_id,

            "titulo":
                titulo,

            "mensaje":
                mensaje,

            "severidad":
                severidad,

            "url_accion":
                url_accion,

            "tipo_recurso":
                tipo_recurso,

            "recurso_id":
                recurso_id
        })
        .execute()
    )

    notification = result.data[0]

    # realtime push
    await manager.send_to_user(
        str(user_id),
        {
            "event":
                "notification",

            "data":
                notification
        }
    )

    return notification