"use client";

import { motion } from "framer-motion";
import { fadeUp } from "./animations";
import { useTranslations } from "next-intl";

const stats = [
  { statKey: "stat1", labelKey: "stat1Label" },
  { statKey: "stat2", labelKey: "stat2Label" },
  { statKey: "stat3", labelKey: "stat3Label" },
  { statKey: "stat4", labelKey: "stat4Label" },
];

export function StatsSection() {
  const t = useTranslations("Home.Stats");

  return (
    <section className="border-y border-white/[0.06] py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-white/[0.06]">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.5}
              className="text-center lg:px-10"
            >
              <div className="text-5xl font-extrabold text-white tracking-tight mb-2">{t(item.statKey)}</div>
              <div className="text-sm text-white/40 leading-relaxed">{t(item.labelKey)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}