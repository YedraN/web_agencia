"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  Building2,
  FolderKanban,
  FileText,
  TrendingUp,
  UserCheck,
  KeyRound,
  UserX,
  UserCheck2,
  Trash2,
  ShieldAlert,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  MailCheck,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://web-agencia-backend.onrender.com";

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

type AdminStats = {
  total_users: number;
  active_users: number;
  total_orgs: number;
  total_projects: number;
  total_invoices: number;
  total_revenue_cents: number;
};

type AdminUser = {
  id: string;
  nombre_completo: string | null;
  email: string;
  activo: boolean;
  verificado: boolean;
  ultimo_acceso: string | null;
  created_at: string;
};

type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
};

type AdminOrg = {
  id: string;
  nombre: string;
  slug: string;
  plan: string;
  activo: boolean;
  ciudad: string | null;
  pais: string;
  member_count: number;
  created_at: string;
};

type Tab = "stats" | "users" | "orgs";

const ITEMS_PER_PAGE = 10;

function exportToCSV<T extends Record<string, unknown>>(data: T[], filename: string) {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((h) => {
        const val = row[h];
        const str = val == null ? "" : String(val);
        return str.includes(",") || str.includes('"') || str.includes("\n")
          ? `"${str.replace(/"/g, '""')}"`
          : str;
      }).join(",")
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const t = useTranslations("Admin");
  const { session, isSuperAdmin } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<Tab>("stats");
  const [searchUsers, setSearchUsers] = useState("");
  const [searchOrgs, setSearchOrgs] = useState("");
  const [pageUsers, setPageUsers] = useState(1);
  const [pageOrgs, setPageOrgs] = useState(1);

  const token = session?.access_token ?? "";

  const { data: stats, isLoading: statsLoading } = useQuery<AdminStats>({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const r = await fetch(`${API_URL}/api/admin/stats`, { headers: authHeaders(token) });
      if (!r.ok) throw new Error();
      return r.json();
    },
    enabled: isSuperAdmin && !!token,
  });

  const { data: usersData, isLoading: usersLoading } = useQuery<PaginatedResponse<AdminUser>>({
    queryKey: ["admin-users", pageUsers, searchUsers],
    queryFn: async () => {
      const params = new URLSearchParams({ page: String(pageUsers), page_size: String(ITEMS_PER_PAGE) });
      if (searchUsers) params.append("search", searchUsers);
      const r = await fetch(`${API_URL}/api/admin/users?${params}`, { headers: authHeaders(token) });
      if (!r.ok) throw new Error();
      return r.json();
    },
    enabled: isSuperAdmin && !!token && activeTab === "users",
  });

  const { data: orgsData, isLoading: orgsLoading } = useQuery<PaginatedResponse<AdminOrg>>({
    queryKey: ["admin-orgs", pageOrgs, searchOrgs],
    queryFn: async () => {
      const params = new URLSearchParams({ page: String(pageOrgs), page_size: String(ITEMS_PER_PAGE) });
      if (searchOrgs) params.append("search", searchOrgs);
      const r = await fetch(`${API_URL}/api/admin/organizations?${params}`, { headers: authHeaders(token) });
      if (!r.ok) throw new Error();
      return r.json();
    },
    enabled: isSuperAdmin && !!token && activeTab === "orgs",
  });

  const users = usersData?.data ?? [];
  const orgs = orgsData?.data ?? [];
  const totalUserPages = usersData?.total_pages ?? 1;
  const totalOrgPages = orgsData?.total_pages ?? 1;

  const handleExportUsers = () => {
    const allUsers = usersData?.data ?? [];
    if (!allUsers.length) return;
    exportToCSV(allUsers.map((u) => ({
      nombre: u.nombre_completo ?? "",
      email: u.email,
      estado: u.activo ? "activo" : "inactivo",
      verificado: u.verificado ? "sí" : "no",
      último_acceso: u.ultimo_acceso ?? "",
      fecha_registro: u.created_at,
    })), "usuarios");
    toast({ title: t("exportSuccess") });
  };

  const handleExportOrgs = () => {
    const allOrgs = orgsData?.data ?? [];
    if (!allOrgs.length) return;
    exportToCSV(allOrgs.map((o) => ({
      nombre: o.nombre,
      slug: o.slug,
      plan: o.plan,
      miembros: o.member_count,
      ciudad: o.ciudad ?? "",
      país: o.pais,
      estado: o.activo ? "activa" : "inactiva",
      fecha_creación: o.created_at,
    })), "organizaciones");
    toast({ title: t("exportSuccess") });
  };

  const resetPasswordMutation = useMutation({
    mutationFn: async (userId: string) => {
      const r = await fetch(`${API_URL}/api/admin/users/${userId}/reset-password`, {
        method: "POST",
        headers: authHeaders(token),
      });
      if (!r.ok) throw new Error();
    },
    onSuccess: () => toast({ title: t("users.resetSuccess") }),
    onError: () => toast({ title: t("users.resetError"), variant: "destructive" }),
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async (userId: string) => {
      const r = await fetch(`${API_URL}/api/admin/users/${userId}/toggle-active`, {
        method: "PATCH",
        headers: authHeaders(token),
      });
      if (!r.ok) throw new Error();
      return r.json();
    },
    onSuccess: () => {
      toast({ title: t("users.toggleSuccess") });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: () => toast({ title: t("users.toggleError"), variant: "destructive" }),
  });

  const purgeUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const r = await fetch(`${API_URL}/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: authHeaders(token),
      });
      if (!r.ok) throw new Error();
    },
    onSuccess: () => {
      toast({ title: t("users.purgeSuccess") });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: () => toast({ title: t("users.purgeError"), variant: "destructive" }),
  });

  const deleteOrgMutation = useMutation({
    mutationFn: async (orgId: string) => {
      const r = await fetch(`${API_URL}/api/admin/organizations/${orgId}`, {
        method: "DELETE",
        headers: authHeaders(token),
      });
      if (!r.ok) throw new Error();
    },
    onSuccess: () => {
      toast({ title: t("orgs.deleteSuccess") });
      queryClient.invalidateQueries({ queryKey: ["admin-orgs"] });
    },
    onError: () => toast({ title: t("orgs.deleteError"), variant: "destructive" }),
  });

  if (!isSuperAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <ShieldAlert className="h-12 w-12 text-white/20" />
        <p className="text-white/40">{t("accessDenied")}</p>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "stats", label: t("tabs.stats") },
    { key: "users", label: t("tabs.users") },
    { key: "orgs", label: t("tabs.orgs") },
  ];

  return (
    <div className="flex-1 space-y-8">
      <h2 className="text-3xl font-heading font-bold tracking-tight text-white">{t("title")}</h2>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/[0.06] pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.key
                ? "text-white border-white"
                : "text-white/40 border-transparent hover:text-white/70"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      {activeTab === "stats" && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {statsLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="bg-white/[0.02] border-white/5">
                  <CardHeader className="pb-2">
                    <Skeleton className="h-4 w-[120px] bg-white/10" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-[80px] bg-white/10" />
                  </CardContent>
                </Card>
              ))
            : [
                { label: t("stats.totalUsers"), value: stats?.total_users, icon: Users },
                { label: t("stats.activeUsers"), value: stats?.active_users, icon: UserCheck },
                { label: t("stats.totalOrgs"), value: stats?.total_orgs, icon: Building2 },
                { label: t("stats.totalProjects"), value: stats?.total_projects, icon: FolderKanban },
                { label: t("stats.totalInvoices"), value: stats?.total_invoices, icon: FileText },
                {
                  label: t("stats.totalRevenue"),
                  value: stats ? `€${((stats.total_revenue_cents ?? 0) / 100).toLocaleString("es-ES", { minimumFractionDigits: 2 })}` : "—",
                  icon: TrendingUp,
                },
              ].map(({ label, value, icon: Icon }) => (
                <Card key={label} className="bg-white/[0.02] border-white/5">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-white/70">{label}</CardTitle>
                    <Icon className="h-4 w-4 text-white/40" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-heading font-bold text-white">{value ?? "—"}</div>
                  </CardContent>
                </Card>
              ))}
        </div>
      )}

      {/* Users */}
      {activeTab === "users" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <h3 className="text-lg font-semibold text-white">{t("users.title")}</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input
                  placeholder={t("search") + "..."}
                  value={searchUsers}
                  onChange={(e) => { setSearchUsers(e.target.value); setPageUsers(1); }}
                  className="pl-9 w-48 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportUsers}
                className="border-white/20 text-white/70 hover:bg-white/10"
              >
                <Download className="h-4 w-4 mr-1" />
                CSV
              </Button>
            </div>
          </div>
          {usersLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full bg-white/5 rounded-lg" />
              ))}
            </div>
          ) : !users.length ? (
            <p className="text-white/40 text-sm">{t("users.noUsers")}</p>
          ) : (
            <>
              <div className="rounded-lg border border-white/[0.06] overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-white/[0.03]">
                    <tr>
                      {[t("users.name"), t("users.email"), t("users.status"), t("users.verified"), t("users.lastAccess"), t("users.joined"), ""].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3 text-white font-medium">{u.nombre_completo ?? "—"}</td>
                        <td className="px-4 py-3 text-white/60">{u.email || "—"}</td>
                        <td className="px-4 py-3">
                          <Badge
                            variant="outline"
                            className={u.activo ? "border-green-500/30 text-green-400" : "border-red-500/30 text-red-400"}
                          >
                            {u.activo ? t("users.active") : t("users.inactive")}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          {u.verificado ? (
                            <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                              <MailCheck className="h-3 w-3 mr-1" />
                              {t("users.verified")}
                            </Badge>
                          ) : (
                            <span className="text-white/30 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-white/40 text-xs">
                          {u.ultimo_acceso ? new Date(u.ultimo_acceso).toLocaleDateString("es-ES") : "—"}
                        </td>
                        <td className="px-4 py-3 text-white/40 text-xs">
                          {new Date(u.created_at).toLocaleDateString("es-ES")}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              title={t("users.resetPassword")}
                              className="h-7 w-7 text-white/40 hover:text-white"
                              onClick={() => resetPasswordMutation.mutate(u.id)}
                            >
                              <KeyRound className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              title={u.activo ? t("users.deactivate") : t("users.activate")}
                              className="h-7 w-7 text-white/40 hover:text-white"
                              onClick={() => toggleActiveMutation.mutate(u.id)}
                            >
                              {u.activo ? <UserX className="h-3.5 w-3.5" /> : <UserCheck2 className="h-3.5 w-3.5" />}
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              title={t("users.purge")}
                              className="h-7 w-7 text-red-400/60 hover:text-red-400"
                              onClick={() => {
                                if (confirm(t("users.purgeConfirm"))) purgeUserMutation.mutate(u.id);
                              }}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {totalUserPages > 1 && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/40">
                    {t("page")} {pageUsers} / {totalUserPages}
                  </p>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPageUsers((p) => Math.max(1, p - 1))}
                      disabled={pageUsers === 1}
                      className="border-white/20 text-white/70 hover:bg-white/10 h-8"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPageUsers((p) => Math.min(totalUserPages, p + 1))}
                      disabled={pageUsers === totalUserPages}
                      className="border-white/20 text-white/70 hover:bg-white/10 h-8"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Organizations */}
      {activeTab === "orgs" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <h3 className="text-lg font-semibold text-white">{t("orgs.title")}</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input
                  placeholder={t("search") + "..."}
                  value={searchOrgs}
                  onChange={(e) => { setSearchOrgs(e.target.value); setPageOrgs(1); }}
                  className="pl-9 w-48 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportOrgs}
                className="border-white/20 text-white/70 hover:bg-white/10"
              >
                <Download className="h-4 w-4 mr-1" />
                CSV
              </Button>
            </div>
          </div>
          {orgsLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full bg-white/5 rounded-lg" />
              ))}
            </div>
          ) : !orgs.length ? (
            <p className="text-white/40 text-sm">{t("orgs.noOrgs")}</p>
          ) : (
            <>
              <div className="rounded-lg border border-white/[0.06] overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-white/[0.03]">
                    <tr>
                      {[t("orgs.name"), t("orgs.plan"), t("orgs.members"), t("orgs.status"), t("orgs.created"), ""].map((h, i) => (
                        <th key={i} className="px-4 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {orgs.map((o) => (
                      <tr key={o.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3 text-white font-medium">
                          <div>{o.nombre}</div>
                          <div className="text-xs text-white/30">{o.slug}</div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="border-white/20 text-white/60 capitalize">
                            {o.plan}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-white/60">{o.member_count}</td>
                        <td className="px-4 py-3">
                          <Badge
                            variant="outline"
                            className={o.activo ? "border-green-500/30 text-green-400" : "border-red-500/30 text-red-400"}
                          >
                            {o.activo ? t("orgs.active") : t("orgs.inactive")}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-white/40 text-xs">
                          {new Date(o.created_at).toLocaleDateString("es-ES")}
                        </td>
                        <td className="px-4 py-3">
                          <Button
                            size="icon"
                            variant="ghost"
                            title={t("orgs.deleteConfirm")}
                            className="h-7 w-7 text-red-400/60 hover:text-red-400"
                            onClick={() => {
                              if (confirm(t("orgs.deleteConfirm"))) deleteOrgMutation.mutate(o.id);
                            }}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {totalOrgPages > 1 && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/40">
                    {t("page")} {pageOrgs} / {totalOrgPages}
                  </p>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPageOrgs((p) => Math.max(1, p - 1))}
                      disabled={pageOrgs === 1}
                      className="border-white/20 text-white/70 hover:bg-white/10 h-8"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPageOrgs((p) => Math.min(totalOrgPages, p + 1))}
                      disabled={pageOrgs === totalOrgPages}
                      className="border-white/20 text-white/70 hover:bg-white/10 h-8"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
