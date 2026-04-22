import { Automation, DashboardStats, Execution, Notification, User, Project } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://web-agencia-backend.onrender.com";

// Interceptor for standardizing API responses and handling auth (if added later)
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  // NOTE FOR BACKEND: Authentication headers (e.g. Bearer token) should be processed via HTTP-only cookies
  // or injected here if using access tokens in localStorage.
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  // ==========================================
  // AUTHENTICATION
  // ==========================================
  // Backend should set an HTTP-only cookie containing the JWT upon success.
  login: (data: any) => fetchAPI<{ user: User }>("/api/auth/login", { method: "POST", body: JSON.stringify(data) }),
  register: (data: any) => fetchAPI<{ user: User }>("/api/auth/register", { method: "POST", body: JSON.stringify(data) }),
  logout: () => fetchAPI("/api/auth/logout", { method: "POST" }),

  // ==========================================
  // DASHBOARD
  // ==========================================
  // Returns top-level KPIs for the currently authenticated user
  getDashboardStats: () => fetchAPI<DashboardStats>("/api/dashboard/stats"),

  // ==========================================
  // AUTOMATIONS
  // ==========================================
  // GET: List all automations
  getAutomations: () => fetchAPI<Automation[]>("/api/automations"),
  // GET: Single automation by ID
  getAutomation: (id: string) => fetchAPI<Automation>(`/api/automations/${id}`),
  // PATCH: Activate/Deactivate automation
  toggleAutomation: (id: string, active: boolean) =>
    fetchAPI<Automation>(`/api/automations/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ active })
    }),
  // PATCH: Update configuration (from the slide-over panel)
  updateAutomationConfig: (id: string, config: Record<string, any>) =>
    fetchAPI<Automation>(`/api/automations/${id}/config`, {
      method: "PATCH",
      body: JSON.stringify({ config })
    }),

  // ==========================================
  // EXECUTIONS HISTORY
  // ==========================================
  // GET: List recent executions (with optional filters)
  getExecutions: (params?: Record<string, string>) => {
    const query = params ? new URLSearchParams(params).toString() : "";
    return fetchAPI<Execution[]>(`/api/executions${query ? `?${query}` : ""}`);
  },

  // ==========================================
  // NOTIFICATIONS
  // ==========================================
  // GET: List notifications
  getNotifications: () => fetchAPI<Notification[]>("/api/notifications"),
  // PATCH: Mark notification as read
  markNotificationRead: (id: string) =>
    fetchAPI(`/api/notifications/${id}/read`, { method: "PATCH" }),
  // PATCH: Mark all as read
  markAllNotificationsRead: () =>
    fetchAPI("/api/notifications/read-all", { method: "PATCH" }),

  // ==========================================
  // USER PROFILES & SETTINGS
  // ==========================================
  getProfile: () => fetchAPI<User>("/api/users/me"),
  updateProfile: (data: Partial<User>) =>
    fetchAPI<User>("/api/users/me", { method: "PATCH", body: JSON.stringify(data) }),

  // ==========================================
  // PROJECTS
  // ==========================================
  // ==========================================
  // PROJECTS
  // ==========================================

  // GET: List all projects for current user
  getProjects: () => fetchAPI<Project[]>("/api/projects"),

  // GET: Single project by ID
  getProject: (id: string) =>
    fetchAPI<Project>(`/api/projects/${id}`),

  // POST: Create new project
  createProject: (data: {
    nombre: string;
    descripcion?: string;
  }) =>
    fetchAPI<Project>("/api/projects", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // PATCH: Update project
  updateProject: (
    id: string,
    data: Partial<{
      nombre: string;
      descripcion: string;
      estado: string;
    }>
  ) =>
    fetchAPI<Project>(`/api/projects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  // DELETE: Remove project
  deleteProject: (id: string) =>
    fetchAPI<{ success: boolean }>(`/api/projects/${id}`, {
      method: "DELETE",
    }),
};
