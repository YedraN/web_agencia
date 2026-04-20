"use client";

import { useQuery } from "@tanstack/react-query";
import { Briefcase, CreditCard, CheckCircle2, Clock, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardStats } from "@/lib/types";

// Simulated fetch function for Client Portal
async function fetchMockClientStats() {
  return new Promise<{ activeProjects: number; totalSpent: number; nextMilestoneDate: string; unreadInvoices: number }>((resolve) => {
    setTimeout(() => {
      resolve({
        activeProjects: 2,
        totalSpent: 45000,
        nextMilestoneDate: "Oct 12, 2026",
        unreadInvoices: 1,
      });
    }, 800);
  });
}

export default function DashboardOverviewPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["clientStats"],
    queryFn: fetchMockClientStats,
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
                <p className="text-xs text-white/40 mt-1">Ambos en horario</p>
              </CardContent>
            </Card>

            <Card className="bg-white/[0.02] border-white/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/70">Total Invertido (YTD)</CardTitle>
                <CreditCard className="h-4 w-4 text-white/50" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-heading font-bold">${data?.totalSpent.toLocaleString()}</div>
                <p className="text-xs text-white/40 mt-1">+12% del año anterior</p>
              </CardContent>
            </Card>

            <Card className="bg-white/[0.02] border-white/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/70">Próximo hito</CardTitle>
                <Clock className="h-4 w-4 text-white/50" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-heading font-bold mt-1">{data?.nextMilestoneDate}</div>
                <p className="text-xs text-white/40 mt-2">Entrega de diseño - Lumina App</p>
              </CardContent>
            </Card>

            <Card className={`bg-white/[0.02] border-white/5 ${data?.unreadInvoices && data.unreadInvoices > 0 ? "border-primary/50 relative overflow-hidden" : ""}`}>
              {data?.unreadInvoices && data.unreadInvoices > 0 && (
                <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
              )}
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-white/70">Unpaid Invoices</CardTitle>
                <FileText className={`h-4 w-4 ${data?.unreadInvoices && data.unreadInvoices > 0 ? "text-primary" : "text-white/50"}`} />
              </CardHeader>
              <CardContent className="relative z-10">
                <div className={`text-3xl font-heading font-bold ${data?.unreadInvoices && data.unreadInvoices > 0 ? "text-white" : ""}`}>
                  {data?.unreadInvoices}
                </div>
                <p className="text-xs text-white/40 mt-1">Acción requerida</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 border border-white/5 rounded-2xl overflow-hidden bg-white/[0.01]">
        <div className="col-span-full lg:col-span-4 p-8 border-b lg:border-b-0 lg:border-r border-white/5">
          <h3 className="text-xl font-heading font-bold tracking-tight mb-6">Project Timeline</h3>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {/* Timeline Item 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-background group-[.is-active]:bg-primary/20 group-[.is-active]:border-primary/50 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow absolute left-0 md:left-1/2 -ml-5 md:ml-0">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white">Bocetos UX aprobados</span>
                  <span className="text-xs text-white/40">Oct 02</span>
                </div>
                <p className="text-sm text-white/50">Rediseño de Comercio Lumina</p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow absolute left-0 md:left-1/2 -ml-5 md:ml-0">
                <div className="w-2 h-2 rounded-full bg-white/40" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/5 bg-transparent">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white/70">Entrega de diseño UI</span>
                  <span className="text-xs text-white/40">Oct 12</span>
                </div>
                <p className="text-sm text-white/40">Entrega de maquetas de alta fidelidad</p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow absolute left-0 md:left-1/2 -ml-5 md:ml-0">
                <div className="w-2 h-2 rounded-full bg-white/40" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/5 bg-transparent">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white/70">Sprint de ingeniería 1</span>
                  <span className="text-xs text-white/40">Nov 01</span>
                </div>
                <p className="text-sm text-white/40">Configuración de arquitectura frontend</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-full lg:col-span-3 p-8">
          <h3 className="text-xl font-heading font-bold tracking-tight mb-6">Actividad reciente</h3>
          <div className="space-y-6">
            {[
              { title: "Factura INV-0042 generada", time: "hace 2 horas", doc: true },
              { title: "Archivo Figma actualizado por el equipo", time: "hace 5 horas", doc: false },
              { title: "Notas de sincronización semanal subidas", time: "ayer", doc: true },
              { title: "Inicio del proyecto 'Lumina'", time: "la semana pasada", doc: false }
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary/80 shrink-0" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none text-white/90">{activity.title}</p>
                  <p className="text-xs text-white/40">{activity.time}</p>
                </div>
                {activity.doc && (
                  <div className="text-xs text-white/40 border border-white/10 rounded-full bg-white/5 px-3 py-1 cursor-pointer hover:bg-white/10 transition-colors">
                    Ver
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

