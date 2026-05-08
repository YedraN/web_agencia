"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, CheckCircle, Circle, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://web-agencia-backend.onrender.com";

interface Project {
  id: string;
  nombre: string;
}

interface Milestone {
  id: string;
  project_id: string;
  nombre: string;
  descripcion: string | null;
  fecha_vencimiento: string | null;
  status: "pending" | "in_progress" | "completed" | "blocked";
  completado_en: string | null;
  project?: Project;
}

async function fetchMilestones(): Promise<Milestone[]> {
  const res = await fetch(`${API_URL}/api/milestones`, { credentials: "include" });
  if (!res.ok) throw new Error("Error fetching milestones");
  return res.json();
}

async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/api/projects`, { credentials: "include" });
  if (!res.ok) throw new Error("Error fetching projects");
  return res.json();
}

async function createMilestone(data: Partial<Milestone>) {
  const res = await fetch(`${API_URL}/api/milestones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error creating milestone");
  return res.json();
}

async function updateMilestone(data: { id: string; status: string }) {
  const res = await fetch(`${API_URL}/api/milestones/${data.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: data.status }),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error updating milestone");
  return res.json();
}

export default function MilestonesPage() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    project_id: "",
    fecha_vencimiento: "",
  });

  const { data: milestones, isLoading } = useQuery({
    queryKey: ["milestones"],
    queryFn: fetchMilestones,
  });

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const createMutation = useMutation({
    mutationFn: createMilestone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["milestones"] });
      setIsOpen(false);
      setFormData({ nombre: "", descripcion: "", project_id: "", fecha_vencimiento: "" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateMilestone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["milestones"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({
      nombre: formData.nombre,
      descripcion: formData.descripcion || null,
      project_id: formData.project_id,
      fecha_vencimiento: formData.fecha_vencimiento ? new Date(formData.fecha_vencimiento).toISOString() : null,
    });
  };

  const toggleStatus = (m: Milestone) => {
    const newStatus = m.status === "completed" ? "pending" : "completed";
    updateMutation.mutate({ id: m.id, status: newStatus });
  };

  return (
    <div className="flex-1 space-y-8 p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold tracking-tight text-white">Hitos del Proyecto</h2>
          <p className="text-muted-foreground mt-1">Gestiona y visualiza el progreso de tus proyectos</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Nuevo Hito
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#111111] border-white/10 text-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Hito</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Hito</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="bg-white/5 border-white/10"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project">Proyecto</Label>
                <Select value={formData.project_id} onValueChange={(val) => setFormData({ ...formData, project_id: val || "" })} required>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue placeholder="Selecciona un proyecto" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                    {projects?.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.nombre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha de Vencimiento</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={formData.fecha_vencimiento}
                  onChange={(e) => setFormData({ ...formData, fecha_vencimiento: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                  style={{ colorScheme: 'dark' }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="desc">Descripción</Label>
                <Textarea
                  id="desc"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="bg-white/5 border-white/10 min-h-[100px]"
                />
              </div>

              <DialogFooter className="pt-4">
                <Button type="submit" disabled={createMutation.isPending} className="w-full">
                  {createMutation.isPending ? "Creando..." : "Guardar Hito"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-8 py-4">
        {isLoading ? (
          <div className="pl-6 text-white/50">Cargando hitos...</div>
        ) : milestones?.length === 0 ? (
          <div className="pl-6 text-white/50">No hay hitos creados aún.</div>
        ) : (
          milestones?.map((milestone) => (
            <div key={milestone.id} className="relative pl-6 md:pl-8">
              <div
                className="absolute left-[-11px] top-1.5 cursor-pointer bg-background rounded-full transition-transform hover:scale-110"
                onClick={() => toggleStatus(milestone)}
              >
                {milestone.status === "completed" ? (
                  <CheckCircle className="h-5 w-5 text-green-500 bg-black rounded-full" />
                ) : (
                  <Circle className="h-5 w-5 text-white/30 hover:text-white/70" />
                )}
              </div>

              <Card className={`bg-white/[0.02] border-white/5 transition-colors ${milestone.status === 'completed' ? 'opacity-60' : 'hover:border-white/10'}`}>
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-semibold text-lg ${milestone.status === 'completed' ? 'line-through text-white/50' : 'text-white'}`}>
                          {milestone.nombre}
                        </h3>
                        {milestone.project && (
                          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                            {milestone.project.nombre}
                          </span>
                        )}
                      </div>
                      {milestone.descripcion && (
                        <p className="text-sm text-white/60">{milestone.descripcion}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-white/40">
                      {milestone.fecha_vencimiento && (
                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                          <Calendar className="h-4 w-4" />
                          <span>{format(new Date(milestone.fecha_vencimiento), "d MMM yyyy", { locale: es })}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        <Clock className="h-4 w-4" />
                        <span>{milestone.status === "completed" ? "Completado" : "Pendiente"}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
