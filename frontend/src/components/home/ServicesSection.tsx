"use client";

import { ArrowUpRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "./animations";
import { services } from "./constants";

export function ServicesSection() {
  return (
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
  );
}