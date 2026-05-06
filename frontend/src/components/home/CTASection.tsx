"use client";

import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "./animations";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function CTASection() {
  const t = useTranslations("Home.CTA");

  return (
    <section className="py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-4xl px-6 sm:px-10 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-5xl md:text-8xl font-extrabold text-white tracking-[-0.04em] leading-[0.95] mb-8 text-balance"
        >
          {t("title")}
          <br />
          <span className="text-white/25 font-light italic">{t("titleItalic")}</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.5}
          className="text-lg text-white/45 mb-12 max-w-lg mx-auto leading-relaxed"
        >
          {t("subtitle")}
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
            {t("cta")}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}