"use client";

import { ArrowUpRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "./animations";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const serviceIcons = [
  { icon: "MonitorSmartphone", tag: "tag", title: "title", desc: "desc", iconKey: "MonitorSmartphone" },
  { icon: "Code2", tag: "tag", title: "title", desc: "desc", iconKey: "Code2" },
  { icon: "Cpu", tag: "tag", title: "title", desc: "desc", iconKey: "Cpu" },
  { icon: "Globe", tag: "tag", title: "title", desc: "desc", iconKey: "Globe" },
];

export function ServicesSection() {
  const t = useTranslations("Home");
  const ts = useTranslations("Home.Services");

  const services = [
    { icon: "MonitorSmartphone", tag: "Dise�o", title: "Dise�o de Productos Digitales", desc: "Interfaces que a los usuarios les encantan � desde wireframes hasta productos pulidos y perfectos.", tagKey: "designTag" },
    { icon: "Code2", tag: "Ingenier�a", title: "Desarrollo Web", desc: "Aplicaciones r�pidas y escalables construidas con los �ltimos frameworks y mejores pr�cticas.", tagKey: "engTag" },
    { icon: "Cpu", tag: "IA", title: "IA y Automatizaci�n", desc: "Flujos de trabajo inteligentes y herramientas impulsadas por LLM que ahorran tiempo y reducen errores.", tagKey: "aiTag" },
    { icon: "Globe", tag: "Branding", title: "Marca e Identidad", desc: "Lenguajes visuales cohesivos que hacen que su marca sea instant�neamente reconocible en todo el mundo.", tagKey: "brandTag" },
  ];

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
              {ts("label")}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.5}
              className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05]"
            >
              {ts("title")}
              <br />
              <span className="text-white/30 font-light italic">{ts("titleItalic")}</span>
            </motion.h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white transition-colors group"
          >
            {ts("verTodos")}
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
                  <svg className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {svc.icon === "MonitorSmartphone" && <><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></>}
                    {svc.icon === "Code2" && <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>}
                    {svc.icon === "Cpu" && <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></>}
                    {svc.icon === "Globe" && <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>}
                  </svg>
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
                    {[ts("feature1"), ts("feature2"), ts("feature3"), ts("feature4")].map((feat) => (
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