import type { FastifyReply, FastifyRequest } from "fastify";
import { HttpError } from "./http.js";
import { env } from "../config/env.js";
import { createAnonSupabaseClient, getServiceSupabaseClient } from "../services/supabase.js";
import { pickFirst } from "./helpers.js";

export type AuthContext = {
  userId: string;
  email: string | null;
  organizationId: string | null;
  memberRole: string | null;
};

function getTokenFromRequest(request: FastifyRequest) {
  const authorization = request.headers.authorization;
  if (authorization?.startsWith("Bearer ")) {
    return authorization.slice("Bearer ".length).trim();
  }

  const cookieToken = request.cookies[env.AUTH_ACCESS_COOKIE];
  return typeof cookieToken === "string" && cookieToken.length > 0 ? cookieToken : null;
}

export async function requireAuth(request: FastifyRequest, _reply: FastifyReply) {
  const accessToken = getTokenFromRequest(request);
  if (!accessToken) {
    throw new HttpError(401, "Authentication required");
  }

  const anonClient = createAnonSupabaseClient(accessToken);
  const { data: authData, error: authError } = await anonClient.auth.getUser(accessToken);
  if (authError || !authData.user) {
    throw new HttpError(401, "Invalid or expired session", authError?.message);
  }

  const serviceClient = getServiceSupabaseClient();
  const { data: memberships, error: membershipError } = await serviceClient
    .from("organization_members")
    .select("organization_id, role, accepted_at")
    .eq("user_id", authData.user.id)
    .order("created_at", { ascending: true });

  if (membershipError) {
    throw new HttpError(500, "Failed to load memberships", membershipError.message);
  }

  const acceptedMemberships = (memberships ?? []).filter((membership) => !membership.accepted_at || membership.accepted_at);
  const firstMembership = pickFirst(acceptedMemberships) ?? pickFirst(memberships ?? []);

  request.auth = {
    userId: authData.user.id,
    email: authData.user.email ?? null,
    organizationId: firstMembership?.organization_id ?? null,
    memberRole: firstMembership?.role ?? null,
  };
}

export function getAuthContext(request: FastifyRequest): AuthContext {
  if (!request.auth) {
    throw new HttpError(500, "Auth context not initialized");
  }

  return request.auth;
}

function getCookieOptions() {
  return {
    httpOnly: true,
    sameSite: env.AUTH_COOKIE_SAME_SITE,
    secure: env.AUTH_COOKIE_SECURE,
    path: "/",
    domain: env.AUTH_COOKIE_DOMAIN,
  };
}

export function clearAuthCookies(reply: FastifyReply) {
  const cookieOptions = getCookieOptions();
  reply.clearCookie(env.AUTH_ACCESS_COOKIE, cookieOptions);
  reply.clearCookie(env.AUTH_REFRESH_COOKIE, cookieOptions);
}

export function setAuthCookies(reply: FastifyReply, accessToken: string, refreshToken: string) {
  const baseCookieOptions = getCookieOptions();

  reply.setCookie(env.AUTH_ACCESS_COOKIE, accessToken, {
    ...baseCookieOptions,
    maxAge: 60 * 60,
  });

  reply.setCookie(env.AUTH_REFRESH_COOKIE, refreshToken, {
    ...baseCookieOptions,
    maxAge: 60 * 60 * 24 * 30,
  });
}
