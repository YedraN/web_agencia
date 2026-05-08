# websocket/routes.py

from fastapi import (
    APIRouter,
    WebSocket,
    WebSocketDisconnect
)

from app.websocket.manager import manager
from app.auth import verify_token

router = APIRouter()

@router.websocket("/ws/notifications")
async def notifications_ws(
    websocket: WebSocket
):

    token = websocket.query_params.get(
        "token"
    )

    if not token:
        await websocket.close()
        return

    user = verify_token(token)

    if not user:
        await websocket.close()
        return

    user_id = str(user.id)

    await manager.connect(
        user_id,
        websocket
    )

    try:

        while True:

            # heartbeat
            await websocket.receive_text()

    except WebSocketDisconnect:

        manager.disconnect(
            user_id,
            websocket
        )