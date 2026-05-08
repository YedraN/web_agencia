// src/components/notifications/notification-item.tsx

"use client";

import { Notification } from "@/contexts/NotificationContext";

type Props = {
  notification: Notification;
  onRead: (
    id: string
  ) => void;
};

export default function NotificationItem({
  notification,
  onRead,
}: Props) {

  return (
    <div
      onClick={() =>
        onRead(notification.id)
      }
      className={`
        p-4
        border-b
        cursor-pointer
        transition-colors
        hover:bg-muted/50
        ${
          !notification.leida
            ? "bg-muted/30"
            : ""
        }
      `}
    >

      <div className="flex items-start gap-2">

        {!notification.leida && (
          <div
            className="
              mt-1
              h-2
              w-2
              rounded-full
              bg-blue-500
            "
          />
        )}

        <div className="flex-1">

          <p className="font-medium text-sm">
            {notification.titulo}
          </p>

          <p
            className="
              text-sm
              text-muted-foreground
              mt-1
            "
          >
            {notification.mensaje}
          </p>

          <p
            className="
              text-xs
              text-muted-foreground
              mt-2
            "
          >
            {new Date(
              notification.created_at
            ).toLocaleString()}
          </p>

        </div>
      </div>
    </div>
  );
}