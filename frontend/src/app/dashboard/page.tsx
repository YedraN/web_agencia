"use client";

import { useQuery } from "@tanstack/react-query";
import { Briefcase, CreditCard, CheckCircle2, Clock, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardStats } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://web-agencia-backend.onrender.com";

interface ClientStats {
  activeProjects: number;
  totalSpent: number;
  nextMilestoneDate: string | null;
  unreadInvoices: number;
}

async function fetchClientStats(): Promise<ClientStats> {
  const response = await fetch(`${API_URL}/api/dashboard/stats`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch stats");
  }

  return response.json();
}

export default function DashboardOverviewPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["clientStats"],
    queryFn: fetchClientStats,
  });

  return (
    <div className="flex-1 space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-heading font-bold tracking-tight text-white">Vista del cliente</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="bg-white/[0.02] border-white/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-[100px] bg-white/10" />
                <Skeleton className="h-4 w-4 bg-white/10" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[60px] mb-1 bg-white/10" />
                <Skeleton className="h-3 w-[120px] bg-white/10" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <Card className="bg-white/[0.02] border-white/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/70">Proyectos activos</CardTitle>
                <Briefcase className="h-4 w-4 text-white/50" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-heading font-bold">{data?.activeProjects}</div>
                <p className="text-xs text-white/40 mt-1"></p>
              </CardContent>
            </Card>

            <Card className="bg-white/[0.02] border-white/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/70">Total Invertido (YTD)</CardTitle>
                <CreditCard className="h-4 w-4 text-white/50" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-heading font-bold">${data?.totalSpent.toLocaleString()}</div>
                <p className="text-xs text-white/40 mt-1"></p>
              </CardContent>
            </Card>

            <Card className="bg-white/[0.02] border-white/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/70">Próximo hito</CardTitle>
                <Clock className="h-4 w-4 text-white/50" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-heading font-bold mt-1">{data?.nextMilestoneDate}</div>
                <p className="text-xs text-white/40 mt-2"></p>
              </CardContent>
            </Card>

            <Card className={`bg-white/[0.02] border-white/5 ${data?.unreadInvoices && data.unreadInvoices > 0 ? "border-primary/50 relative overflow-hidden" : ""}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-white/70">Facturas pendientes</CardTitle>
                <FileText className={`h-4 w-4 ${data?.unreadInvoices && data.unreadInvoices > 0 ? "text-primary" : "text-white/50"}`} />
              </CardHeader>
              <CardContent className="relative z-10">
                <div className={`text-3xl font-heading font-bold ${data?.unreadInvoices && data.unreadInvoices > 0 ? "text-white" : ""}`}>
                  {data?.unreadInvoices}
                </div>
                <p className="text-xs text-white/40 mt-1.5"></p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="col-span-full lg:col-span-3 p-8">
        <h3 className="text-xl font-heading font-bold tracking-tight mb-6">Actividad reciente</h3>
        {/* ACTIVIDAD RECIENTE */}
      </div>
    </div>
  );
}