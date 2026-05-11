import type { Metadata } from "next";
import ContactClient from "./contact-client";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn
      ? "Contact | Vynta — Start Your Project"
      : "Contacto | Vynta — Empieza Tu Proyecto",
    description: isEn
      ? "Get in touch with Vynta. Tell us about your project and we'll reply within 24 hours. Based in Valencia, Spain. Remote-friendly worldwide."
      : "Contacta con Vynta. Cuéntanos tu proyecto y te respondemos en menos de 24 horas. Con sede en Valencia, España. Trabajamos en remoto con clientes de todo el mundo.",
    keywords: isEn
      ? ["contact digital agency", "hire web agency", "request quote web", "start project agency", "contact Vynta"]
      : ["contactar agencia digital", "contratar agencia web", "pedir presupuesto web", "iniciar proyecto agencia", "contactar Vynta"],
    alternates: {
      canonical: isEn ? "https://vynta.dev/en/contact" : "https://vynta.dev/contact",
      languages: {
        es: "https://vynta.dev/contact",
        en: "https://vynta.dev/en/contact",
      },
    },
    openGraph: {
      title: isEn ? "Contact Vynta | Start Your Project" : "Contacta Vynta | Empieza Tu Proyecto",
      description: isEn
        ? "Tell us about your project. We reply in under 24 hours."
        : "Cuéntanos tu proyecto. Respondemos en menos de 24 horas.",
      type: "website",
      siteName: "Vynta",
    },
    twitter: {
      card: "summary_large_image",
      title: isEn ? "Contact Vynta" : "Contacta Vynta",
    },
  };
}

export default function ContactPage() {
  const contactLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Vynta",
    url: "https://vynta.dev/contact",
    description: "Contact page for Vynta digital agency.",
    mainEntity: {
      "@type": "Organization",
      name: "Vynta",
      email: "contact@vynta.dev",
      telephone: "+34-682-37-38-24",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Valencia",
        addressRegion: "Valencia",
        addressCountry: "ES",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }}
      />
      <ContactClient />
    </>
  );
}
