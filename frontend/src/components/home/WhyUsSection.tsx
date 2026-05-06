"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "./animations";
import { whyUsItems } from "./constants";

export function WhyUsSection() {
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
  );
}