import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn
      ? "Vynta | Digital Agency"
      : "Vynta | Agencia Digital de Diseño, Ingeniería e IA",
    description: isEn
      ? "We create high-level digital experiences, from stunning web apps to complex AI-powered automation systems."
      : "Creamos experiencias digitales de alto nivel, desde aplicaciones web impresionantes hasta sistemas complejos de automatización impulsados por IA.",
    keywords: isEn
      ? ["digital agency", "web design", "AI automation", "UI/UX", "web development"]
      : ["agencia digital", "diseño web", "automatización de IA", "UI/UX", "desarrollo web"],
    openGraph: {
      title: isEn ? "Vynta | Digital Agency" : "Vynta | Agencia Digital",
      description: isEn
        ? "We create high-level digital experiences for ambitious brands."
        : "Creamos experiencias digitales de alto nivel para marcas ambiciosas.",
      type: "website",
      locale: isEn ? "en_US" : "es_ES",
      siteName: "Vynta",
    },
    twitter: {
      card: "summary_large_image",
      title: isEn ? "Vynta | Digital Agency" : "Vynta | Agencia Digital",
      description: isEn
        ? "We build digital products that matter. Design, engineering, and AI."
        : "Agencia especializada en diseño, ingeniería e IA. Construimos productos digitales que importan.",
    },
    alternates: {
      canonical: isEn ? "https://vynta.dev/en" : "https://vynta.dev",
      languages: {
        es: "https://vynta.dev",
        en: "https://vynta.dev/en",
      },
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
    icons: {
      icon: "/favicon.ico"
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${plusJakarta.variable} antialiased dark`}

    >
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18143155550"
        strategy="afterInteractive"
      />
      <Script id="google-ads-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18143155550');
        `}
      </Script>
      <body className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <QueryProvider>
              <AuthProvider>
                <NotificationProvider token={token ?? ""}>
                  <TooltipProvider>
                    {children}
                    <Toaster richColors position="bottom-right" />
                    <Analytics />
                  </TooltipProvider>
                </NotificationProvider>
              </AuthProvider>
            </QueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
