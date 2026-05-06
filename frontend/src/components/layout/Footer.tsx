import Link from "next/link";
import { Diamond, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link as I18nLink } from "@/i18n/routing";

export function Footer() {
  const t = useTranslations("Footer");

  const footerLinks = {
    Services: [
      { label: t("digitalDesign"), href: "/services#design" },
      { label: t("desarrolloWeb"), href: "/services#engineering" },
      { label: t("automatizacionIA"), href: "/services#ai" },
      { label: t("identidadMarca"), href: "/services#branding" },
    ],
    Agency: [
      { label: t("sobreNosotros"), href: "/about" },
      { label: t("contacto"), href: "/contact" },
      { label: t("portalClientes"), href: "/login" },
    ],
    Legal: [
      { label: t("politicaPrivacidad"), href: "/privacy" },
    ],
  };

  return (
    <footer className="border-t border-white/[0.06] bg-[#090909]">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <I18nLink href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                <Diamond className="h-4 w-4 text-black fill-black" />
              </div>
              <span className="text-[17px] font-bold tracking-tight text-white">
                Nova<span className="text-white/40">Studio</span>
              </span>
            </I18nLink>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              {t("descripcion")}
            </p>
            <div className="space-y-3 text-sm text-white/40">
              <a href="mailto:hello@novastudio.co" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Mail className="h-4 w-4" /> juanjoyedra2017@gmail.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Phone className="h-4 w-4" /> +34 682 37 38 24
              </a>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4" /> Valencia, España
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
                {group}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <I18nLink
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </I18nLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Nova Studio. {t("derechosReservados")}
          </p>
          <div className="flex items-center gap-6">
            {["X / Twitter", "LinkedIn"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-white/30 hover:text-white transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}