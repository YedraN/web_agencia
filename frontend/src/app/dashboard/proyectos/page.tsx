"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, MoreHorizontal, Settings2, PlayCircle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Automation } from "@/lib/types";
import { toast } from "sonner";
import { ConfigSlideOver } from "@/components/automations/ConfigSlideOver";

// Mock data and API
const MOCK_AUTOMATIONS: Automation[] = [
  { id: "a1", name: "Sincronización de Leads CRM", description: "Envía nuevos leads de FB Ads a Salesforce y notifica en Slack", status: "active", lastExecution: "2026-04-18T20:15:00Z", nextExecution: "2026-04-18T22:15:00Z", successRate: 99.9, config: { target_emails: "sales@acme.com", interval_minutes: 15 } },
  { id: "a2", name: "Facturación Mensual B2B", description: "Genera facturas PDF y las envía por email a clientes B2B", status: "paused", lastExecution: "2026-03-31T23:59:00Z", nextExecution: "2026-04-30T23:59:00Z", successRate: 100, config: { billing_cycle: "monthly", template_id: "tpl_54321" } },
  { id: "a3", name: "Onboarding Nuevos Empleados", description: "Crea cuentas en Google Workspace, Slack y Jira", status: "error", lastExecution: "2026-04-18T10:00:00Z", nextExecution: "2026-04-19T10:00:00Z", successRate: 85.5, config: { default_groups: ["engineering", "all-hands"] } },
];

async function fetchAutomations(): Promise<Automation[]> {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_AUTOMATIONS), 1000));
}

async function toggleAutomationMock({ id, active }: { id: string; active: boolean }) {
  return new Promise((resolve) => setTimeout(resolve, 500));
}

export default function AutomationsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedAuto, setSelectedAuto] = useState<Automation | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const { data: automations, isLoading } = useQuery({
    queryKey: ["automations"],
    queryFn: fetchAutomations,
  });

  const toggleMutation = useMutation({
    mutationFn: toggleAutomationMock,
    onSuccess: (_, variables) => {
      toast.success(`Automatización ${variables.active ? "activada" : "pausada"} correctamente`);
      // Update cache optimistically in a real app
    },
    onError: () => {
      toast.error("Error al cambiar de estado");
    }
  });

  const filtered = automations?.filter(a => a.name.toLowerCase().includes(search.toLowerCase())) || [];

  const handleOpenConfig = (item: Automation) => {
    setSelectedAuto(item);
    setIsConfigOpen(true);
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Automatizaciones</h2>
          <p className="text-muted-foreground text-sm mt-1">Gestiona tus procesos, activa agentes y configura parámetros.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nueva Automatización
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b flex items-center justify-between gap-4 bg-muted/20">
          <Input 
            placeholder="Buscar por nombre..." 
            className="max-w-sm" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="overflow-x-auto relative">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="w-[300px]">Nombre</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Última Ejecución</TableHead>
                <TableHead>Tasa Éxito</TableHead>
                <TableHead>Alternar</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-[60px] rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[40px]" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-[30px] rounded-full" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto rounded-md" /></TableCell>
                  </TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                     No se encontraron automatizaciones.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <div>
                        {item.name}
                        <span className="block text-xs text-muted-foreground font-normal line-clamp-1 mt-0.5" title={item.description}>
                          {item.description}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'active' ? 'default' : item.status === 'error' ? 'destructive' : 'secondary'} className={item.status === 'active' ? "bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25 border-transparent" : ""}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-foreground/80">
                      {item.lastExecution ? new Date(item.lastExecution).toLocaleString('es-ES', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : "Nunca"}
                    </TableCell>
                    <TableCell>
                      <span className={item.successRate < 90 ? "text-destructive font-medium" : "text-emerald-500 font-medium"}>
                        {item.successRate}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Switch 
                        checked={item.status === 'active'} 
                        onCheckedChange={(val) => toggleMutation.mutate({ id: item.id, active: val })}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="h-8 w-8 p-0 rounded-md hover:bg-accent flex items-center justify-center outline-none">
                           <span className="sr-only">Abrir menú</span>
                           <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleOpenConfig(item)}>
                            <Settings2 className="mr-2 h-4 w-4" />
                            Configurar Parámetros
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Ejecutar Ahora
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <ConfigSlideOver 
        open={isConfigOpen} 
        onOpenChange={setIsConfigOpen} 
        automation={selectedAuto} 
      />
    </div>
  );
}

