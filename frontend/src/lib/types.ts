export type User = {
  id: string;
  name: string;
  email: string;
  company: string;
  avatarUrl?: string;
  plan: "Starter" | "Pro" | "Enterprise";
};

export type AutomationStatus = "active" | "paused" | "error";

export type Automation = {
  id: string;
  name: string;
  description: string;
  status: AutomationStatus;
  lastExecution?: string;
  nextExecution?: string;
  successRate: number;
  config: Record<string, any>;
};

export type ExecutionStatus = "success" | "error" | "running";

export type Execution = {
  id: string;
  automationId: string;
  automationName: string;
  startTime: string;
  durationMs: number;
  status: ExecutionStatus;
  logPreview: string;
  fullLog: Record<string, any>;
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
  activeAutomations: number;
  executionsToday: number;
  successRate: number;
  pendingAlerts: number;
};
