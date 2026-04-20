"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { buttonVariants } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  MonitorSmartphone,
  Cpu,
  CheckCircle,
  Star,
  TrendingUp,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const fadeUp: Record<string, any> = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: "easeOut" },
  }),
};

const services = [
  {
    icon: MonitorSmartphone,
    title: "Diseño de Productos Digitales",
    desc: "Interfaces que a los usuarios les encantan — desde wireframes hasta productos pulidos y perfectos.",
    tag: "Diseño",
  },
  {
    icon: Code2,
    title: "Desarrollo Web",
    desc: "Aplicaciones rápidas y escalables construidas con los últimos frameworks y mejores prácticas.",
    tag: "Ingeniería",
  },
  {
    icon: Cpu,
    title: "IA y Automatización",
    desc: "Flujos de trabajo inteligentes y herramientas impulsadas por LLM que ahorran tiempo y reducen errores.",
    tag: "IA",
  },
  {
    icon: Globe,
    title: "Marca e Identidad",
    desc: "Lenguajes visuales cohesivos que hacen que su marca sea instantáneamente reconocible en todo el mundo.",
    tag: "Branding",
  },
];

const results = [
  { stat: "3.2×", label: "Crecimiento promedio de ingresos para clientes en el primer año" },
  { stat: "98%", label: "Tasa de satisfacción del cliente en todos los compromisos" },
  { stat: "40+", label: "Productos entregados en 12 países" },
  { stat: "<2 sem", label: "Desde el inicio hasta el primer prototipo funcional" },
];

const testimonials = [
  {
    quote: "Nova Studio rediseñó toda nuestra plataforma en 8 semanas. La calidad fue asombrosa — nuestra tasa de conversión aumentó un 34 %.",
    name: "Elena Rostova",
    role: "CEO, Lumina Commerce",
    initials: "ER",
  },
  {
    quote: "No solo ejecutan. Piensan estratégicamente en lo que estás construyendo y por qué. La mejor agencia con la que hemos trabajado.",
    name: "David Wright",
    role: "Fundador, FinFast",
    initials: "DW",
  },
  {
    quote: "El pipeline de automatización de IA que construyó Nova redujo nuestros costos operativos en un 60 %. Funciona sin problemas las 24 horas, los 7 días de la semana, con intervención cero.",
    name: "Carlos Mendoza",
    role: "CTO, LogisticsX",
    initials: "CM",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Descubrimiento y Estrategia",
    desc: "Deep-dive en sus objetivos, usuarios y mercado. Definimos cómo es el éxito antes de escribir una sola línea de código.",
  },
  {
    num: "02",
    title: "Diseño y Prototipo",
    desc: "Diseños de alta fidelidad y prototipos interactivos que le permiten ver y sentir el producto antes de construirlo.",
  },
  {
    num: "03",
    title: "Construcción e Iteración",
    desc: "Ciclos de desarrollo ágiles con demostraciones semanales. Siempre sabe en qué estamos trabajando y por qué.",
  },
  {
    num: "04",
    title: "Lanzamiento y Escalado",
    desc: "Nos encargamos del despliegue, monitoreamos el rendimiento y nos quedamos con usted después del lanzamiento para iterar y crecer.",
  },
];

