"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Project } from "@/lib/types";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function ProjectsPage() {
  const { data, isLoading } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: api.getProjects,
  });

  return (
    <div className="flex-1 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Proyectos</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Gestiona tus proyectos y su progreso.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm p-4 space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-5 w-[200px]" />
              <Skeleton className="h-4 w-[300px]" />
            </div>
          ))
        ) : !data || data.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No tienes proyectos aún.
          </p>
        ) : (
          data.map((project) => (
            <div
              key={project.id}
              className="p-4 border rounded-lg flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{project.nombre}</h3>
                <Badge>{project.estado}</Badge>
              </div>

              {project.descripcion && (
                <p className="text-sm text-muted-foreground">
                  {project.descripcion}
                </p>
              )}

              <div className="text-xs text-muted-foreground">
                {new Date(project.creado).toLocaleString("es-ES")}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}