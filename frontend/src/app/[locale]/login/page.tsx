"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Diamond, Loader2, ArrowLeft, Eye, EyeOff, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { login, resendConfirmationEmail } from "@/lib/auth";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";

export default function LoginPage() {
  const t = useTranslations("Login");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (searchParams.get("resend") === "true") {
      form.setValue("email", "");
      setUnverifiedEmail("RESEND");
    }
  }, [searchParams]);

  const formSchema = z.object({
    email: z.string().min(1, { message: t("validation.emailRequired") }).email({ message: t("validation.emailInvalid") }),
    password: z.string().min(1, { message: t("validation.passwordRequired") }).min(6, { message: t("validation.passwordMin") }),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      const { user } = await login(values);
      if (user.verified === false) {
        setUnverifiedEmail(values.email);
        return;
      }
      toast.success(t("toast.welcome", { name: user.name }), { description: t("toast.welcomeDesc") });
      router.push("/dashboard");
    } catch (error: any) {
      if (error?.message === "EMAIL_NOT_CONFIRMED") {
        setUnverifiedEmail(values.email);
      } else {
        toast.error(t("toast.errorTitle"), { description: error?.message || t("toast.errorDesc") });
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResend() {
    if (!unverifiedEmail || unverifiedEmail === "RESEND") return;
    setResending(true);
    try {
      await resendConfirmationEmail(unverifiedEmail);
      setResent(true);
      toast.success("Email de confirmación reenviado");
    } catch (error: any) {
      toast.error(error.message || "Error al reenviar el email");
    } finally {
      setResending(false);
    }
  }

  function handleResendInit() {
    setUnverifiedEmail("RESEND");
    setResent(false);
  }

  return (
    <div className="min-h-screen bg-[#090909] flex">
      <div className="hidden lg:flex lg:w-[480px] xl:w-[560px] flex-col justify-between p-12 border-r border-white/[0.06] relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <Link href="/" className="relative inline-flex items-center gap-2.5 z-10">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
            <Diamond className="h-4 w-4 text-black fill-black" />
          </div>
          <span className="text-[17px] font-bold tracking-tight text-white">
            Nova<span className="text-white/40">Studio</span>
          </span>
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />{t("back")}
          </Link>
        </div>

        <div className="lg:hidden mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white"><Diamond className="h-4 w-4 text-black fill-black" /></div>
            <span className="text-[17px] font-bold tracking-tight text-white">Nova<span className="text-white/40">Studio</span></span>
          </Link>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
              {unverifiedEmail ? "Confirma tu email" : t("title")}
            </h1>
            <p className="text-white/45 text-[15px]">
              {unverifiedEmail
                ? "Debes confirmar tu email antes de acceder a tu cuenta."
                : t("subtitle")}
            </p>
          </div>

          {unverifiedEmail ? (
            <div className="space-y-6">
              {unverifiedEmail === "RESEND" ? (
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/60 text-sm font-medium">Email</FormLabel>
                    <FormControl>
                      <Input id="resend-email" type="email" placeholder="tu@email.com" className={cn("h-12 bg-white/[0.04] border-white/[0.09] text-white placeholder:text-white/25", "focus-visible:ring-white/20 focus-visible:border-white/20 rounded-xl")} {...field} />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )} />
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
                  <Mail className="h-5 w-5 text-white/40" />
                  <span className="text-white">{unverifiedEmail}</span>
                </div>
              )}

              {resent ? (
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-green-400 text-sm">
                  ✓ Email de confirmación enviado. Revisa tu bandeja de entrada.
                </div>
              ) : (
                <Button
                  onClick={unverifiedEmail === "RESEND" ? async () => { if (form.getValues("email")) { setResending(true); try { await resendConfirmationEmail(form.getValues("email")); setResent(true); } catch (e: any) { toast.error(e.message); } setResending(false); } } : handleResend}
                  disabled={resending || (unverifiedEmail === "RESEND" && !form.getValues("email"))}
                  className="w-full h-12 rounded-xl bg-white text-black font-bold text-[15px] hover:bg-white/90 transition-colors"
                >
                  {resending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Enviando...</> : "Reenviar email de confirmación"}
                </Button>
              )}

              <button
                type="button"
                onClick={() => { setUnverifiedEmail(null); setResent(false); }}
                className="w-full text-sm text-white/40 hover:text-white text-center"
              >
                ← Volver al login
              </button>
            </div>
          ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/60 text-sm font-medium">{t("emailLabel")}</FormLabel>
                  <FormControl>
                    <Input id="login-email" type="email" placeholder={t("emailPlaceholder")} autoComplete="email" disabled={isLoading} className={cn("h-12 bg-white/[0.04] border-white/[0.09] text-white placeholder:text-white/25", "focus-visible:ring-white/20 focus-visible:border-white/20 rounded-xl", "hover:border-white/15 transition-colors")} {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )} />

              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-white/60 text-sm font-medium">{t("passwordLabel")}</FormLabel>
                    <Link href="/forgot-password" className="text-xs text-white/40 hover:text-white transition-colors">{t("forgotPassword")}</Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input id="login-password" type={showPassword ? "text" : "password"} placeholder={t("passwordLabel")} autoComplete="current-password" disabled={isLoading} className={cn("h-12 bg-white/[0.04] border-white/[0.09] text-white placeholder:text-white/25", "focus-visible:ring-white/20 focus-visible:border-white/20 rounded-xl pr-12", "hover:border-white/15 transition-colors")} {...field} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors" tabIndex={-1}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )} />

              <Button id="login-submit" type="submit" disabled={isLoading} className="w-full h-12 rounded-xl bg-white text-black font-bold text-[15px] hover:bg-white/90 transition-colors mt-2">
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t("submitting")}</> : t("submit")}
              </Button>
            </form>
          </Form>

          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-xs text-white/25 font-medium">{t("or")}</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          <p className="text-center text-sm text-white/40">
            {t("noAccount")}{" "}
            <Link href="/register" className="text-white font-semibold hover:text-white/70 transition-colors underline underline-offset-4">{t("requestAccess")}</Link>
          </p>
          )}
        </div>
      </div>
    </div>
  );
}