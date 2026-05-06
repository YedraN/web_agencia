"use client";

import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "./animations";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[500px] bg-gradient-to-b from-white/[0.04] to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/60 mb-10"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Disponible para nuevos proyectos · 2026
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-[clamp(2.5rem,9vw,8rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white mb-8 text-balance"
        >
          Construimos
          <br />
          <span className="text-white/25 font-light italic">productos digitales</span>
          <br />
          que importan.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mx-auto max-w-xl text-[17px] text-white/50 leading-relaxed mb-12"
        >
          Somos una agencia especializada en diseño, ingeniería e IA.
          Construimos productos digitales que importan.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full bg-white text-black hover:bg-white/90 font-bold text-base h-14 px-8 group"
            )}
          >
            Iniciar un Proyecto
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/portfolio"
            className={cn(
              buttonVariants({ size: "lg", variant: "ghost" }),
              "rounded-full text-white/60 hover:text-white hover:bg-white/5 font-medium text-base h-14 px-8"
            )}
          >
            Ver Nuestro Trabajo
          </Link>
        </motion.div>
      </div>
    </section>
  );
}