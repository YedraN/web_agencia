"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { JSX } from "react";

const fadeUp: Record<string, any> = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const PaletteIcon = () => (
  <path d="M13.5 3a4.5 4.5 0 0 0-4.26 3.05L9 7H6a3 3 0 0 0 0 6h1.5L9 15a4.5 4.5 0 0 0 4.26 3A4.5 4.5 0 0 0 18 13.5V3h-4.5z" />
);

const CodeIcon = () => (
  <>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </>
);

const CpuIcon = () => (
  <>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </>
);

const LayersIcon = () => (
  <>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </>
);

const iconComponents: Record<string, () => JSX.Element> = {
  Palette: PaletteIcon,
  Code2: CodeIcon,
  Cpu: CpuIcon,
  Layers: LayersIcon,
};

export default function ServicesPage() {
  const t = useTranslations("ServicesPage");

  const services = [
    { id: "design", icon: "Palette", number: "01", title: t("s1.title"), subtitle: t("s1.subtitle"), description: t("s1.description"), features: t.raw("s1.features") },
    { id: "engineering", icon: "Code2", number: "02", title: t("s2.title"), subtitle: t("s2.subtitle"), description: t("s2.description"), features: t.raw("s2.features") },
    { id: "ai", icon: "Cpu", number: "03", title: t("s3.title"), subtitle: t("s3.subtitle"), description: t("s3.description"), features: t.raw("s3.features") },
    { id: "branding", icon: "Layers", number: "04", title: t("s4.title"), subtitle: t("s4.subtitle"), description: t("s4.description"), features: t.raw("s4.features") },
  ];

  const IconComponent = (iconName: string) => {
    const Icon = iconComponents[iconName];
    return Icon ? <Icon /> : null;
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#090909]">
      <Navbar />

      <main className="flex-1 pt-24">
        <section className="py-24 border-b border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <motion.p variants={fadeUp} initial="hidden" animate="visible"
              className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              {t("label")}
            </motion.p>
            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
              className="text-6xl md:text-7xl font-extrabold text-white tracking-[-0.04em] leading-[0.95] max-w-3xl mb-6">
              {t("title")}{" "}
              <span className="text-white/25 font-light italic">{t("titleItalic")}</span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="text-lg text-white/45 max-w-xl leading-relaxed">
              {t("subtitle")}
            </motion.p>
          </div>
        </section>

        <section className="py-8">
          {services.map((svc, i) => {
            const Icon = iconComponents[svc.icon];
            return (
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
                    <div>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="text-xs font-mono text-white/25">{svc.number}</span>
                        <div className="h-px flex-1 bg-white/[0.06]" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-white/30">
                          {svc.subtitle}
                        </span>
                      </div>
                      <div className="h-14 w-14 rounded-2xl bg-white/[0.06] flex items-center justify-center mb-8">
                        <svg className="h-6 w-6 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <Icon />
                        </svg>
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
                        {t("cta")}
                        <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {svc.features.map((feat: string) => (
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
            );
          })}
        </section>

        <section className="py-32">
          <div className="mx-auto max-w-4xl px-6 sm:px-10 text-center">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[0.95] mb-6">
              {t("ctaTitle")}
            </h2>
            <p className="text-white/45 text-lg mb-10 max-w-lg mx-auto">
              {t("ctaSubtitle")}
            </p>
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }), "rounded-full bg-white text-black hover:bg-white/90 font-bold h-14 px-8")}
            >
              {t("ctaButton")}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
