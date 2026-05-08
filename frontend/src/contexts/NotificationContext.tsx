// src/contexts/notification-context.tsx

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { toast } from "sonner";

import {
  createNotificationsSocket,
} from "@/lib/websocket";

import {
  fetchNotifications,
  markNotificationAsRead,
} from "@/services/notificationService";

export type Notification = {
  id: string;
  titulo: string;
  mensaje: string;
  leida: boolean;
  severidad: string;
  url_accion?: string | null;
  tipo_recurso?: string | null;
  recurso_id?: string | null;
  created_at: string;
};

type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (
    id: string
  ) => Promise<void>;
};

const NotificationContext =
  createContext<
    NotificationContextType | undefined
  >(undefined);

export function NotificationProvider({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string;
}) {

  const wsRef =
    useRef<WebSocket | null>(null);

  const [
    notifications,
    setNotifications,
  ] = useState<Notification[]>([]);

  const [
    unreadCount,
    setUnreadCount,
  ] = useState(0);

  useEffect(() => {

    if (!token) return;

    loadNotifications();

    connectSocket();

    let heartbeat: NodeJS.Timeout;

    function connectSocket() {

      const ws =
        createNotificationsSocket(
          token
        );

      wsRef.current = ws;

      ws.onopen = () => {

        console.log(
          "Notifications WS connected"
        );

        heartbeat = setInterval(() => {

          if (
            ws.readyState === WebSocket.OPEN
          ) {
            ws.send("ping");
          }

        }, 30000);
      };

      ws.onmessage = (event) => {

        try {

          const payload = JSON.parse(
            event.data
          );

          if (
            payload.event ===
            "notification"
          ) {

            const notif =
              payload.data;

            setNotifications(prev => [
              notif,
              ...prev,
            ]);

            setUnreadCount(
              prev => prev + 1
            );

            toast(notif.titulo, {
              description:
                notif.mensaje,
            });
          }

        } catch (error) {

          console.error(
            "WS parse error",
            error
          );
        }
      };

      ws.onclose = () => {

        console.log(
          "Notifications WS disconnected"
        );

        clearInterval(
          heartbeat
        );

        setTimeout(() => {
          connectSocket();
        }, 3000);
      };

      ws.onerror = (error) => {

        console.error(
          "WS error",
          error
        );

        ws.close();
      };
    }

    async function loadNotifications() {

      try {

        const data =
          await fetchNotifications();

        setNotifications(data);

        setUnreadCount(
          data.filter(
            (n: Notification) =>
              !n.leida
          ).length
        );

      } catch (error) {

        console.error(
          "Error loading notifications",
          error
        );
      }
    }

    return () => {

      clearInterval(
        heartbeat
      );

      wsRef.current?.close();
    };

  }, [token]);

  async function markAsRead(
    id: string
  ) {

    try {

      await markNotificationAsRead(id);

      setNotifications(prev =>
        prev.map(n =>
          n.id === id
            ? {
                ...n,
                leida: true,
              }
            : n
        )
      );

      setUnreadCount(prev =>
        Math.max(prev - 1, 0)
      );

    } catch (error) {

      console.error(
        "Error marking notification as read",
        error
      );
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {

  const context = useContext(
    NotificationContext
  );

  if (!context) {
    throw new Error(
      "useNotifications must be used within NotificationProvider"
    );
  }

  return context;
}