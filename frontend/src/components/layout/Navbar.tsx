"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { ArrowUpRight, Diamond, Menu, X, Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link as I18nLink, useRouter } from "@/i18n/routing";

const navLinks = [
  { href: "/services", labelKey: "servicios" },
  { href: "/about", labelKey: "agencia" },
];

const locales = [
  { code: "es", label: "ES", name: "Español" },
  { code: "en", label: "EN", name: "English" },
];

export function Navbar() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const currentLocale = pathname.split("/")[1] || "es";
  const currentLang = locales.find((l) => l.code === currentLocale) || locales[0];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = (locale: string) => {
    router.push(pathname, { locale });
    setMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled || menuOpen
          ? "border-b border-white/[0.06] bg-[#090909]/90 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex h-[72px] items-center justify-between">
          {/* Logo */}
          <I18nLink href="/" className="flex items-center gap-2.5 group relative z-50">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
              <Diamond className="h-4 w-4 text-black fill-black" />
            </div>
            <span className="text-[17px] font-bold tracking-tight text-white">
              Nova<span className="text-white/40">Studio</span>
            </span>
          </I18nLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <I18nLink
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  pathname === link.href
                    ? "text-white"
                    : "text-white/50 hover:text-white"
                )}
              >
                {t(link.labelKey)}
              </I18nLink>
            ))}
          </nav>

          {/* CTA + Language */}
          <div className="hidden md:flex items-center gap-3">
            <I18nLink
              href="/login"
              className="text-sm font-medium text-white/50 hover:text-white transition-colors"
            >
              {t("portalCliente")}
            </I18nLink>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium text-white/50 hover:text-white transition-colors px-2 py-1.5 rounded-lg hover:bg-white/5">
                <Languages className="h-3.5 w-3.5" />
                {currentLang.label}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-36 bg-[#111] border-white/[0.08] text-white rounded-xl p-1 shadow-xl">
                {locales.map((loc) => (
                  <DropdownMenuItem
                    key={loc.code}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm cursor-pointer flex items-center justify-between",
                      loc.code === currentLocale
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:text-white focus:bg-white/[0.06]"
                    )}
                    onClick={() => switchLocale(loc.code)}
                  >
                    <span>{loc.name}</span>
                    <span className="text-xs text-white/30">{loc.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <I18nLink
              href="/contact"
              className={cn(
                buttonVariants({ size: "sm" }),
                "rounded-full bg-white text-black hover:bg-white/90 font-semibold px-5 h-9"
              )}
            >
              {t("empiezaProyecto")}
              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </I18nLink>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50 p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[72px] left-0 w-full h-[calc(100vh-72px)] bg-[#090909] border-b border-white/[0.06] flex flex-col md:hidden overflow-y-auto"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <I18nLink
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "text-2xl font-medium transition-colors duration-200",
                      pathname === link.href
                        ? "text-white"
                        : "text-white/50 hover:text-white"
                    )}
                  >
                    {t(link.labelKey)}
                  </I18nLink>
                ))}
              </nav>

              <div className="h-px w-full bg-white/[0.06]" />

              {/* Mobile Language Selector */}
              <div className="flex items-center gap-3">
                <Languages className="h-4 w-4 text-white/40" />
                {locales.map((loc) => (
                  <button
                    key={loc.code}
                    onClick={() => switchLocale(loc.code)}
                    className={cn(
                      "text-sm font-medium px-3 py-1.5 rounded-lg transition-colors",
                      loc.code === currentLocale
                        ? "bg-white/10 text-white"
                        : "text-white/40 hover:text-white"
                    )}
                  >
                    {loc.label}
                  </button>
                ))}
              </div>

              <div className="h-px w-full bg-white/[0.06]" />

              <div className="flex flex-col gap-6">
                <I18nLink
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-medium text-white/50 hover:text-white transition-colors"
                >
                  {t("portalCliente")}
                </I18nLink>
                <I18nLink
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-full bg-white text-black hover:bg-white/90 font-semibold w-full h-14"
                  )}
                >
                  {t("empiezaProyecto")}
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </I18nLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}