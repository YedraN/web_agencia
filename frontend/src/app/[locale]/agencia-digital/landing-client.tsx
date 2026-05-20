"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Mail,
  Diamond,
  CheckCircle2,
  Sparkles,
  Zap,
  Shield,
  TrendingUp,
  Code2,
  Palette,
  ShoppingCart,
  Search,
  Loader2,
  ChevronDown,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "email_juanjo";
const EMAILJS_TEMPLATE_ID = "template_vuc3amx";
const EMAILJS_PUBLIC_KEY = "kELxHlcYNM8Donv6X";
const PHONE = "+34 682 37 38 24";
const PHONE_TEL = "+34682373824";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const fieldClass = cn(
  "h-12 bg-white/[0.04] border-white/[0.09] text-white placeholder:text-white/25",
  "focus-visible:ring-white/20 focus-visible:border-white/20 rounded-xl",
  "hover:border-white/15 transition-colors"
);

const formSchema = z.object({
  name: z.string().min(2, "Indícanos tu nombre"),
  email: z.string().email("Introduce un email válido"),
  phone: z.string().min(6, "Introduce un teléfono válido"),
  projectType: z.string().min(1, "Selecciona un tipo de proyecto"),
  message: z.string().min(10, "Cuéntanos un poco más sobre tu proyecto"),
});

type FormValues = z.infer<typeof formSchema>;

const services = [
  {
    icon: Palette,
    title: "Diseño web profesional",
    desc: "Diseño UX/UI moderno, centrado en conversión y construido a partir de un sistema de diseño escalable.",
    features: ["Wireframes y prototipos", "Sistema de diseño", "Mobile-first", "Accesibilidad WCAG"],
  },
  {
    icon: Code2,
    title: "Desarrollo web a medida",
    desc: "Webs corporativas y aplicaciones rápidas con Next.js, React y Node.js. Código propio, sin plantillas.",
    features: ["Next.js + React", "100% responsive", "Hosting incluido", "Panel de administración"],
  },
  {
    icon: ShoppingCart,
    title: "Tiendas online (e-commerce)",
    desc: "Pasarelas de pago, gestión de stock, integración con transportistas y panel de control sencillo.",
    features: ["Stripe / Redsys", "Multi-idioma", "Catálogo dinámico", "Métricas integradas"],
  },
  {
    icon: Search,
    title: "SEO y mantenimiento",
    desc: "SEO técnico desde el primer día y mantenimiento mensual para que la web siga creciendo.",
    features: ["Core Web Vitals 90+", "Datos estructurados", "Backups y seguridad", "Soporte mensual"],
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Entrega en 2-4 semanas",
    desc: "Sprints semanales con demos en vivo. Sin sorpresas, sin retrasos.",
  },
  {
    icon: TrendingUp,
    title: "Optimizadas para vender",
    desc: "Diseñadas para convertir visitas en clientes, no solo para verse bonitas.",
  },
  {
    icon: Shield,
    title: "Código propio, sin ataduras",
    desc: "Tú eres dueño del 100% del código. Cero dependencia de plantillas.",
  },
  {
    icon: Sparkles,
    title: "SEO técnico incluido",
    desc: "Velocidad, datos estructurados y arquitectura pensada para Google.",
  },
];

const process = [
  {
    num: "01",
    title: "Reunión inicial",
    desc: "Videollamada de 30 min para entender tu negocio, objetivos y competencia.",
  },
  {
    num: "02",
    title: "Diseño y prototipo",
    desc: "Diseñamos cada pantalla en Figma y la validamos contigo antes de tocar código.",
  },
  {
    num: "03",
    title: "Desarrollo y revisiones",
    desc: "Desarrollamos en sprints semanales con un enlace de preview siempre actualizado.",
  },
  {
    num: "04",
    title: "Lanzamiento y soporte",
    desc: "Publicamos la web, te formamos y te acompañamos los primeros meses.",
  },
];

const projectTypes = [
  "Web corporativa",
  "Tienda online (e-commerce)",
  "Aplicación web (web app)",
  "Rediseño de web actual",
  "Landing page para campaña",
  "Otro",
];

const trustBadges = [
  { num: "40+", label: "Proyectos entregados" },
  { num: "98%", label: "Clientes satisfechos" },
  { num: "<4 sem", label: "Tiempo medio de entrega" },
  { num: "5★", label: "Valoración media" },
];

