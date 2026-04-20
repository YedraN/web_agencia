"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Palette, Code2, Cpu, Layers } from "lucide-react";
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

const services = [
  {
    id: "design",
    icon: Palette,
    number: "01",
    title: "Digital Product Design",
    subtitle: "UX & UI Design",
    description:
      "We design interfaces that users actually enjoy using. From initial concept to pixel-perfect Figma files, every screen is crafted with real users in mind — not just aesthetics.",
    features: [
      "UX Research & User Testing",
      "Information Architecture",
      "Wireframing & Prototyping",
      "High-Fidelity UI Design",
      "Design System Creation",
      "Accessibility (WCAG 2.1 AA)",
    ],
  },
  {
    id: "engineering",
    icon: Code2,
    number: "02",
    title: "Web Engineering",
    subtitle: "Frontend & Backend",
    description:
      "We build fast, scalable, and maintainable applications using the technologies best suited to your needs. We don't follow trends blindly — we choose what works.",
    features: [
      "React / Next.js Applications",
      "REST & GraphQL APIs",
      "Database Design & Optimization",
      "Cloud Deployment (AWS, Vercel)",
      "Performance Optimization",
      "CI/CD & DevOps",
    ],
  },
  {
    id: "ai",
    icon: Cpu,
    number: "03",
    title: "AI & Automation",
    subtitle: "LLMs & Intelligent Workflows",
    description:
      "We integrate AI into real products — not demos. From intelligent document processing to custom LLM-powered assistants, we build automation that actually saves time and money.",
    features: [
      "LLM Integration (GPT-4, Claude, Gemini)",
      "Custom AI Chatbots & Agents",
      "Document & Data Processing",
      "Workflow Automation (n8n, Zapier)",
      "Predictive Analytics",
      "AI-Assisted Content Systems",
    ],
  },
  {
    id: "branding",
    icon: Layers,
    number: "04",
    title: "Brand & Identity",
    subtitle: "Visual Strategy",
    description:
      "Your brand is more than a logo. We develop comprehensive visual identities that scale across every touchpoint — from web to print, from pitch decks to social media.",
    features: [
      "Logo & Mark Design",
      "Color & Typography Systems",
      "Brand Voice & Positioning",
      "Marketing Asset Creation",
      "Pitch Deck Design",
      "Social Media Kit",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#090909]">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* Header */}
        <section className="py-24 border-b border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <motion.p variants={fadeUp} initial="hidden" animate="visible"
              className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              What We Do
            </motion.p>
            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
              className="text-6xl md:text-7xl font-extrabold text-white tracking-[-0.04em] leading-[0.95] max-w-3xl mb-6">
              Services built for{" "}
              <span className="text-white/25 font-light italic">impact.</span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="text-lg text-white/45 max-w-xl leading-relaxed">
              We offer end-to-end digital services. Whether you need a single specialized skill or a full-stack partner, we adapt to your needs.
            </motion.p>
          </div>
        </section>

        {/* Services list */}
        <section className="py-8">
          {services.map((svc, i) => (
            <motion.div
              key={svc.id}
              id={svc.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.3}
              className="border-b border-white/[0.06] py-20"
            >
              <div className="mx-auto max-w-7xl px-6 sm:px-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                  {/* Left */}
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-xs font-mono text-white/25">{svc.number}</span>
                      <div className="h-px flex-1 bg-white/[0.06]" />
                      <span className="text-xs font-semibold uppercase tracking-widest text-white/30">
                        {svc.subtitle}
                      </span>
                    </div>
                    <div className="h-14 w-14 rounded-2xl bg-white/[0.06] flex items-center justify-center mb-8">
                      <svc.icon className="h-6 w-6 text-white/60" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-6">
                      {svc.title}
                    </h2>
                    <p className="text-white/50 leading-relaxed text-[17px] mb-8">
                      {svc.description}
                    </p>
                    <Link
                      href="/contact"
                      className={cn(
                        buttonVariants({ size: "sm" }),
                        "rounded-full bg-white text-black hover:bg-white/90 font-semibold group"
                      )}
                    >
                      Discuss this service
                      <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Right */}
                  <div className="grid grid-cols-2 gap-3">
                    {svc.features.map((feat) => (
                      <div
                        key={feat}
                        className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] text-sm text-white/60 font-medium"
                      >
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* CTA */}
        <section className="py-32">
          <div className="mx-auto max-w-4xl px-6 sm:px-10 text-center">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[0.95] mb-6">
              Not sure what you need?
            </h2>
            <p className="text-white/45 text-lg mb-10 max-w-lg mx-auto">
              Book a free 30-minute discovery call. We'll listen, ask the right questions, and recommend the best path forward — no sales pressure.
            </p>
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }), "rounded-full bg-white text-black hover:bg-white/90 font-bold h-14 px-8")}
            >
              Book a Discovery Call
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


