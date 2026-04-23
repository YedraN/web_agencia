"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Palette, Code2, Cpu, Layers } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const fadeUp: Record<string, any> = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const services = [
  {
    id: "design",
    icon: Palette,
    number: "01",
    title: "Diseño de productos digitales",
    subtitle: "UX & UI Design",
    description:
      "Diseñamos interfaces que los usuarios realmente disfrutan usando. Desde el concepto inicial hasta archivos Figma perfectos, cada pantalla se crea pensando en usuarios reales, no solo en la estética.",
    features: [
      "Investigación de UX y pruebas de usuario",
      "Arquitectura de la información",
      "Wireframing y prototipado",
      "Diseño UI de alta fidelidad",
      "Creación de sistemas de diseño",
      "Accesibilidad (WCAG 2.1 AA)",
    ],
  },
  {
    id: "engineering",
    icon: Code2,
    number: "02",
    title: "Ingeniería web",
    subtitle: "Frontend & Backend",
    description:
      "Creamos aplicaciones rápidas, escalables y mantenibles utilizando las tecnologías más adecuadas para tus necesidades. No seguimos tendencias ciegamente, elegimos lo que funciona.",
    features: [
      "Aplicaciones React / Next.js",
      "APIs REST y GraphQL",
      "Diseño y optimización de bases de datos",
      "Despliegue en la nube (AWS, Vercel)",
      "Optimización del rendimiento",
      "CI/CD y DevOps",
    ],
  },
  {
    id: "ai",
    icon: Cpu,
    number: "03",
    title: "IA y automatización",
    subtitle: "LLMs & Intelligent Workflows",
    description:
      "Integramos IA en productos reales, no en demos. Desde el procesamiento inteligente de documentos hasta asistentes personalizados impulsados por LLM, creamos automatizaciones que realmente ahorran tiempo y dinero.",
    features: [
      "Integración de LLM (GPT-4, Claude, Gemini)",
      "Chatbots y agentes de IA personalizados",
      "Procesamiento de documentos y datos",
      "Automatización de flujos de trabajo (n8n, Zapier)",
      "Análisis predictivo",
      "Sistemas de contenido asistidos por IA",
    ],
  },
  {
    id: "branding",
    icon: Layers,
    number: "04",
    title: "Marca e identidad",
    subtitle: "Estrategia visual",
    description:
      "Tu marca es más que un logo. Desarrollamos identidades visuales completas que escalan en todos los puntos de contacto, desde la web hasta la imprenta, desde presentaciones hasta redes sociales.",
    features: [
      "Diseño de logos y marcas",
      "Sistemas de color y tipografía",
      "Voz y posicionamiento de marca",
      "Creación de activos de marketing",
      "Diseño de presentaciones",
      "Kit de redes sociales",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#090909]">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* Header */}
        <section className="py-24 border-b border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <motion.p variants={fadeUp} initial="hidden" animate="visible"
              className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              ¿Qué hacemos?
            </motion.p>
            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
              className="text-6xl md:text-7xl font-extrabold text-white tracking-[-0.04em] leading-[0.95] max-w-3xl mb-6">
              Servicios diseñados para{" "}
              <span className="text-white/25 font-light italic">impacto.</span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="text-lg text-white/45 max-w-xl leading-relaxed">
              Ofrecemos servicios digitales completos. Ya sea que necesites una habilidad especializada o un socio full-stack, nos adaptamos a tus necesidades.
            </motion.p>
          </div>
        </section>

        {/* Services list */}
        <section className="py-8">
          {services.map((svc, i) => (
            <motion.div
              key={svc.id}
              id={svc.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.3}
              className="border-b border-white/[0.06] py-20"
            >
              <div className="mx-auto max-w-7xl px-6 sm:px-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                  {/* Left */}
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-xs font-mono text-white/25">{svc.number}</span>
                      <div className="h-px flex-1 bg-white/[0.06]" />
                      <span className="text-xs font-semibold uppercase tracking-widest text-white/30">
                        {svc.subtitle}
                      </span>
                    </div>
                    <div className="h-14 w-14 rounded-2xl bg-white/[0.06] flex items-center justify-center mb-8">
                      <svc.icon className="h-6 w-6 text-white/60" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-6">
                      {svc.title}
                    </h2>
                    <p className="text-white/50 leading-relaxed text-[17px] mb-8">
                      {svc.description}
                    </p>
                    <Link
                      href="/contact"
                      className={cn(
                        buttonVariants({ size: "sm" }),
                        "rounded-full bg-white text-black hover:bg-white/90 font-semibold group p-4.5"
                      )}
                    >
                      Hablar de este servicio
                      <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Right */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {svc.features.map((feat) => (
                      <div
                        key={feat}
                        className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] text-sm text-white/60 font-medium"
                      >
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* CTA */}
        <section className="py-32">
          <div className="mx-auto max-w-4xl px-6 sm:px-10 text-center">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[0.95] mb-6">
              ¿No estás seguro de lo que necesitas?
            </h2>
            <p className="text-white/45 text-lg mb-10 max-w-lg mx-auto">
              Reserva una reunión gratuita de 30 minutos. Escucharemos, haremos las preguntas correctas y recomendaremos el mejor camino a seguir, sin presión de ventas.
            </p>
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }), "rounded-full bg-white text-black hover:bg-white/90 font-bold h-14 px-8")}
            >
              Reservar una reunión
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