export default function AgencyHome() {
  return (
    <div className="flex min-h-screen flex-col bg-[#090909]">
      <Navbar />

      <main className="flex-1">
        {/* ─── HERO ─────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          {/* Radial glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-white/[0.04] to-transparent rounded-full blur-3xl" />

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
              className="text-[clamp(3rem,9vw,8rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white mb-8"
            >
              Construimos
              <br />
              <span className="text-white/25 font-light italic">productos digitales</span>
              <br />
              que importan.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mx-auto max-w-xl text-[17px] text-white/50 leading-relaxed mb-12"
            >
              Nova Studio es una agencia boutique especializada en diseño, ingeniería e IA.
              Nos asociamos con fundadores y equipos ambiciosos para construir lo que otros no pueden.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full bg-white text-black hover:bg-white/90 font-bold text-base h-14 px-8 group"
                )}
              >
                Iniciar un Proyecto
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/portfolio"
                className={cn(
                  buttonVariants({ size: "lg", variant: "ghost" }),
                  "rounded-full text-white/60 hover:text-white hover:bg-white/5 font-medium text-base h-14 px-8"
                )}
              >
                Ver Nuestro Trabajo
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ─── STATS ────────────────────────────────────────── */}
        <section className="border-y border-white/[0.06] py-16">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-white/[0.06]">
              {results.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.5}
                  className="text-center lg:px-10"
                >
                  <div className="text-5xl font-extrabold text-white tracking-tight mb-2">{item.stat}</div>
                  <div className="text-sm text-white/40 leading-relaxed">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SERVICES ─────────────────────────────────────── */}
        <section className="py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div>
                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4"
                >
                  Lo Que Hacemos
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.5}
                  className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05]"
                >
                  Experiencia digital de
                  <br />
                  <span className="text-white/30 font-light italic">extremo a extremo.</span>
                </motion.h2>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white transition-colors group"
              >
                Ver todos los servicios
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {services.map((svc, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.3}
                  className={cn(
                    "group relative p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]",
                    "transition-all duration-500 overflow-hidden cursor-pointer",
                    i === 0 && "md:row-span-2"
                  )}
                >
                  <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex items-start justify-between mb-8">
                    <div className="h-12 w-12 rounded-xl bg-white/[0.06] flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <svc.icon className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-xs font-semibold text-white/30 uppercase tracking-widest border border-white/[0.08] rounded-full px-3 py-1">
                      {svc.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                    {svc.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed">{svc.desc}</p>

                  {i === 0 && (
                    <div className="mt-8">
                      <ul className="space-y-2.5">
                        {[
                          "Diseño responsivo centrado en móviles",
                          "Accesibilidad (WCAG 2.1 AA)",
                          "Creación de sistemas de diseño",
                          "Pruebas de usuario e iteración",
                        ].map((feat) => (
                          <li key={feat} className="flex items-center gap-3 text-sm text-white/50">
                            <CheckCircle className="h-3.5 w-3.5 text-white/30 shrink-0" />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROCESS ──────────────────────────────────────── */}
        <section className="py-32 border-t border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4"
            >
              Cómo Trabajamos
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.5}
              className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05] mb-20"
            >
              Nuestro proceso,{" "}
              <span className="text-white/30 font-light italic">simplificado.</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.2}
                >
                  <div className="text-6xl font-extrabold text-white/[0.06] mb-6 leading-none">{step.num}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHY US ───────────────────────────────────────── */}
        <section className="py-32 border-t border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4"
                >
                  Por Qué Nova Studio
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.5}
                  className="text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-8"
                >
                  Construido para
                  <br />
                  <span className="text-white/30 font-light italic">equipos ambiciosos.</span>
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={1}
                  className="text-white/50 leading-relaxed mb-8 text-[17px]"
                >
                  La mayoría de las agencias prometen demasiado y no cumplen lo suficiente. Operamos de manera diferente.
                  Equipo pequeño, transparencia radical y una inclinación por la entrega.
                </motion.p>
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={1.5}
                >
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-white/70 transition-colors"
                  >
                    Conócenos
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: TrendingUp, title: "Orientado a Resultados", desc: "Medimos todo y optimizamos sin descanso. Si no funciona, nos adaptamos." },
                  { icon: Shield, title: "Equipo Solo Senior", desc: "Sin juniors en su proyecto. Cada compromiso está liderado por un senior experimentado." },
                  { icon: Zap, title: "Ejecución Rápida", desc: "Primer prototipo en menos de 2 semanas. Nos movemos rápido sin sacrificar la calidad." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i * 0.2}
                    className="flex gap-5 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
                  >
                    <div className="h-10 w-10 rounded-xl bg-white/[0.06] flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-white/60" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-white/45 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA ──────────────────────────────────────────── */}
        <section className="py-32 border-t border-white/[0.06]">
          <div className="mx-auto max-w-4xl px-6 sm:px-10 text-center">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-extrabold text-white tracking-[-0.04em] leading-[0.95] mb-8"
            >
              Construyamos
              <br />
              <span className="text-white/25 font-light italic">algo grandioso.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.5}
              className="text-lg text-white/45 mb-12 max-w-lg mx-auto leading-relaxed"
            >
              Cuéntenos sobre su proyecto. Nos pondremos en contacto con usted en un plazo de 24 horas con un asesoramiento honesto, sin argumentos de venta.
            </motion.p>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
            >
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full bg-white text-black hover:bg-white/90 font-bold text-lg h-16 px-12 group"
                )}
              >
                Póngase en Contacto
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


