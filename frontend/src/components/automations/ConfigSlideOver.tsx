"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Automation } from "@/lib/types";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Save } from "lucide-react";

interface ConfigSlideOverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  automation: Automation | null;
}

// Mock update API
async function updateAutomationConfig({ id, config }: { id: string; config: Record<string, any> }) {
  return new Promise((resolve) => setTimeout(resolve, 800));
}

// Simulated JSON Schema returning from API. In a real scenario, this is fetched per automation.
const mockSchema = {
  a1: [
    { key: "target_emails", type: "text", label: "Emails de Destino", placeholder: "sales@acme.com" },
    { key: "interval_minutes", type: "number", label: "Frecuencia (minutos)", placeholder: "15" }
  ],
  a2: [
    { key: "billing_cycle", type: "select", label: "Ciclo de Facturación", options: [{label: "Semanal", value: "weekly"}, {label: "Mensual", value: "monthly"}] },
    { key: "template_id", type: "text", label: "ID de Plantilla", placeholder: "tpl_..." }
  ],
  a3: [
    { key: "default_groups", type: "text", label: "Grupos por defecto (separar por coma)", placeholder: "engineering, all-hands" }
  ]
};

export function ConfigSlideOver({ open, onOpenChange, automation }: ConfigSlideOverProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (automation) {
      setFormData(automation.config || {});
    }
  }, [automation]);

  const mutation = useMutation({
    mutationFn: updateAutomationConfig,
    onSuccess: () => {
      toast.success("Configuración actualizada correctamente");
      onOpenChange(false);
      // In a real app: queryClient.invalidateQueries({ queryKey: ["automations"] });
    },
    onError: () => {
      toast.error("No se pudo guardar la configuración");
    }
  });

  if (!automation) return null;

  const schema = (mockSchema as any)[automation.id] || [];

  const handleSave = () => {
    mutation.mutate({ id: automation.id, config: formData });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md flex flex-col h-full bg-card/95 backdrop-blur-xl border-l border-border/40">
        <SheetHeader>
          <SheetTitle className="text-xl">Configurar Parámetros</SheetTitle>
          <SheetDescription>
             Ajusta los valores dinámicos para <strong className="text-foreground">{automation.name}</strong>.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-6 space-y-6 pr-2">
          {schema.length === 0 ? (
            <div className="text-muted-foreground text-sm">No hay parámetros configurables para esta automatización.</div>
          ) : (
            schema.map((field: any) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key} className="text-sm font-medium">
                  {field.label}
                </Label>
                
                {field.type === "text" || field.type === "number" ? (
                  <Input 
                    id={field.key}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.key] || ""}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    className="bg-muted/40"
                  />
                ) : field.type === "select" ? (
                  <Select 
                    value={formData[field.key] || ""} 
                    onValueChange={(val) => setFormData({ ...formData, [field.key]: val || "" })}
                  >
                    <SelectTrigger className="bg-muted/40">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((opt: any) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : null}
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4 flex justify-end gap-3 mt-auto">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
             Cancelar
          </Button>
          <Button onClick={handleSave} disabled={mutation.isPending}>
            {mutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Guardar Cambios
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

