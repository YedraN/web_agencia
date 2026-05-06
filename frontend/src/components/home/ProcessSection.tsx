"use client";

import { motion } from "framer-motion";
import { fadeUp } from "./animations";
import { processSteps } from "./constants";

export function ProcessSection() {
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
  );
}