const faqs = [
  {
    q: "¿Cuánto cuesta diseñar y desarrollar una página web profesional?",
    a: "El precio depende del alcance del proyecto. Una web corporativa parte desde 1.200€, una tienda online desde 2.800€ y una aplicación web a medida desde 6.000€. Te enviamos un presupuesto detallado y sin compromiso en menos de 24 horas.",
  },
  {
    q: "¿Cuánto tiempo tarda en estar lista mi web?",
    a: "Los proyectos típicos están listos en 3 a 6 semanas. Una web corporativa sencilla puede entregarse en 2 semanas, mientras que una tienda online completa o una app web suele tardar entre 4 y 8 semanas.",
  },
  {
    q: "¿Trabajáis con WordPress o desarrolláis a medida?",
    a: "Trabajamos principalmente con desarrollo a medida usando tecnologías modernas como Next.js, React y Node.js, que ofrecen mayor velocidad, seguridad y SEO. También integramos CMS si el cliente necesita autonomía total para editar contenidos.",
  },
  {
    q: "¿La web estará optimizada para SEO desde el principio?",
    a: "Sí. Todas nuestras webs incluyen SEO técnico de base: estructura semántica, datos estructurados, sitemap, optimización de imágenes, Core Web Vitals y meta etiquetas. Sobre esa base ofrecemos servicios opcionales de SEO de contenidos.",
  },
  {
    q: "¿La web será responsive y rápida en móvil?",
    a: "Por supuesto. Diseñamos primero para móvil (mobile-first) y optimizamos hasta puntuaciones de 90+ en PageSpeed Insights. La web se verá perfecta en móvil, tablet y escritorio.",
  },
  {
    q: "¿Ofrecéis mantenimiento web después del lanzamiento?",
    a: "Sí. Disponemos de planes de mantenimiento mensual que incluyen actualizaciones, copias de seguridad, monitorización de seguridad, soporte y pequeños cambios de contenido.",
  },
  {
    q: "¿Hacéis tiendas online (e-commerce)?",
    a: "Sí. Desarrollamos tiendas online con pasarelas de pago (Stripe, Redsys, PayPal), integración con transportistas, gestión de inventario y panel de administración. Trabajamos con Shopify, WooCommerce y soluciones a medida.",
  },
  {
    q: "¿Trabajáis con clientes fuera de Valencia?",
    a: "Sí. Trabajamos en remoto con clientes de toda España y Latinoamérica. Las reuniones se hacen por videollamada y la comunicación es totalmente asíncrona si así lo prefieres.",
  },
  {
    q: "¿Qué pasa si ya tengo una web y solo quiero rediseñarla?",
    a: "Hacemos rediseños y migraciones manteniendo el SEO existente. Auditamos tu web actual, identificamos qué conserva valor y construimos sobre ello sin perder posicionamiento.",
  },
];

