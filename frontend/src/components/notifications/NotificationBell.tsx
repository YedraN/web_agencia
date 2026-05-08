// src/components/notifications/notification-bell.tsx

"use client";

import { Bell } from "lucide-react";

import {
  useNotifications,
} from "@/hooks/useNotifications";

export default function NotificationBell() {

  const {
    unreadCount,
  } = useNotifications();

  return (
    <div className="relative">

      <Bell className="h-5 w-5" />

      {unreadCount > 0 && (
        <div
          className="
            absolute
            -top-1
            -right-1
            min-w-4
            h-4
            rounded-full
            bg-red-500
            text-white
            text-[10px]
            flex
            items-center
            justify-center
            px-1
          "
        >
          {unreadCount}
        </div>
      )}
    </div>
  );
}