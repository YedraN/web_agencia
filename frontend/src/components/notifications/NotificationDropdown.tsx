// src/components/notifications/notification-dropdown.tsx

"use client";

import NotificationItem from "./NotificationItem";

import {
  useNotifications,
} from "@/hooks/useNotifications";

export default function NotificationDropdown() {

  const {
    notifications,
    markAsRead,
  } = useNotifications();

  if (
    notifications.length === 0
  ) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        No notifications
      </div>
    );
  }

  return (
    <div
      className="
        w-[380px]
        max-h-[500px]
        overflow-y-auto
      "
    >
      {notifications.map(
        (notification: any) => (
          <NotificationItem
            key={notification.id}
            notification={
              notification
            }
            onRead={
              markAsRead
            }
          />
        )
      )}
    </div>
  );
}