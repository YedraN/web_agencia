"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "./animations";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function WhyUsSection() {
  const t = useTranslations("Home.WhyUs");

  const whyUsItems = [
    { icon: "TrendingUp", title: t("item1Title"), desc: t("item1Desc") },
    { icon: "Shield", title: t("item2Title"), desc: t("item2Desc") },
    { icon: "Zap", title: t("item3Title"), desc: t("item3Desc") },
  ];

  return (
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
              {t("label")}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.5}
              className="text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-8"
            >
              {t("title")}
              <br />
              <span className="text-white/30 font-light italic">{t("titleItalic")}</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="text-white/50 leading-relaxed mb-8 text-[17px]"
            >
              {t("description")}
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
                {t("conocenos")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {whyUsItems.map((item, i) => (
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
                  <svg className="h-5 w-5 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {item.icon === "TrendingUp" && (<><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>)}
                    {item.icon === "Shield" && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>}
                    {item.icon === "Zap" && <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>}
                  </svg>
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
  );
}