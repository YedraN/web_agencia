export type User = {
  id: string;
  name: string;
  email: string;
  company: string;
  avatarUrl?: string;
  plan: "free" | "starter" | "pro" | "enterprise";
  verified?: boolean;
};

export type NotificationSeverity = "info" | "warning" | "critical";

export type Notification = {
  id: string;
  title: string;
  message: string;
  severity: NotificationSeverity;
  createdAt: string;
  read: boolean;
};

export type DashboardStats = {
  activeProjects: number;
  totalSpent: number;
  nextMilestoneDate: string | null;
  unreadInvoices: number;
};

export type InvoiceStatus =
  | "draft"
  | "sent"
  | "viewed"
  | "paid"
  | "overdue"
  | "cancelled";

export type Invoice = {
  id: string;
  numero: string;
  status: InvoiceStatus;
  subtotal_cents: number;
  tax_cents: number;
  total_cents: number;
  paid_cents: number;
  moneda: string;
  emitida_en: string | null;
  vencimiento: string | null;
  pagada_en: string | null;
  notas: string | null;
  creado: string;
  proyecto_id: string | null;
  cliente_nombre: string | null;
};

export type InvoiceListResponse = {
  items: Invoice[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
};

export type InvoiceFilters = {
  status?: InvoiceStatus | "";
  search?: string;
  page?: number;
  page_size?: number;
};

export type ProjectStatus =
  | "draft"
  | "planning"
  | "in_progress"
  | "review"
  | "completed"
  | "cancelled";

export type ProjectMilestone = {
  id: string;
  nombre: string;
  descripcion?: string;
  fecha_vencimiento?: string;
  completado_en?: string;
  status: string;
  position: number;
};

export type Automation = {
  id: string;
  name: string;
  config?: Record<string, unknown>;
};

export type Project = {
  id: string;
  nombre: string;
  descripcion?: string;
  estado: ProjectStatus;
  creado: string;
  milestones: ProjectMilestone[];
};
