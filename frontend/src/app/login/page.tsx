"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Diamond, Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El correo electrónico es obligatorio" })
    .email({ message: "Por favor, introduce una dirección de correo electrónico válida" }),
  password: z
    .string()
    .min(1, { message: "La contraseña es obligatoria" })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      // TODO: Replace with real API call
      // const response = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(values),
      // });
      // if (!response.ok) throw new Error("Invalid credentials");
      // const { token } = await response.json();
      // localStorage.setItem("auth_token", token);

      await new Promise((r) => setTimeout(r, 1200)); // Remove when backend is ready
      toast.success("¡Bienvenido de nuevo!", { description: "Redirigiendo a tu panel de control..." });
      router.push("/dashboard");
    } catch (error) {
      toast.error("Autenticación fallida", {
        description: "Correo electrónico o contraseña inválidos. Por favor, intenta de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#090909] flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[560px] flex-col justify-between p-12 border-r border-white/[0.06] relative overflow-hidden shrink-0">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Logo */}
        <Link href="/" className="relative inline-flex items-center gap-2.5 z-10">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
            <Diamond className="h-4 w-4 text-black fill-black" />
          </div>
          <span className="text-[17px] font-bold tracking-tight text-white">
            Nova<span className="text-white/40">Studio</span>
          </span>
        </Link>

        {/* Testimonial */}
        <div className="relative z-10 space-y-6">
          <div className="flex gap-0.5 mb-8">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="h-4 w-4 fill-white/50" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="text-xl font-medium text-white leading-relaxed">
            "Nova Studio rediseñó toda nuestra plataforma en 8 semanas. La calidad fue impresionante — nuestra tasa de conversión aumentó un 34%."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
              ER
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Elena Rostova</div>
              <div className="text-xs text-white/40">CEO, Lumina Commerce</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        {/* Back link */}
        <div className="w-full max-w-md mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al sitio web
          </Link>
        </div>

        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
              <Diamond className="h-4 w-4 text-black fill-black" />
            </div>
            <span className="text-[17px] font-bold tracking-tight text-white">
              Nova<span className="text-white/40">Studio</span>
            </span>
          </Link>
        </div>

        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
              Portal de Clientes
            </h1>
            <p className="text-white/45 text-[15px]">
              Inicia sesión para seguir tus proyectos y facturas.
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/60 text-sm font-medium">
                      Correo electrónico
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="you@company.com"
                        autoComplete="email"
                        disabled={isLoading}
                        className={cn(
                          "h-12 bg-white/[0.04] border-white/[0.09] text-white placeholder:text-white/25",
                          "focus-visible:ring-white/20 focus-visible:border-white/20 rounded-xl",
                          "hover:border-white/15 transition-colors"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-white/60 text-sm font-medium">
                        Contraseña
                      </FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-white/40 hover:text-white transition-colors"
                      >
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••••"
                          autoComplete="current-password"
                          disabled={isLoading}
                          className={cn(
                            "h-12 bg-white/[0.04] border-white/[0.09] text-white placeholder:text-white/25",
                            "focus-visible:ring-white/20 focus-visible:border-white/20 rounded-xl pr-12",
                            "hover:border-white/15 transition-colors"
                          )}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />

              <Button
                id="login-submit"
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-white text-black font-bold text-[15px] hover:bg-white/90 transition-colors mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar sesión"
                )}
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-xs text-white/25 font-medium">OR</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-white/40">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/register"
              className="text-white font-semibold hover:text-white/70 transition-colors underline underline-offset-4"
            >
              Solicitar acceso
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

