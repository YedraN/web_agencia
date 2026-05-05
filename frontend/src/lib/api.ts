import { DashboardStats, Invoice, InvoiceFilters, InvoiceListResponse, Notification, Project, User } from "./types";

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
  getInvoices: (filters: InvoiceFilters = {}) => {
    const params = new URLSearchParams();
    if (filters.page) params.set("page", String(filters.page));
    if (filters.page_size) params.set("page_size", String(filters.page_size));
    if (filters.status) params.set("status", filters.status);
    if (filters.search) params.set("search", filters.search);
    const qs = params.toString();
    return fetchAPI<InvoiceListResponse>(`/api/invoices${qs ? `?${qs}` : ""}`);
  },
  getInvoice: (id: string) => fetchAPI<Invoice>(`/api/invoices/${id}`),
  createInvoice: (data: {
    numero: string;
    proyecto_id?: string;
    subtotal_cents?: number;
    tax_cents?: number;
    total_cents?: number;
    moneda?: string;
    vencimiento?: string;
    notas?: string;
  }) =>
    fetchAPI<Invoice>("/api/invoices", { method: "POST", body: JSON.stringify(data) }),
  downloadInvoicePdf: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/invoices/${id}/pdf`, { credentials: "include" });
    if (!response.ok) throw new Error(`Error al descargar PDF: ${response.status}`);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `factura-${id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  },
};