export function LandingClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "",
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
          company: values.phone,
          service: values.projectType,
          budget: "Landing /agencia-digital",
          message: values.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
      toast.success("¡Mensaje enviado!", {
        description: "Te respondemos en menos de 24 horas.",
      });
    } catch (err) {
      console.error("EmailJS error:", err);
      toast.error("No hemos podido enviar el mensaje. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#090909]">
      {/* MINIMAL HEADER — solo logo + teléfono, sin links de navegación */}
      <header className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-[#090909]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="flex h-[68px] items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                <Diamond className="h-4 w-4 text-black fill-black" />
              </div>
              <span className="text-[17px] font-bold tracking-tight text-white">
                Nova<span className="text-white/40">Studio</span>
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={`tel:${PHONE_TEL}`}
                className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                {PHONE}
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center gap-1.5 rounded-full bg-white text-black hover:bg-white/90 font-semibold px-4 sm:px-5 h-9 text-sm transition-colors"
              >
                Pedir presupuesto
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[500px] bg-gradient-to-b from-white/[0.04] to-transparent rounded-full blur-3xl" />

          <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/60 mb-10"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Disponible para nuevos proyectos · 2026
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-[clamp(2.25rem,7vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white mb-8 text-balance"
            >
              Agencia de diseño y
              <br />
              <span className="text-white/25 font-light italic">desarrollo web</span>
              <br />
              que sí convierte.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mx-auto max-w-2xl text-[17px] text-white/55 leading-relaxed mb-12"
            >
              Diseñamos y desarrollamos páginas web profesionales, tiendas online y
              aplicaciones a medida. Webs rápidas, optimizadas para SEO y pensadas para
              vender. Resultados visibles en menos de 4 semanas.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
            >
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black hover:bg-white/90 font-bold text-base h-14 px-8 group transition-colors"
              >
                Pedir presupuesto gratis
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center justify-center gap-2 rounded-full text-white/70 hover:text-white hover:bg-white/5 font-medium text-base h-14 px-8 transition-colors"
              >
                <Phone className="h-4 w-4" />
                {PHONE}
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/40"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/70" /> Respuesta en 24h
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/70" /> Presupuesto sin compromiso
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/70" /> Sin permanencia
              </span>
            </motion.div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="border-y border-white/[0.06] py-14">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-white/[0.06]">
              {trustBadges.map((item, i) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.5}
                  className="text-center lg:px-10"
                >
                  <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                    {item.num}
                  </div>
                  <div className="text-sm text-white/40 leading-relaxed">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICIOS */}
        <section className="py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="max-w-2xl mb-16">
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4"
              >
                Lo que hacemos
              </motion.p>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.5}
                className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05]"
              >
                Diseño y desarrollo web
                <br />
                <span className="text-white/30 font-light italic">de extremo a extremo.</span>
              </motion.h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {services.map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <motion.article
                    key={svc.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i * 0.2}
                    className="group relative p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500"
                  >
                    <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="h-12 w-12 rounded-xl bg-white/[0.06] flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                      <Icon className="h-5 w-5 text-white/70" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{svc.title}</h3>
                    <p className="text-white/50 leading-relaxed mb-6">{svc.desc}</p>
                    <ul className="space-y-2.5">
                      {svc.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-center gap-3 text-sm text-white/55"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-white/30 shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* POR QUÉ */}
        <section className="py-28 border-t border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="lg:sticky lg:top-28">
                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4"
                >
                  Por qué elegirnos
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.5}
                  className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-6"
                >
                  Webs profesionales,
                  <br />
                  <span className="text-white/30 font-light italic">sin sorpresas.</span>
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={1}
                  className="text-white/50 leading-relaxed text-[17px]"
                >
                  No hacemos plantillas reempaquetadas. Construimos cada proyecto a medida,
                  con código limpio, métricas claras y un equipo senior que entrega lo que
                  promete.
                </motion.p>
              </div>

              <div className="grid gap-4">
                {benefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <motion.div
                      key={b.title}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={i * 0.2}
                      className="flex gap-5 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
                    >
                      <div className="h-11 w-11 rounded-xl bg-white/[0.06] flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-white/70" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white mb-1">{b.title}</h3>
                        <p className="text-sm text-white/45 leading-relaxed">{b.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* PROCESO */}
        <section className="py-28 border-t border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4"
            >
              Cómo trabajamos
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.5}
              className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05] mb-20"
            >
              De idea a web online{" "}
              <span className="text-white/30 font-light italic">en 4 pasos.</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, i) => (
                <motion.div
                  key={step.num}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.2}
                >
                  <div className="text-6xl font-extrabold text-white/[0.06] mb-6 leading-none">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIO BREVE */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="mx-auto max-w-3xl px-6 sm:px-10 text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center justify-center gap-1 mb-6"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-white text-white" />
              ))}
            </motion.div>
            <motion.blockquote
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.5}
              className="text-2xl md:text-3xl font-medium text-white/85 leading-relaxed text-balance"
            >
              &ldquo;Nos hicieron una web que multiplicó por 3 las solicitudes
              entrantes en el primer mes. Profesionales, rápidos y muy claros con los
              tiempos.&rdquo;
            </motion.blockquote>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="mt-8 text-sm text-white/40"
            >
              Cliente del sector servicios · Valencia
            </motion.div>
          </div>
        </section>

        {/* FORM / CTA */}
        <section
          id="contacto"
          className="py-28 border-t border-white/[0.06] scroll-mt-20"
        >
          <div className="mx-auto max-w-7xl px-6 sm:px-10 grid lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                Pide presupuesto
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-[-0.03em] leading-[1.05] mb-6 text-balance">
                Cuéntanos tu proyecto.{" "}
                <span className="text-white/30 font-light italic">
                  Te respondemos en 24h.
                </span>
              </h2>
              <p className="text-white/50 leading-relaxed mb-8">
                Sin compromiso, sin argumentos de venta. Recibirás una propuesta clara,
                un presupuesto realista y un cronograma detallado.
              </p>

              <div className="space-y-4">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <div className="h-10 w-10 rounded-xl bg-white/[0.05] flex items-center justify-center">
                    <Phone className="h-4 w-4 text-white/60" />
                  </div>
                  <div>
                    <div className="text-xs text-white/30">Teléfono</div>
                    <div className="text-sm font-medium">{PHONE}</div>
                  </div>
                </a>
                <a
                  href="mailto:contact@vynta.dev"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <div className="h-10 w-10 rounded-xl bg-white/[0.05] flex items-center justify-center">
                    <Mail className="h-4 w-4 text-white/60" />
                  </div>
                  <div>
                    <div className="text-xs text-white/30">Email</div>
                    <div className="text-sm font-medium">contact@vynta.dev</div>
                  </div>
                </a>
              </div>

              <div className="mt-10 p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                    Disponibles ahora
                  </span>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">
                  Estamos aceptando 3 proyectos nuevos para este trimestre.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20 px-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
                >
                  <div className="h-16 w-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">
                    ¡Mensaje recibido!
                  </h3>
                  <p className="text-white/50 max-w-sm">
                    Hemos recibido tu solicitud. Te respondemos por email en menos de
                    24 horas con una propuesta clara y un cronograma.
                  </p>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5 p-6 sm:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/60 text-sm font-medium">
                              Nombre completo *
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Cómo te llamas"
                                disabled={isLoading}
                                className={fieldClass}
                                {...field}
                              />
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
                            <FormLabel className="text-white/60 text-sm font-medium">
                              Email *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="tu@email.com"
                                disabled={isLoading}
                                className={fieldClass}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/60 text-sm font-medium">
                            Teléfono *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+34 600 00 00 00"
                              disabled={isLoading}
                              className={fieldClass}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/60 text-sm font-medium">
                            Tipo de proyecto *
                          </FormLabel>
                          <FormControl>
                            <select
                              disabled={isLoading}
                              className={cn(
                                fieldClass,
                                "w-full appearance-none px-3 cursor-pointer"
                              )}
                              {...field}
                            >
                              <option value="" className="bg-[#111]">
                                ¿Qué necesitas?
                              </option>
                              {projectTypes.map((p) => (
                                <option key={p} value={p} className="bg-[#111]">
                                  {p}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/60 text-sm font-medium">
                            Cuéntanos tu proyecto *
                          </FormLabel>
                          <FormControl>
                            <textarea
                              rows={5}
                              disabled={isLoading}
                              placeholder="Sector, objetivos, plazos aproximados, referencias que te gusten…"
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
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 rounded-xl bg-white text-black font-bold text-[15px] hover:bg-white/90"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enviando…
                        </>
                      ) : (
                        <>
                          Enviar y recibir presupuesto
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-white/30 text-center pt-1">
                      Al enviar aceptas nuestra política de privacidad. No compartimos
                      tus datos.
                    </p>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-28 border-t border-white/[0.06]">
          <div className="mx-auto max-w-4xl px-6 sm:px-10">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4 text-center"
            >
              Preguntas frecuentes
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.5}
              className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-16 text-center text-balance"
            >
              Dudas habituales sobre{" "}
              <span className="text-white/30 font-light italic">
                diseño y desarrollo web.
              </span>
            </motion.h2>

            <div className="space-y-3">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <motion.div
                    key={faq.q}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i * 0.05}
                    className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
                      aria-expanded={isOpen}
                    >
                      <h3 className="text-base sm:text-lg font-semibold text-white">
                        {faq.q}
                      </h3>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-white/40 shrink-0 transition-transform duration-300",
                          isOpen && "rotate-180 text-white"
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 text-white/55 leading-relaxed">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-28 border-t border-white/[0.06]">
          <div className="mx-auto max-w-4xl px-6 sm:px-10 text-center">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-extrabold text-white tracking-[-0.04em] leading-[0.95] mb-8 text-balance"
            >
              ¿Listo para tu nueva
              <br />
              <span className="text-white/25 font-light italic">página web?</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.5}
              className="text-lg text-white/45 mb-12 max-w-lg mx-auto leading-relaxed"
            >
              Pide presupuesto y empezamos esta misma semana.
            </motion.p>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black hover:bg-white/90 font-bold text-lg h-16 px-12 group transition-colors"
              >
                Pedir presupuesto gratis
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center justify-center gap-2 rounded-full text-white/70 hover:text-white hover:bg-white/5 font-medium text-base h-16 px-8 transition-colors"
              >
                <Phone className="h-4 w-4" />
                Llámanos: {PHONE}
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* MINIMAL FOOTER */}
      <footer className="border-t border-white/[0.06] bg-[#090909] py-10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white">
              <Diamond className="h-3.5 w-3.5 text-black fill-black" />
            </div>
            <span className="text-sm font-bold tracking-tight text-white">
              Nova<span className="text-white/40">Studio</span>
            </span>
          </div>
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Vynta · Valencia, España · Todos los
            derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
