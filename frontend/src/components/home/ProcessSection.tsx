"use client";

import { motion } from "framer-motion";
import { fadeUp } from "./animations";
import { useTranslations } from "next-intl";

const steps = [
  { num: "01", titleKey: "discoveryTitle", descKey: "discoveryDesc" },
  { num: "02", titleKey: "designTitle", descKey: "designDesc" },
  { num: "03", titleKey: "buildTitle", descKey: "buildDesc" },
  { num: "04", titleKey: "launchTitle", descKey: "launchDesc" },
];

export function ProcessSection() {
  const t = useTranslations("Home.Process");

  const processSteps = [
    { num: "01", title: "Descubrimiento y Estrategia", desc: "Deep-dive en sus objetivos, usuarios y mercado. Definimos c�mo es el �xito antes de escribir una sola l�nea de c�digo." },
    { num: "02", title: "Dise�o y Prototipo", desc: "Dise�os de alta fidelidad y prototipos interactivos que le permiten ver y sentir el producto antes de construirlo." },
    { num: "03", title: "Construcci�n e Iteraci�n", desc: "Ciclos de desarrollo �giles con demostraciones semanales. Siempre sabe en qu� estamos trabajando y por qu�." },
    { num: "04", title: "Lanzamiento y Escalado", desc: "Nos encargamos del despliegue, monitoreamos el rendimiento y nos quedamos con usted despu�s del lanzamiento para iterar y crecer." },
  ];

  return (
    <section className="py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
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
          className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05] mb-20"
        >
          {t("title")}{" "}
          <span className="text-white/30 font-light italic">{t("titleItalic")}</span>
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
  );
}