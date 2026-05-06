"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const fadeUp: Record<string, any> = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function PortfolioPage() {
  const t = useTranslations("Portfolio");
  const tc = useTranslations("Portfolio.categories");

  const projects = [
    { title: "Lumina Commerce", category: tc("c1"), desc: { es: "Rediseño completo de plataforma y migración de stack obsoleto a Next.js. Aumento del 34% en tasa de conversión en 60 días post-lanzamiento.", en: "Complete platform redesign and migration from legacy stack to Next.js. 34% increase in conversion rate within 60 days post-launch." }, gradient: "from-violet-900/40 via-violet-800/20 to-transparent", size: "lg:col-span-2 lg:row-span-2" },
    { title: "FinFast App", category: tc("c2"), desc: { es: "Rediseño de una aplicación móvil fintech que redujo la tasa de abandono de usuarios en un 41%.", en: "Fintech mobile app redesign that reduced user churn by 41%." }, gradient: "from-blue-900/40 via-blue-800/20 to-transparent", size: "" },
    { title: "LogisticsX AI Pipeline", category: tc("c3"), desc: { es: "Flujo de trabajo de IA personalizado que automatizó el 80% del procesamiento manual de documentos.", en: "Custom AI workflow that automated 80% of manual document processing." }, gradient: "from-emerald-900/40 via-emerald-800/20 to-transparent", size: "" },
    { title: "Zenith Architecture Brand", category: tc("c4"), desc: { es: "Identidad visual completa y sistema de marketing para una firma de arquitectura líder.", en: "Complete visual identity and marketing system for a leading architecture firm." }, gradient: "from-amber-900/30 via-amber-800/15 to-transparent", size: "lg:col-span-2" },
    { title: "StayLux Booking Agent", category: tc("c3"), desc: { es: "Sistema de reservas de IA conversacional con procesamiento de lenguaje natural e integración CRM.", en: "Conversational AI booking system with natural language processing and CRM integration." }, gradient: "from-pink-900/30 via-pink-800/15 to-transparent", size: "" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#090909]">
      <Navbar />

      <main className="flex-1 pt-24">
        <section className="py-24 border-b border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{t("label")}</motion.p>
            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.5} className="text-6xl md:text-7xl font-extrabold text-white tracking-[-0.04em] leading-[0.95] max-w-3xl mb-6">
              {t("title")} <span className="text-white/25 font-light italic">{t("titleItalic")}</span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1} className="text-lg text-white/45 max-w-xl leading-relaxed">{t("subtitle")}</motion.p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[320px]">
              {projects.map((project, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.15} className={cn("group relative rounded-2xl overflow-hidden border border-white/[0.06]", "bg-white/[0.02] hover:border-white/[0.12] transition-all duration-500 cursor-pointer", project.size)}>
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60 group-hover:opacity-100 transition-opacity duration-700", project.gradient)} />
                  <div className="absolute top-6 left-6 z-10">
                    <span className="text-xs font-semibold text-white/50 uppercase tracking-widest border border-white/[0.1] bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">{project.category}</span>
                  </div>
                  <div className="absolute top-6 right-6 z-10 h-9 w-9 rounded-full bg-white/5 border border-white/[0.1] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 -translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">{project.title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed line-clamp-2">{project.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-white/[0.06]">
          <div className="mx-auto max-w-4xl px-6 sm:px-10 text-center">
            <h2 className="text-5xl font-extrabold text-white tracking-tight leading-[0.95] mb-6">{t("ctaTitle")}</h2>
            <p className="text-white/45 text-base mb-10">{t("ctaSubtitle")}</p>
            <a href="/contact" className="inline-flex items-center gap-2 bg-white text-black font-bold text-[15px] rounded-full px-8 h-14 hover:bg-white/90 transition-colors group">
              {t("ctaButton")}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}