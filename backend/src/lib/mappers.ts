type DbStatus = string | null | undefined;

export function mapOrganizationPlan(plan: string | null | undefined) {
  switch ((plan ?? "").toLowerCase()) {
    case "enterprise":
      return "Enterprise" as const;
    case "pro":
      return "Pro" as const;
    case "starter":
    case "free":
    default:
      return "Starter" as const;
  }
}

export function mapAutomationStatus(status: DbStatus) {
  switch ((status ?? "").toLowerCase()) {
    case "active":
      return "active" as const;
    case "error":
      return "error" as const;
    case "paused":
    case "draft":
    default:
      return "paused" as const;
  }
}

export function mapRunStatus(status: DbStatus) {
  switch ((status ?? "").toLowerCase()) {
    case "success":
      return "success" as const;
    case "error":
      return "error" as const;
    case "running":
    case "pending":
    default:
      return "running" as const;
  }
}
