"use client";

import { useState, useEffect } from "react";
import { User } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Loader2, Plus, Zap, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsPage() {
  const { user: authUser, isLoading } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (authUser) setUser(authUser);
  }, [authUser]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // TODO: llamada real a PATCH /api/users/me
    await new Promise(r => setTimeout(r, 600));
    toast.success("Perfil actualizado correctamente.");
    setIsSaving(false);
  };

  const planLabel = user?.plan
    ? user.plan.charAt(0).toUpperCase() + user.plan.slice(1)
    : "Free";

  const initials = user?.name
    ? user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "??";

  if (isLoading) {
    return (
      <div className="flex-1 space-y-6 max-w-5xl mx-auto w-full">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-4 w-72" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex-1 space-y-6 max-w-5xl mx-auto w-full">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Ajustes</h2>
        <p className="text-muted-foreground text-sm mt-1">Configura tu perfil personal, integraciones y facturación.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
        </TabsList>

        {/* PROFILE TAB */}
        <TabsContent value="profile" className="space-y-6 animate-in fade-in-50 duration-500">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>
                Actualiza los detalles de tu cuenta pública e inicio de sesión.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveProfile}>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20 border border-border">
                    <AvatarImage src={user.avatarUrl || ""} alt={user.name} />
                    <AvatarFallback className="text-xl bg-primary/10 text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" type="button">Cambiar Avatar</Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      value={user.name}
                      onChange={e => setUser({ ...user, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input
                      id="company"
                      value={user.company}
                      onChange={e => setUser({ ...user, company: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" type="email" value={user.email} disabled className="bg-muted/30" />
                    <p className="text-xs text-muted-foreground mt-1">Su correo de inicio de sesión no puede ser cambiado aquí.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button type="submit" disabled={isSaving}>
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Guardar Cambios
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* INTEGRATIONS TAB */}
        <TabsContent value="integrations" className="space-y-6 animate-in fade-in-50 duration-500">
          <Card>
            <CardHeader>
              <CardTitle>Conectar Servicios Externos</CardTitle>
              <CardDescription>
                Conecta Automata AI con las herramientas que tu equipo ya utiliza.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <IntegrationCard name="Slack" description="Notificaciones en canales sobre eventos." connected={true} />
                <IntegrationCard name="Gmail" description="Envío y lectura automatizada de correos." connected={false} />
                <IntegrationCard name="Jira" description="Creación y sincronización de tickets." connected={true} />
                <IntegrationCard name="WhatsApp API" description="Respuestas a clientes y mensajes push." connected={false} />
                <IntegrationCard name="Salesforce" description="Sincronización bidireccional de leads." connected={false} />
                <IntegrationCard name="Stripe" description="Facturación y monitoreo de pagos." connected={true} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BILLING TAB */}
        <TabsContent value="billing" className="space-y-6 animate-in fade-in-50 duration-500">
          <Card>
            <CardHeader>
              <CardTitle>Plan Actual</CardTitle>
              <CardDescription>Estás utilizando el plan <strong>{planLabel}</strong>.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border rounded-lg bg-muted/20">
                <div>
                  <h3 className="text-xl font-bold">{planLabel}</h3>
                  <p className="text-muted-foreground text-sm mt-1">Límite de 100 ejecuciones al mes.</p>
                </div>
                <div className="mt-4 md:mt-0 text-3xl font-extrabold flex items-baseline">
                  $0 <span className="text-sm font-normal text-muted-foreground ml-1">/ mes</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">Uso de Ejecuciones (Este Mes)</span>
                  <span className="text-muted-foreground">84 / 100</span>
                </div>
                <Progress value={84} className="h-2" />
                <p className="text-xs text-muted-foreground">Te estás acercando al límite de tu plan {planLabel}. Mejora tu plan para ejecuciones ilimitadas.</p>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6 bg-muted/30">
              <Button className="w-full sm:w-auto hover:scale-105 transition-transform" variant="default">
                <Zap className="mr-2 h-4 w-4" /> Mejorar a Pro
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function IntegrationCard({ name, description, connected }: { name: string; description: string; connected: boolean }) {
  return (
    <div className="p-5 border rounded-xl flex flex-col justify-between items-start space-y-4 bg-card/50 hover:bg-muted/10 transition-colors">
      <div className="flex items-center justify-between w-full">
        <h4 className="font-semibold text-base">{name}</h4>
        {connected ? (
          <span className="flex items-center text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Conectado
          </span>
        ) : (
          <span className="text-xs font-medium text-muted-foreground border bg-muted/30 px-2 py-0.5 rounded-full">No conectado</span>
        )}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      <Button
        variant={connected ? "outline" : "secondary"}
        size="sm"
        className="w-full"
        onClick={() => !connected && toast.info(`Redirigiendo a OAuth de ${name}`)}
      >
        {connected ? "Configurar" : (
          <><Plus className="h-3 w-3 mr-1.5" /> Conectar</>
        )}
      </Button>
    </div>
  );
}