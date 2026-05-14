import type { Metadata } from "next";
import { LandingClient } from "./landing-client";

export const metadata: Metadata = {
  title: "Agencia de Diseño y Desarrollo Web Profesional | Vynta",
  description:
    "Agencia digital especializada en diseño y desarrollo web a medida. Webs corporativas, tiendas online y aplicaciones web optimizadas para SEO. Pide presupuesto sin compromiso.",
  keywords: [
    "agencia diseño web",
    "agencia desarrollo web",
    "diseño y desarrollo web",
    "agencia digital",
    "diseño web profesional",
    "desarrollo web a medida",
    "crear página web",
    "página web para empresa",
    "tienda online",
    "ecommerce a medida",
    "web corporativa",
    "diseño web Valencia",
    "desarrollo web Valencia",
    "agencia web España",
    "diseñador web freelance",
    "web responsive",
    "SEO incluido",
    "diseño UX UI",
    "presupuesto página web",
    "rediseño web",
  ],
  alternates: {
    canonical: "https://vynta.dev/agencia-digital",
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
  openGraph: {
    title: "Agencia de Diseño y Desarrollo Web Profesional | Vynta",
    description:
      "Diseñamos y desarrollamos webs profesionales que convierten visitantes en clientes. Resultados visibles en menos de 4 semanas.",
    type: "website",
    locale: "es_ES",
    siteName: "Vynta",
    url: "https://vynta.dev/agencia-digital",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agencia de Diseño y Desarrollo Web | Vynta",
    description:
      "Webs profesionales, rápidas y optimizadas para SEO. Pide presupuesto sin compromiso.",
  },
};

export default function AgenciaDigitalLanding() {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: "Vynta",
    description:
      "Agencia de diseño y desarrollo web profesional. Especialistas en webs corporativas, tiendas online y aplicaciones a medida.",
    url: "https://vynta.dev/agencia-digital",
    telephone: "+34-682-37-38-24",
    email: "contact@vynta.dev",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Valencia",
      addressRegion: "Valencia",
      addressCountry: "ES",
    },
    areaServed: {
      "@type": "Country",
      name: "España",
    },
    knowsAbout: [
      "Diseño web",
      "Desarrollo web",
      "Diseño UX/UI",
      "Tiendas online",
      "Optimización SEO",
      "Aplicaciones web",
      "Rediseño web",
    ],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Diseño web profesional" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Desarrollo web a medida" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tienda online (e-commerce)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mantenimiento y SEO" } },
    ],
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Diseño y desarrollo web",
    provider: { "@type": "Organization", name: "Vynta" },
    areaServed: { "@type": "Country", name: "España" },
    description:
      "Diseño y desarrollo de páginas web profesionales, tiendas online y aplicaciones web a medida con SEO incluido.",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "1200",
      highPrice: "25000",
      offerCount: "4",
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cuánto cuesta diseñar y desarrollar una página web profesional?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El precio depende del alcance del proyecto. Una web corporativa parte desde 1.200€, una tienda online desde 2.800€ y una aplicación web a medida desde 6.000€. Te enviamos un presupuesto detallado y sin compromiso en menos de 24 horas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto tiempo tarda en estar lista mi web?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Los proyectos típicos están listos en 3 a 6 semanas. Una web corporativa sencilla puede entregarse en 2 semanas, mientras que una tienda online completa o una app web suele tardar entre 4 y 8 semanas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Trabajáis con WordPress o desarrolláis a medida?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Trabajamos principalmente con desarrollo a medida usando tecnologías modernas como Next.js, React y Node.js, que ofrecen mayor velocidad, seguridad y SEO. También integramos CMS si el cliente necesita autonomía total para editar contenidos.",
        },
      },
      {
        "@type": "Question",
        name: "¿La web estará optimizada para SEO desde el principio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Todas nuestras webs incluyen SEO técnico de base: estructura semántica, datos estructurados, sitemap, optimización de imágenes, Core Web Vitals y meta etiquetas. Sobre esa base ofrecemos servicios opcionales de SEO de contenidos.",
        },
      },
      {
        "@type": "Question",
        name: "¿La web será responsive y rápida en móvil?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Por supuesto. Diseñamos primero para móvil (mobile-first) y optimizamos hasta puntuaciones de 90+ en PageSpeed Insights. La web se verá perfecta en móvil, tablet y escritorio.",
        },
      },
      {
        "@type": "Question",
        name: "¿Ofrecéis mantenimiento web después del lanzamiento?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Disponemos de planes de mantenimiento mensual que incluyen actualizaciones, copias de seguridad, monitorización de seguridad, soporte y pequeños cambios de contenido.",
        },
      },
      {
        "@type": "Question",
        name: "¿Hacéis tiendas online (e-commerce)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Desarrollamos tiendas online con pasarelas de pago (Stripe, Redsys, PayPal), integración con transportistas, gestión de inventario y panel de administración. Trabajamos con Shopify, WooCommerce y soluciones a medida.",
        },
      },
      {
        "@type": "Question",
        name: "¿Trabajáis con clientes fuera de Valencia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Trabajamos en remoto con clientes de toda España y Latinoamérica. Las reuniones se hacen por videollamada y la comunicación es totalmente asíncrona si así lo prefieres.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué pasa si ya tengo una web y solo quiero rediseñarla?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hacemos rediseños y migraciones manteniendo el SEO existente. Auditamos tu web actual, identificamos qué conserva valor y construimos sobre ello sin perder posicionamiento.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <LandingClient />
    </>
  );
}
