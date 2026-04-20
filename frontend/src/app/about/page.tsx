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
    title: "Radical transparency",
    desc: "You'll always know what we're working on, why, and what it costs. No hidden fees, no surprises.",
  },
  {
    num: "02",
    title: "Quality over volume",
    desc: "We work with fewer clients to give each engagement the attention it deserves. Your project is never just a number.",
  },
  {
    num: "03",
    title: "Senior talent, always",
    desc: "Every engagement is led by experienced seniors. We don't hand your project off to juniors.",
  },
  {
    num: "04",
    title: "Results that make sense",
    desc: "We measure success by outcomes, not deliverables. If it doesn't move the needle, we iterate.",
  },
];

const team = [
  { name: "Alex Monroe", role: "Creative Director", initials: "AM" },
  { name: "Sarah Chen", role: "Lead Engineer", initials: "SC" },
  { name: "Marcus Silva", role: "AI Specialist", initials: "MS" },
  { name: "Priya Patel", role: "UX Lead", initials: "PP" },
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
              The Agency
            </motion.p>
            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
              className="text-6xl md:text-7xl font-extrabold text-white tracking-[-0.04em] leading-[0.95] max-w-4xl mb-8">
              We're Nova Studio.
              <br />
              <span className="text-white/25 font-light italic">Small team, big ideas.</span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="text-xl text-white/45 max-w-2xl leading-relaxed">
              Founded in 2021, we're a boutique digital agency of designers, engineers, and AI specialists.
              We don't take on 40 clients at once. We focus on a handful of ambitious projects and pour everything into making them exceptional.
            </motion.p>
          </div>
        </section>

        {/* Story */}
        <section className="py-32 border-b border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-8">
                Why we exist
              </motion.h2>
              <div className="space-y-5 text-white/50 text-[17px] leading-relaxed">
                <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.5}>
                  Most digital agencies grew too fast. They scaled to hundreds of employees, took on every client they could, and started optimizing for revenue over results. Your project would be handled by whoever was available, not who was best.
                </motion.p>
                <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.8}>
                  We built Nova Studio as the antidote. A small, focused agency where every senior person you meet in the pitch is actually the one doing the work.
                </motion.p>
                <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1.1}>
                  We're selective about the projects we take on — not because we're arrogant, but because we genuinely believe that fewer, better projects lead to better outcomes for everyone.
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
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Our Principles</p>
              <h2 className="text-5xl font-extrabold text-white tracking-tight leading-[1.05]">
                How we operate
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
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">The People</p>
              <h2 className="text-5xl font-extrabold text-white tracking-tight leading-[1.05]">
                Who you'll work with
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
              Sound like a fit?
            </h2>
            <p className="text-white/45 text-lg mb-10 max-w-lg mx-auto">
              We have capacity for one or two new clients this quarter. If you're building something ambitious, we want to hear from you.
            </p>
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }), "rounded-full bg-white text-black hover:bg-white/90 font-bold h-14 px-8 group")}
            >
              Start a Conversation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


