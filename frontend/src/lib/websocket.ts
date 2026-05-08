// src/lib/websocket.ts

export function createNotificationsSocket(
  token: string
) {

  return new WebSocket(
    `${process.env.NEXT_PUBLIC_WS_URL}/ws/notifications?token=${token}`
  );
}