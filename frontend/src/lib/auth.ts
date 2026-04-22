import { User } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://web-agencia-backend.onrender.com";

interface LoginData { email: string; password: string; }
interface RegisterData { name: string; company: string; email: string; password: string; }
interface AuthResponse { access_token: string; refresh_token: string; user: User; }

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(data: LoginData): Promise<{ user: User }> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Credenciales inválidas");
  }
  const result: AuthResponse = await response.json();
  localStorage.setItem("access_token", result.access_token);
  return { user: result.user };
}

export async function register(data: RegisterData): Promise<{ user: User }> {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Error al registrar");
  }
  const result: AuthResponse = await response.json();
  localStorage.setItem("access_token", result.access_token);
  return { user: result.user };
}

export async function logout(): Promise<void> {
  localStorage.removeItem("access_token");
  await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await fetch(`${API_URL}/api/users/me`, {
      credentials: "include",
      headers: getAuthHeaders(),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

// Helper reutilizable para fetch autenticado en toda la app
export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  return fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...options.headers,
    },
  });
}