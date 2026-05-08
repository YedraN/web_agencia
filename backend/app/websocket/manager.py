# websocket/manager.py

from collections import defaultdict
from fastapi import WebSocket

class ConnectionManager:

    def __init__(self):
        self.connections = defaultdict(list)

    async def connect(
        self,
        user_id: str,
        websocket: WebSocket
    ):
        await websocket.accept()

        self.connections[user_id].append(
            websocket
        )

    def disconnect(
        self,
        user_id: str,
        websocket: WebSocket
    ):
        if user_id in self.connections:
            self.connections[user_id].remove(
                websocket
            )

            if not self.connections[user_id]:
                del self.connections[user_id]

    async def send_to_user(
        self,
        user_id: str,
        payload: dict
    ):

        if user_id not in self.connections:
            return

        dead_connections = []

        for ws in self.connections[user_id]:

            try:
                await ws.send_json(payload)

            except:
                dead_connections.append(ws)

        for ws in dead_connections:
            self.disconnect(user_id, ws)

manager = ConnectionManager()