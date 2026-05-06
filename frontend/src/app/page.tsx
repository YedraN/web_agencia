import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import dynamic from "next/dynamic";

const ServicesSection = dynamic(() => import("@/components/home/ServicesSection").then(mod => ({ default: mod.ServicesSection })));
const ProcessSection = dynamic(() => import("@/components/home/ProcessSection").then(mod => ({ default: mod.ProcessSection })));
const WhyUsSection = dynamic(() => import("@/components/home/WhyUsSection").then(mod => ({ default: mod.WhyUsSection })));
const CTASection = dynamic(() => import("@/components/home/CTASection").then(mod => ({ default: mod.CTASection })));

export const metadata: Metadata = {
  title: "Nova Studio | Agencia Digital de Diseño, Ingeniería e IA",
  description: "Agencia especializada en diseño de productos digitales, desarrollo web e inteligencia artificial. Construimos productos digitales que importan.",
  keywords: ["agencia digital", "diseño web", "automatización de IA", "UI/UX", "desarrollo web", "productos digitales", "Valencia"],
  openGraph: {
    title: "Nova Studio | Agencia Digital de Diseño, Ingeniería e IA",
    description: "Creamos experiencias digitales de alto nivel para marcas ambiciosas. Diseño, ingeniería e inteligencia artificial.",
    type: "website",
    locale: "es_ES",
    siteName: "Nova Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova Studio | Agencia Digital",
    description: "Agencia especializada en diseño, ingeniería e IA. Construimos productos digitales que importan.",
  },
  alternates: {
    canonical: "https://novastudio.co",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function AgencyHome() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nova Studio",
    description: "Agencia digital especializada en diseño, ingeniería e inteligencia artificial",
    url: "https://novastudio.co",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Valencia",
      addressCountry: "ES",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+34-682-37-38-24",
      contactType: "sales",
    },
    sameAs: [],
    knowsAbout: ["Diseño UX/UI", "Desarrollo Web", "Inteligencia Artificial", "Automatización", "Branding"],
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#090909]">
      <Navbar />

      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <ProcessSection />
        <WhyUsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}