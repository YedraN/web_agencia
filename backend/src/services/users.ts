import { HttpError } from "../lib/http.js";
import { mapOrganizationPlan } from "../lib/mappers.js";
import { getServiceSupabaseClient } from "./supabase.js";

type FrontendUser = {
  id: string;
  name: string;
  email: string;
  company: string;
  avatarUrl?: string;
  plan: "Starter" | "Pro" | "Enterprise";
};

export async function loadFrontendUser(userId: string, emailFallback?: string | null): Promise<FrontendUser> {
  const serviceClient = getServiceSupabaseClient();

  const { data: profile, error: profileError } = await serviceClient
    .from("profiles")
    .select("id, full_name, avatar_url")
    .eq("id", userId)
    .maybeSingle();

  if (profileError) {
    throw new HttpError(500, "Failed to load profile", profileError.message);
  }

  const { data: membership, error: membershipError } = await serviceClient
    .from("organization_members")
    .select("organization_id")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (membershipError) {
    throw new HttpError(500, "Failed to load organization membership", membershipError.message);
  }

  let organization: { name: string | null; plan: string | null } | null = null;

  if (membership?.organization_id) {
    const { data: organizationData, error: organizationError } = await serviceClient
      .from("organizations")
      .select("name, plan")
      .eq("id", membership.organization_id)
      .maybeSingle();

    if (organizationError) {
      throw new HttpError(500, "Failed to load organization", organizationError.message);
    }

    organization = organizationData;
  }

  return {
    id: userId,
    name: profile?.full_name ?? "Usuario",
    email: emailFallback ?? "",
    company: organization?.name ?? "",
    avatarUrl: profile?.avatar_url ?? undefined,
    plan: mapOrganizationPlan(organization?.plan),
  };
}

export async function updateFrontendUser(
  userId: string,
  payload: { name?: string; avatarUrl?: string; company?: string },
  emailFallback?: string | null,
): Promise<FrontendUser> {
  const serviceClient = getServiceSupabaseClient();

  if (payload.name || payload.avatarUrl) {
    const profileUpdate: Record<string, string> = {};
    if (payload.name) profileUpdate.full_name = payload.name;
    if (payload.avatarUrl) profileUpdate.avatar_url = payload.avatarUrl;

    const { error: profileError } = await serviceClient.from("profiles").update(profileUpdate).eq("id", userId);
    if (profileError) {
      throw new HttpError(500, "Failed to update profile", profileError.message);
    }
  }

  if (payload.company) {
    const { data: membership, error: membershipError } = await serviceClient
      .from("organization_members")
      .select("organization_id")
      .eq("user_id", userId)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (membershipError) {
      throw new HttpError(500, "Failed to load organization membership", membershipError.message);
    }

    if (membership?.organization_id) {
      const { error: organizationError } = await serviceClient
        .from("organizations")
        .update({ name: payload.company })
        .eq("id", membership.organization_id);

      if (organizationError) {
        throw new HttpError(500, "Failed to update organization", organizationError.message);
      }
    }
  }

  return loadFrontendUser(userId, emailFallback);
}
