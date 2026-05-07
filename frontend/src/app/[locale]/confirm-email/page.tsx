"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Diamond, Loader2, MailCheck, AlertCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://web-agencia-backend.onrender.com";

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error" | "expired">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage("Token no válido");
      return;
    }

    async function confirmEmail() {
      try {
        const res = await fetch(`${API_URL}/api/auth/confirm?token=${token}`);
        const data = await res.json();

        if (res.ok && data.confirmed) {
          setStatus("success");
        } else if (data.detail?.includes("expirado")) {
          setStatus("expired");
        } else {
          setStatus("error");
          setErrorMessage(data.detail || "Error al confirmar el email");
        }
      } catch {
        setStatus("error");
        setErrorMessage("Error de conexión");
      }
    }

    confirmEmail();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#090909] flex flex-col items-center justify-center p-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <Link href="/" className="inline-flex items-center gap-2.5 mb-8">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
          <Diamond className="h-4 w-4 text-black fill-black" />
        </div>
        <span className="text-[17px] font-bold tracking-tight text-white">
          Nova<span className="text-white/40">Studio</span>
        </span>
      </Link>

      <div className="w-full max-w-md text-center">
        {status === "loading" && (
          <>
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
              <Loader2 className="h-8 w-8 text-white/40 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Confirmando tu email...</h1>
            <p className="text-white/40">Por favor, espera mientras verificamos tu dirección de email.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <MailCheck className="h-8 w-8 text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">¡Email confirmado!</h1>
            <p className="text-white/40 mb-8">Tu dirección de email ha sido verificada correctamente. Ya puedes acceder a tu cuenta.</p>
            <Link href="/login">
              <Button className="w-full h-12 rounded-xl bg-white text-black font-bold text-[15px] hover:bg-white/90">
                Ir al login
              </Button>
            </Link>
          </>
        )}

        {status === "expired" && (
          <>
            <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-8 w-8 text-yellow-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Enlace expirado</h1>
            <p className="text-white/40 mb-8">El enlace de confirmación ha expirado. Solicita uno nuevo desde la página de login.</p>
            <Link href="/login?resend=true">
              <Button className="w-full h-12 rounded-xl bg-white text-black font-bold text-[15px] hover:bg-white/90">
                <Mail className="h-4 w-4 mr-2" />
                Reenviar email
              </Button>
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Error de confirmación</h1>
            <p className="text-white/40 mb-2">{errorMessage}</p>
            <p className="text-white/30 text-sm mb-8">El enlace puede haber sido usado ya o ser inválido.</p>
            <Link href="/login">
              <Button className="w-full h-12 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 border border-white/10">
                Volver al login
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}