"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { buttonVariants } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  MonitorSmartphone,
  Cpu,
  CheckCircle,
  Star,
  TrendingUp,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const fadeUp: Record<string, any> = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: "easeOut" },
  }),
};

const services = [
  {
    icon: MonitorSmartphone,
    title: "Digital Product Design",
    desc: "Interfaces that users love — from wireframes to polished, pixel-perfect products.",
    tag: "Design",
  },
  {
    icon: Code2,
    title: "Web Development",
    desc: "Fast, scalable applications built with the latest frameworks and best practices.",
    tag: "Engineering",
  },
  {
    icon: Cpu,
    title: "AI & Automation",
    desc: "Intelligent workflows and LLM-powered tools that save time and reduce errors.",
    tag: "AI",
  },
  {
    icon: Globe,
    title: "Brand & Identity",
    desc: "Cohesive visual languages that make your brand instantly recognizable worldwide.",
    tag: "Branding",
  },
];

const results = [
  { stat: "3.2×", label: "Average revenue growth for clients in year 1" },
  { stat: "98%", label: "Client satisfaction rate across all engagements" },
  { stat: "40+", label: "Products shipped across 12 countries" },
  { stat: "<2wk", label: "From kick-off to first working prototype" },
];

const testimonials = [
  {
    quote: "Nova Studio redesigned our entire platform in 8 weeks. The quality was staggering — our conversion rate jumped 34%.",
    name: "Elena Rostova",
    role: "CEO, Lumina Commerce",
    initials: "ER",
  },
  {
    quote: "They don't just execute. They think strategically about what you're building and why. Best agency we've worked with.",
    name: "David Wright",
    role: "Founder, FinFast",
    initials: "DW",
  },
  {
    quote: "The AI automation pipeline Nova built cut our operations cost by 60%. It runs flawlessly 24/7 with zero intervention.",
    name: "Carlos Mendoza",
    role: "CTO, LogisticsX",
    initials: "CM",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Discovery & Strategy",
    desc: "We deep-dive into your goals, users, and market. We define what success looks like before writing a single line of code.",
  },
  {
    num: "02",
    title: "Design & Prototype",
    desc: "High-fidelity designs and interactive prototypes let you see and feel the product before we build it.",
  },
  {
    num: "03",
    title: "Build & Iterate",
    desc: "Agile development cycles with weekly demos. You always know what we're working on and why.",
  },
  {
    num: "04",
    title: "Launch & Scale",
    desc: "We handle deployment, monitor performance, and stay with you post-launch to iterate and grow.",
  },
];

export default function AgencyHome() {
  return (
    <div className="flex min-h-screen flex-col bg-[#090909]">
      <Navbar />

      <main className="flex-1">
        {/* ─── HERO ─────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          {/* Radial glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-white/[0.04] to-transparent rounded-full blur-3xl" />

          <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/60 mb-10"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for new projects · 2026
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-[clamp(3rem,9vw,8rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white mb-8"
            >
              We build
              <br />
              <span className="text-white/25 font-light italic">digital products</span>
              <br />
              that matter.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mx-auto max-w-xl text-[17px] text-white/50 leading-relaxed mb-12"
            >
              Nova Studio is a boutique agency specializing in design, engineering, and AI.
              We partner with ambitious founders and teams to build what others can't.
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
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/portfolio"
                className={cn(
                  buttonVariants({ size: "lg", variant: "ghost" }),
                  "rounded-full text-white/60 hover:text-white hover:bg-white/5 font-medium text-base h-14 px-8"
                )}
              >
                View Our Work
              </Link>
            </motion.div>

            {/* Social proof strip */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="mt-20 flex flex-wrap items-center justify-center gap-8 text-white/30 text-sm"
            >
              <span className="font-medium text-white/50">Trusted by teams at</span>
              {["Lumina", "FinFast", "LogisticsX", "StayLux", "Zenith"].map((name) => (
                <span key={name} className="font-semibold text-white/40 hover:text-white/70 transition-colors cursor-default">
                  {name}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── STATS ────────────────────────────────────────── */}
        <section className="border-y border-white/[0.06] py-16">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-white/[0.06]">
              {results.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.5}
                  className="text-center lg:px-10"
                >
                  <div className="text-5xl font-extrabold text-white tracking-tight mb-2">{item.stat}</div>
                  <div className="text-sm text-white/40 leading-relaxed">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SERVICES ─────────────────────────────────────── */}
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
                  What We Do
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.5}
                  className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05]"
                >
                  End-to-end digital
                  <br />
                  <span className="text-white/30 font-light italic">expertise.</span>
                </motion.h2>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white transition-colors group"
              >
                See all services
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
                        {["Mobile-first responsive design", "Accessibility (WCAG 2.1 AA)", "Design system creation", "User testing & iteration"].map((feat) => (
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

        {/* ─── PROCESS ──────────────────────────────────────── */}
        <section className="py-32 border-t border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4"
            >
              How We Work
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.5}
              className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05] mb-20"
            >
              Our process,{" "}
              <span className="text-white/30 font-light italic">simplified.</span>
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

        {/* ─── TESTIMONIALS ─────────────────────────────────── */}
        <section className="py-32 border-t border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4"
            >
              Client Stories
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.5}
              className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05] mb-16"
            >
              Don't take our word
              <br />
              <span className="text-white/30 font-light italic">for it.</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.2}
                  className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] flex flex-col gap-6"
                >
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-white/60 text-white/60" />
                    ))}
                  </div>
                  <p className="text-white/70 leading-relaxed text-[15px] flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/70">
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{t.name}</div>
                      <div className="text-xs text-white/40">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHY US ───────────────────────────────────────── */}
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
                  Why Nova Studio
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.5}
                  className="text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-8"
                >
                  Built for
                  <br />
                  <span className="text-white/30 font-light italic">ambitious teams.</span>
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={1}
                  className="text-white/50 leading-relaxed mb-8 text-[17px]"
                >
                  Most agencies over-promise and under-deliver. We operate differently.
                  Small team, senior talent, radical transparency, and a bias for shipping.
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
                    Learn about us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: TrendingUp, title: "Results-Driven", desc: "We measure everything and optimize relentlessly. If it's not working, we adapt." },
                  { icon: Shield, title: "Senior-Only Team", desc: "No juniors on your project. Every engagement is led by a seasoned senior." },
                  { icon: Zap, title: "Rapid Execution", desc: "First prototype in under 2 weeks. We move fast without sacrificing quality." },
                ].map((item, i) => (
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

        {/* ─── CTA ──────────────────────────────────────────── */}
        <section className="py-32 border-t border-white/[0.06]">
          <div className="mx-auto max-w-4xl px-6 sm:px-10 text-center">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-extrabold text-white tracking-[-0.04em] leading-[0.95] mb-8"
            >
              Let's build
              <br />
              <span className="text-white/25 font-light italic">something great.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.5}
              className="text-lg text-white/45 mb-12 max-w-lg mx-auto leading-relaxed"
            >
              Tell us about your project. We'll get back to you within 24 hours with honest advice — no sales pitch.
            </motion.p>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
            >
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full bg-white text-black hover:bg-white/90 font-bold text-lg h-16 px-12 group"
                )}
              >
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


