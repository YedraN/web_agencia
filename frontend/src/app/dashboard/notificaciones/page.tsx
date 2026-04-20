"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Notification } from "@/lib/types";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BellRing, Check, Info, AlertTriangle, ShieldAlert } from "lucide-react";

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "n1", title: "API Rate Limit Excedido", message: "Stripe devolvió 429 Too Many Requests en la automatización de Facturación B2B.", severity: "critical", createdAt: "2026-04-18T19:05:00Z", read: false },
  { id: "n2", title: "Agente de Ventas Pausado", message: "La automatización se detuvo temporalmente debido a cambios detectados en la plataforma destino.", severity: "warning", createdAt: "2026-04-18T15:30:00Z", read: false },
  { id: "n3", title: "Sincronización Completada", message: "Se han importado 50 nuevos usuarios desde Jira correctamente.", severity: "info", createdAt: "2026-04-18T10:00:00Z", read: true },
  { id: "n4", title: "Actualización de Plataforma", message: "Nuevas integraciones con HubSpot disponibles en el panel de configuración.", severity: "info", createdAt: "2026-04-17T08:00:00Z", read: true },
];

async function fetchNotifications(): Promise<Notification[]> {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_NOTIFICATIONS), 600));
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all");
  const [localData, setLocalData] = useState<Notification[]>([]);

  const { isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const data = await fetchNotifications();
      setLocalData(data);
      return data;
    },
    refetchOnWindowFocus: false
  });

  const markAsRead = (id: string) => {
    setLocalData(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    toast("Notificación marcada como leída");
  };

  const markAllAsRead = () => {
    setLocalData(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("Todas las notificaciones leídas");
  };

  const filtered = localData.filter(n => {
    if (filter === "unread") return !n.read;
    if (filter === "critical") return n.severity === "critical";
    if (filter === "warning") return n.severity === "warning";
    return true;
  });

  const unreadCount = localData.filter(n => !n.read).length;

  return (
    <div className="flex-1 max-w-4xl mx-auto space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notificaciones</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Tienes {unreadCount} {unreadCount === 1 ? "alerta pendiente" : "alertas pendientes"}.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Select value={filter} onValueChange={(val) => setFilter(val || "all")}>
             <SelectTrigger className="w-[160px]">
               <SelectValue placeholder="Filtrar por" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="all">Todas</SelectItem>
               <SelectItem value="unread">No leídas</SelectItem>
               <SelectItem value="critical">Solo Críticas</SelectItem>
               <SelectItem value="warning">Avisos</SelectItem>
             </SelectContent>
           </Select>
           <Button variant="secondary" onClick={markAllAsRead} disabled={unreadCount === 0 || isLoading}>
             <Check className="h-4 w-4 mr-2" /> Marcar l. todas
           </Button>
        </div>
      </div>

      <Card className="border-border shadow-sm">
        <CardBody isLoading={isLoading} filtered={filtered} markAsRead={markAsRead} />
      </Card>
    </div>
  );
}

function CardBody({ isLoading, filtered, markAsRead }: { isLoading: boolean, filtered: Notification[], markAsRead: (id: string) => void }) {
  if (isLoading) {
    return (
      <div className="divide-y divide-border/50">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 sm:p-6 flex items-start gap-4">
             <Skeleton className="h-10 w-10 rounded-full shrink-0" />
             <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-24 mt-2" />
             </div>
          </div>
        ))}
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="p-12 text-center flex flex-col items-center">
         <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
           <BellRing className="h-8 w-8 text-muted-foreground opacity-50" />
         </div>
         <h3 className="text-lg font-medium">No hay notificaciones</h3>
         <p className="text-muted-foreground text-sm">Tu bandeja está limpia acorde a los filtros seleccionados.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border/50">
      {filtered.map(notif => (
        <div key={notif.id} className={`p-4 sm:p-6 flex items-start gap-4 transition-colors hover:bg-muted/30 ${!notif.read ? "bg-primary/5" : ""}`}>
           <div className="shrink-0 mt-1">
             {notif.severity === "critical" ? (
               <div className="h-9 w-9 rounded-full bg-destructive/20 text-destructive flex items-center justify-center border border-destructive/30">
                 <ShieldAlert className="h-5 w-5" />
               </div>
             ) : notif.severity === "warning" ? (
               <div className="h-9 w-9 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center border border-amber-500/30">
                 <AlertTriangle className="h-5 w-5" />
               </div>
             ) : (
               <div className="h-9 w-9 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center border border-blue-500/30">
                 <Info className="h-5 w-5" />
               </div>
             )}
           </div>

           <div className="flex-1 min-w-0">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-1">
               <h4 className={`text-base font-semibold ${!notif.read ? "text-foreground" : "text-muted-foreground"}`}>
                 {notif.title}
                 {!notif.read && <Badge variant="default" className="ml-2 text-[10px] h-5 py-0 px-1.5 bg-primary text-primary-foreground pointer-events-none">Nueva</Badge>}
               </h4>
               <span className="text-[13px] text-muted-foreground whitespace-nowrap">
                 {format(new Date(notif.createdAt), "PPp", { locale: es })}
               </span>
             </div>
             <p className={`text-sm leading-relaxed ${!notif.read ? "text-foreground/90" : "text-muted-foreground"}`}>
               {notif.message}
             </p>
             
             {!notif.read && (
               <Button onClick={() => markAsRead(notif.id)} variant="ghost" size="sm" className="h-8 mt-3 pl-0 text-primary hover:text-primary hover:bg-transparent">
                 <Check className="h-4 w-4 mr-1" /> Marcar como leída
               </Button>
             )}
           </div>
        </div>
      ))}
    </div>
  );
}

