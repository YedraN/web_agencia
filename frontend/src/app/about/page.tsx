"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const fadeUp: Record<string, any> = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const values = [
  {
    num: "01",
    title: "Transparencia radical",
    desc: "Siempre sabrás en qué estamos trabajando, por qué y cuánto cuesta. Sin cargos ocultos, sin sorpresas.",
  },
  {
    num: "02",
    title: "Calidad sobre cantidad",
    desc: "Trabajamos con menos clientes para dar a cada proyecto la atención que merece. Tu proyecto nunca es solo un número.",
  },
  {
    num: "03",
    title: "Talento senior, siempre",
    desc: "Cada proyecto es liderado por seniors experimentados. No entregamos tu proyecto a juniors.",
  },
  {
    num: "04",
    title: "Resultados que tienen sentido",
    desc: "Medimos el éxito por los resultados, no por las entregas. Si no mueve la aguja, iteramos.",
  },
];

const team = [
  { name: "Alex Monroe", role: "Director Creativo", initials: "AM" },
  { name: "Sarah Chen", role: "Ingeniera Principal", initials: "SC" },
  { name: "Marcus Silva", role: "Especialista en IA", initials: "MS" },
  { name: "Priya Patel", role: "Líder de UX", initials: "PP" },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#090909]">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* Header */}
        <section className="py-24 border-b border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <motion.p variants={fadeUp} initial="hidden" animate="visible"
              className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              La Agencia
            </motion.p>
            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
              className="text-6xl md:text-7xl font-extrabold text-white tracking-[-0.04em] leading-[0.95] max-w-4xl mb-8">
              Somos Nova Studio.
              <br />
              <span className="text-white/25 font-light italic">Equipo pequeño, grandes ideas.</span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="text-xl text-white/45 max-w-2xl leading-relaxed">
              Fundada en 2021, somos una agencia digital boutique de diseñadores, ingenieros y especialistas en IA.
              No aceptamos 40 clientes a la vez. Nos enfocamos en un puñado de proyectos ambiciosos y ponemos todo nuestro esfuerzo en hacerlos excepcionales.
            </motion.p>
          </div>
        </section>

        {/* Story */}
        <section className="py-32 border-b border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-8">
                Por qué existimos
              </motion.h2>
              <div className="space-y-5 text-white/50 text-[17px] leading-relaxed">
                <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.5}>
                  La mayoría de las agencias digitales crecieron demasiado rápido. Escalaron a cientos de empleados, aceptaron a todos los clientes que pudieron y comenzaron a optimizar por ingresos en lugar de resultados. Tu proyecto sería manejado por quien estuviera disponible, no por quien fuera el mejor.
                </motion.p>
                <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.8}>
                  Creamos Nova Studio como el antídoto. Una agencia pequeña y enfocada donde cada persona senior que conoces en la presentación es realmente la que hace el trabajo.
                </motion.p>
                <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1.1}>
                  Somos selectivos con los proyectos que aceptamos, no porque seamos arrogantes, sino porque creemos genuinamente que menos proyectos, pero mejores, conducen a mejores resultados para todos.
                </motion.p>
              </div>
            </div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { num: "40+", label: "Projects shipped" },
                { num: "98%", label: "Client satisfaction" },
                { num: "4.5yr", label: "Average retention" },
                { num: "12", label: "Countries served" },
              ].map((stat, i) => (
                <div key={i} className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                  <div className="text-4xl font-extrabold text-white mb-2">{stat.num}</div>
                  <div className="text-sm text-white/40">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-32 border-b border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Nuestros Principios</p>
              <h2 className="text-5xl font-extrabold text-white tracking-tight leading-[1.05]">
                Cómo operamos
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.2}
                  className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.01]"
                >
                  <div className="text-5xl font-extrabold text-white/[0.07] mb-6 leading-none">{value.num}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-32 border-b border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">El equipo</p>
              <h2 className="text-5xl font-extrabold text-white tracking-tight leading-[1.05]">
                Con quién trabajarás
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.15}
                  className="group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all"
                >
                  <div className="h-20 w-20 rounded-2xl bg-white/[0.06] flex items-center justify-center mb-5 text-xl font-bold text-white/40 group-hover:bg-white/10 transition-colors">
                    {member.initials}
                  </div>
                  <h3 className="font-bold text-white text-lg mb-1">{member.name}</h3>
                  <p className="text-sm text-white/40">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32">
          <div className="mx-auto max-w-4xl px-6 sm:px-10 text-center">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[0.95] mb-6">
              ¿Suena como un buen equipo?
            </h2>
            <p className="text-white/45 text-lg mb-10 max-w-lg mx-auto">
              Tenemos capacidad para uno o dos nuevos clientes este trimestre. Si estás construyendo algo ambicioso, queremos saber de ti.
            </p>
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }), "rounded-full bg-white text-black hover:bg-white/90 font-bold h-14 px-8 group")}
            >
              Empecemos a trabajar
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


