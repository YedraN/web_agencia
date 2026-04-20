export function splitFullName(fullName: string) {
  const trimmed = fullName.trim();
  const [firstName, ...rest] = trimmed.split(/\s+/);

  return {
    firstName: firstName || trimmed,
    lastName: rest.length ? rest.join(" ") : null,
  };
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 48);
}

export function pickFirst<T>(value: T[] | T | null | undefined): T | null {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value ?? null;
}

export function safeJsonParse<T>(value: unknown, fallback: T): T {
  if (value === null || value === undefined) {
    return fallback;
  }

  return value as T;
}
