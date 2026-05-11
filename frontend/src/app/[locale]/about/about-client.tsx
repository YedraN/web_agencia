"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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

export default function AboutPage() {
  const t = useTranslations("About");

  const stats = [
    { num: "40+", label: t("stats.s1") },
    { num: "98%", label: t("stats.s2") },
    { num: "4.5", label: t("stats.s3") },
    { num: "12", label: t("stats.s4") },
  ];

  const values = [
    { num: "01", title: t("v1.title"), desc: t("v1.desc") },
    { num: "02", title: t("v2.title"), desc: t("v2.desc") },
    { num: "03", title: t("v3.title"), desc: t("v3.desc") },
    { num: "04", title: t("v4.title"), desc: t("v4.desc") },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#090909]">
      <Navbar />

      <main className="flex-1 pt-24">
        <section className="py-24 border-b border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{t("label")}</motion.p>
            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.5} className="text-6xl md:text-7xl font-extrabold text-white tracking-[-0.04em] leading-[0.95] max-w-4xl mb-8">
              {t("title")}<br /><span className="text-white/25 font-light italic">{t("titleItalic")}</span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1} className="text-xl text-white/45 max-w-2xl leading-relaxed">{t("subtitle")}</motion.p>
          </div>
        </section>

        <section className="py-32 border-b border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-8">{t("whyTitle")}</motion.h2>
              <div className="space-y-5 text-white/50 text-[17px] leading-relaxed">
                <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.5}>{t("story1")}</motion.p>
                <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.8}>{t("story2")}</motion.p>
                <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1.1}>{t("story3")}</motion.p>
              </div>
            </div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                  <div className="text-4xl font-extrabold text-white mb-2">{stat.num}</div>
                  <div className="text-sm text-white/40">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-32 border-b border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{t("principles")}</p>
              <h2 className="text-5xl font-extrabold text-white tracking-tight leading-[1.05]">{t("operamos")}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.2} className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.01]">
                  <div className="text-5xl font-extrabold text-white/[0.07] mb-6 leading-none">{value.num}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32">
          <div className="mx-auto max-w-4xl px-6 sm:px-10 text-center">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[0.95] mb-6">{t("ctaTitle")}</h2>
            <p className="text-white/45 text-lg mb-10 max-w-lg mx-auto">{t("ctaSubtitle")}</p>
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "rounded-full bg-white text-black hover:bg-white/90 font-bold h-14 px-8 group")}>
              {t("ctaButton")}<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
