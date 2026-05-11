import type { Metadata } from "next";
import AboutClient from "./about-client";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn
      ? "About Us | Vynta — Digital Agency"
      : "Sobre Nosotros | Vynta — Agencia Digital",
    description: isEn
      ? "We are Vynta, a small and focused digital agency specializing in design, engineering, and AI. Based in Valencia, Spain, we work with ambitious teams worldwide."
      : "Somos Vynta, una agencia digital pequeña y enfocada, especializada en diseño, ingeniería e IA. Con sede en Valencia, España, trabajamos con equipos ambiciosos de todo el mundo.",
    keywords: isEn
      ? ["about vynta", "digital agency team", "who we are", "agency values", "design engineering AI"]
      : ["sobre vynta", "agencia digital equipo", "quiénes somos", "valores agencia", "diseño ingeniería IA"],
    alternates: {
      canonical: isEn ? "https://vynta.dev/en/about" : "https://vynta.dev/about",
      languages: {
        es: "https://vynta.dev/about",
        en: "https://vynta.dev/en/about",
      },
    },
    openGraph: {
      title: isEn ? "About Vynta | Digital Agency" : "Sobre Vynta | Agencia Digital",
      description: isEn
        ? "A small, focused digital agency where every person does their job well. Meet the team."
        : "Una agencia digital pequeña y enfocada donde cada persona hace su trabajo bien. Conoce al equipo.",
      type: "website",
      siteName: "Vynta",
    },
    twitter: {
      card: "summary_large_image",
      title: isEn ? "About Vynta | Digital Agency" : "Sobre Vynta | Agencia Digital",
    },
  };
}

export default function AboutPage() {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vynta",
    description: "Digital agency specializing in design, engineering, and artificial intelligence.",
    url: "https://vynta.dev",
    foundingDate: "2026",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Valencia",
      addressRegion: "Valencia",
      addressCountry: "ES",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+34-682-37-38-24",
      contactType: "sales",
    },
    knowsAbout: ["UX/UI Design", "Web Development", "Artificial Intelligence", "Automation", "Branding"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <AboutClient />
    </>
  );
}
