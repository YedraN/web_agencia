import { supabase } from "./supabase";
import { User } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://web-agencia-backend.onrender.com";

interface LoginData { email: string; password: string }
interface RegisterData { name: string; company: string; email: string; password: string }

export async function login(data: LoginData): Promise<{ user: User }> {
  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  if (error) {
    if (error.message.toLowerCase().includes("email not confirmed")) {
      throw new Error("EMAIL_NOT_CONFIRMED");
    }
    throw new Error(error.message);
  }

  // Fetch full profile from backend (org, plan, etc.)
  const token = authData.session.access_token;
  const res = await fetch(`${API_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.ok) {
    const user: User = await res.json();
    return { user };
  }

  // Fallback: build user from Supabase data only
  return {
    user: {
      id: authData.user.id,
      name: authData.user.user_metadata?.nombre_completo || authData.user.email?.split("@")[0] || "",
      email: authData.user.email || "",
      company: "",
      plan: "free",
    },
  };
}

export async function resendVerification(email: string): Promise<void> {
  const { error } = await supabase.auth.resend({ type: "signup", email });
  if (error) throw new Error(error.message);
}

export async function resendConfirmationEmail(email: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/auth/resend-confirmation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "Error al reenviar el email");
  }
}

export async function register(data: RegisterData): Promise<{ user: User; needsEmailVerification?: boolean }> {
  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: { data: { nombre_completo: data.name, company: data.company } },
  });

  if (error) {
    // Supabase returns this when the email is already confirmed
    if (error.message.toLowerCase().includes("already registered") || error.message.toLowerCase().includes("already exists")) {
      throw new Error("EMAIL_ALREADY_REGISTERED");
    }
    throw new Error(error.message);
  }

  // Email confirmation required — session is null
  if (!authData.session) {
    return { user: { id: "", name: data.name, email: data.email, company: data.company, plan: "free" }, needsEmailVerification: true };
  }

  // Setup org via backend
  const res = await fetch(`${API_URL}/api/auth/onboarding`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authData.session.access_token}`,
    },
    body: JSON.stringify({ nombre_completo: data.name, company: data.company }),
  });

  if (!res.ok) {
    // 409 means the org was already configured (e.g. retry after network error) — not fatal
    if (res.status === 409) {
      return {
        user: {
          id: authData.user?.id || "",
          name: data.name,
          email: data.email,
          company: data.company,
          plan: "free",
        },
      };
    }
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Error al configurar tu cuenta");
  }

  const user: User = await res.json();
  return { user };
}

export async function logout(): Promise<void> {
  await supabase.auth.signOut();
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  try {
    const res = await fetch(`${API_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const { data: { session } } = await supabase.auth.getSession();
  return fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
      ...options.headers,
    },
  });
}
