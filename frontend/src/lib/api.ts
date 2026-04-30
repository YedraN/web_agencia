import { DashboardStats, Invoice, Notification, User, Project } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://web-agencia-backend.onrender.com";

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || `Error ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  // AUTH
  login: (data: { email: string; password: string }) =>
    fetchAPI<{ user: User }>("/api/auth/login", { method: "POST", body: JSON.stringify(data) }),
  register: (data: { name: string; company: string; email: string; password: string }) =>
    fetchAPI<{ user: User }>("/api/auth/register", { method: "POST", body: JSON.stringify(data) }),
  logout: () => fetchAPI("/api/auth/logout", { method: "POST" }),

  // DASHBOARD
  getDashboardStats: () => fetchAPI<DashboardStats>("/api/dashboard/stats"),
  getDashboardData: () => fetchAPI("/api/dashboard/data"),

  // NOTIFICATIONS
  getNotifications: () => fetchAPI<Notification[]>("/api/notifications"),
  markNotificationRead: (id: string) =>
    fetchAPI(`/api/notifications/${id}/read`, { method: "PATCH" }),
  markAllNotificationsRead: () =>
    fetchAPI("/api/notifications/read-all", { method: "PATCH" }),

  // USER
  getProfile: () => fetchAPI<User>("/api/users/me"),

  // PROJECTS
  getProjects: (page = 1, limit = 20) =>
    fetchAPI<Project[]>(`/api/projects?page=${page}&limit=${limit}`),
  getProject: (id: string) => fetchAPI<Project>(`/api/projects/${id}`),

  // INVOICES
  getInvoices: (page = 1, limit = 20) =>
    fetchAPI<Invoice[]>(`/api/invoices?page=${page}&limit=${limit}`),
  getInvoice: (id: string) => fetchAPI<Invoice>(`/api/invoices/${id}`),
};
