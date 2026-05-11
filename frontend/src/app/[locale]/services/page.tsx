import type { Metadata } from "next";
import ServicesClient from "./services-client";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn
      ? "Services | Vynta — Design, Engineering & AI"
      : "Servicios | Vynta — Diseño, Ingeniería e IA",
    description: isEn
      ? "We offer UX/UI design, web development, AI automation, and branding services for ambitious companies. Custom solutions, fast delivery, senior team."
      : "Ofrecemos servicios de diseño UX/UI, desarrollo web, automatización con IA e identidad de marca para empresas ambiciosas. Soluciones a medida, entrega rápida, equipo senior.",
    keywords: isEn
      ? ["UX UI design agency", "web development agency", "AI automation services", "branding agency", "digital agency services", "custom software development"]
      : ["agencia diseño UX UI", "agencia desarrollo web", "servicios automatización IA", "agencia branding", "servicios agencia digital", "desarrollo software a medida"],
    alternates: {
      canonical: isEn ? "https://vynta.dev/en/services" : "https://vynta.dev/services",
      languages: {
        es: "https://vynta.dev/services",
        en: "https://vynta.dev/en/services",
      },
    },
    openGraph: {
      title: isEn ? "Services | Vynta" : "Servicios | Vynta",
      description: isEn
        ? "Design, engineering, AI, and branding services for companies that want results."
        : "Servicios de diseño, ingeniería, IA y branding para empresas que quieren resultados.",
      type: "website",
      siteName: "Vynta",
    },
    twitter: {
      card: "summary_large_image",
      title: isEn ? "Services | Vynta" : "Servicios | Vynta",
    },
  };
}

export default function ServicesPage() {
  const servicesLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "UX/UI Design",
          provider: { "@type": "Organization", name: "Vynta" },
          description: "User interface and experience design for web and mobile products.",
          url: "https://vynta.dev/services#design",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "Web Development",
          provider: { "@type": "Organization", name: "Vynta" },
          description: "Custom web application development with modern technologies.",
          url: "https://vynta.dev/services#engineering",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "AI Automation",
          provider: { "@type": "Organization", name: "Vynta" },
          description: "AI-powered workflow automation and intelligent system integration.",
          url: "https://vynta.dev/services#ai",
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Service",
          name: "Branding & Identity",
          provider: { "@type": "Organization", name: "Vynta" },
          description: "Complete visual identity and brand strategy for growing companies.",
          url: "https://vynta.dev/services#branding",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesLd) }}
      />
      <ServicesClient />
    </>
  );
}
