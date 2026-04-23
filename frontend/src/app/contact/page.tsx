"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2, Mail, Clock, MapPin, Video } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BookingModal } from "@/components/BookingModal";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "email_juanjo";
const EMAILJS_TEMPLATE_ID = "template_vuc3amx";
const EMAILJS_PUBLIC_KEY = "kELxHlcYNM8Donv6X";

const fadeUp: Record<string, any> = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const formSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Ingrese un correo electrónico válido"),
  company: z.string().optional(),
  service: z.string().min(1, "Por favor seleccione un servicio"),
  budget: z.string().min(1, "Por favor seleccione un rango de presupuesto"),
  message: z.string().min(20, "Por favor describa su proyecto (mínimo 20 caracteres)"),
});

type FormValues = z.infer<typeof formSchema>;

const services = [
  "Diseño de productos digitales",
  "Ingeniería web",
  "IA y automatización",
  "Marca e identidad",
  "Proyecto Full-Stack",
  "Otro",
];

const budgets = [
  "Menos de 200€",
  "200€ - 500€",
  "500€ - 1000€",
  "1000€ - 2000€",
  "2000€+",
  "Hablemos",
];

const fieldClass = cn(
  "h-12 bg-white/[0.04] border-white/[0.09] text-white placeholder:text-white/25",
  "focus-visible:ring-white/20 focus-visible:border-white/20 rounded-xl",
  "hover:border-white/15 transition-colors"
);

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "",
      budget: "",
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: values.name,
          from_email: values.email,
          company: values.company || "No indicada",
          service: values.service,
          budget: values.budget,
          message: values.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      toast.success("Mensaje enviado", { description: "Te responderemos en 24 horas." });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Algo salió mal. Por favor envíanos un correo electrónico directamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#090909]">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* Header */}
        <section className="py-24 border-b border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <motion.p variants={fadeUp} initial="hidden" animate="visible"
              className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Ponte en contacto
            </motion.p>
            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
              className="text-6xl md:text-7xl font-extrabold text-white tracking-[-0.04em] leading-[0.95] max-w-3xl mb-6">
              Construyamos algo{" "}
              <span className="text-white/25 font-light italic">genial.</span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="text-lg text-white/45 max-w-xl leading-relaxed">
              Háblanos de tu proyecto. Te responderemos en 24 horas con consejos honestos, un cronograma aproximado y una cifra aproximada, sin compromiso.
            </motion.p>
          </div>
        </section>

        {/* Main grid */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 grid lg:grid-cols-3 gap-16">
            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
                >
                  <div className="h-16 w-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-6">
                    <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-3">¡Mensaje recibido!</h2>
                  <p className="text-white/50 max-w-sm">
                    Revisaremos tu proyecto y te responderemos en 24 horas. Revisa tu bandeja de entrada.
                  </p>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/60 text-sm font-medium">Full name *</FormLabel>
                            <FormControl>
                              <Input id="contact-name" placeholder="Tu nombre" disabled={isLoading} className={fieldClass} {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/60 text-sm font-medium">Email *</FormLabel>
                            <FormControl>
                              <Input id="contact-email" type="email" placeholder="ejemplo@ejemplo.com" disabled={isLoading} className={fieldClass} {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/60 text-sm font-medium">Compañía (opcional)</FormLabel>
                          <FormControl>
                            <Input id="contact-company" placeholder="Compañía" disabled={isLoading} className={fieldClass} {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/60 text-sm font-medium">Servicio necesario *</FormLabel>
                            <FormControl>
                              <select
                                id="contact-service"
                                disabled={isLoading}
                                className={cn(fieldClass, "w-full appearance-none px-3 cursor-pointer")}
                                {...field}
                              >
                                <option value="" className="bg-[#111]">Selecciona un servicio...</option>
                                {services.map((s) => (
                                  <option key={s} value={s} className="bg-[#111]">{s}</option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/60 text-sm font-medium">Rango de presupuesto *</FormLabel>
                            <FormControl>
                              <select
                                id="contact-budget"
                                disabled={isLoading}
                                className={cn(fieldClass, "w-full appearance-none px-3 cursor-pointer")}
                                {...field}
                              >
                                <option value="" className="bg-[#111]">Selecciona un rango de presupuesto...</option>
                                {budgets.map((b) => (
                                  <option key={b} value={b} className="bg-[#111]">{b}</option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/60 text-sm font-medium">Háblanos de tu proyecto *</FormLabel>
                          <FormControl>
                            <textarea
                              id="contact-message"
                              rows={6}
                              disabled={isLoading}
                              placeholder="Describe tu proyecto, objetivos, plazos y cualquier otro detalle relevante..."
                              className={cn(
                                fieldClass,
                                "h-auto w-full px-3 py-3 resize-none focus-visible:outline-none focus-visible:ring-2"
                              )}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    <Button
                      id="contact-submit"
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 rounded-xl bg-white text-black font-bold text-[15px] hover:bg-white/90"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        "Enviar mensaje"
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </div>

            {/* Sidebar info */}
            <div className="space-y-8 lg:pt-8">
              <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] space-y-5">
                <h3 className="font-bold text-white text-lg">Contact details</h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: "Email", value: "contact@novastudio.com", href: "mailto:contact@novastudio.com" },
                    { icon: Clock, label: "Tiempo de respuesta", value: "En 24 horas", href: null },
                    { icon: MapPin, label: "Ubicación", value: "Valencia, España", href: null },
                  ].map((contact) => (
                    <div key={contact.label} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                        <contact.icon className="h-4 w-4 text-white/40" />
                      </div>
                      <div>
                        <div className="text-xs text-white/30 mb-0.5">{contact.label}</div>
                        {contact.href ? (
                          <a href={contact.href} className="text-sm text-white hover:text-white/70 transition-colors">{contact.value}</a>
                        ) : (
                          <div className="text-sm text-white/70">{contact.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-white/[0.14] transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-xl bg-white/[0.06] flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Video className="h-4 w-4 text-white/50" />
                  </div>
                  <h3 className="font-bold text-white text-base">¿Prefieres una llamada?</h3>
                </div>
                <p className="text-sm text-white/45 mb-4 leading-relaxed">
                  Agenda una llamada de descubrimiento gratuita de 30 minutos. Elige el horario que mejor te convenga.
                </p>
                <button
                  id="open-booking-modal"
                  onClick={() => setBookingOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  Agendar una llamada
                </button>
              </div>

              <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Disponible</span>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">
                  Actualmente tenemos capacidad para <span className="text-white font-semibold">1–2 nuevos proyectos</span> a partir de este trimestre.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
}