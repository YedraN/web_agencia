import type { Metadata } from "next";
import PortfolioClient from "./portfolio-client";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn
      ? "Portfolio | Vynta — Case Studies & Projects"
      : "Portfolio | Vynta — Casos de Éxito y Proyectos",
    description: isEn
      ? "Explore our portfolio of web design, development, and AI projects. Real results for real clients: e-commerce, fintech, logistics, architecture."
      : "Explora nuestro portfolio de proyectos de diseño web, desarrollo e IA. Resultados reales para clientes reales: e-commerce, fintech, logística, arquitectura.",
    keywords: isEn
      ? ["portfolio digital agency", "web design projects", "case studies", "web development portfolio", "AI projects", "design portfolio"]
      : ["portfolio agencia digital", "proyectos diseño web", "casos de éxito", "portfolio desarrollo web", "proyectos IA", "portfolio diseño"],
    alternates: {
      canonical: isEn ? "https://vynta.dev/en/portfolio" : "https://vynta.dev/portfolio",
      languages: {
        es: "https://vynta.dev/portfolio",
        en: "https://vynta.dev/en/portfolio",
      },
    },
    openGraph: {
      title: isEn ? "Portfolio | Vynta" : "Portfolio | Vynta",
      description: isEn
        ? "See the work we've done for our clients. Real projects, real results."
        : "Mira el trabajo que hemos hecho para nuestros clientes. Proyectos reales, resultados reales.",
      type: "website",
      siteName: "Vynta",
    },
    twitter: {
      card: "summary_large_image",
      title: isEn ? "Portfolio | Vynta" : "Portfolio | Vynta",
    },
  };
}

export default function PortfolioPage() {
  const portfolioLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Vynta Portfolio",
    description: "Portfolio of digital projects by Vynta agency.",
    url: "https://vynta.dev/portfolio",
    provider: { "@type": "Organization", name: "Vynta" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioLd) }}
      />
      <PortfolioClient />
    </>
  );
}
