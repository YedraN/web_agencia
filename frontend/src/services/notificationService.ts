// src/services/notification-service.ts

export async function fetchNotifications() {

  const response = await fetch(
    "/api/notifications"
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch notifications"
    );
  }

  return response.json();
}

export async function markNotificationAsRead(
  id: string
) {

  const response = await fetch(
    `/api/notifications/${id}/read`,
    {
      method: "PATCH",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to mark notification as read"
    );
  }

  return response.json();
}