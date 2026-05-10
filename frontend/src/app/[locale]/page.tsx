import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import dynamic from "next/dynamic";

const ServicesSection = dynamic(() => import("@/components/home/ServicesSection").then(mod => ({ default: mod.ServicesSection })));
const ProcessSection = dynamic(() => import("@/components/home/ProcessSection").then(mod => ({ default: mod.ProcessSection })));
const WhyUsSection = dynamic(() => import("@/components/home/WhyUsSection").then(mod => ({ default: mod.WhyUsSection })));
const CTASection = dynamic(() => import("@/components/home/CTASection").then(mod => ({ default: mod.CTASection })));

export default function AgencyHome() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vynta",
    description: "Digital agency specializing in design, engineering, and artificial intelligence",
    url: "https://vynta.dev",
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
    knowsAbout: ["UX/UI Design", "Web Development", "Artificial Intelligence", "Automation", "Branding"],
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