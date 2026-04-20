import Link from "next/link";
import { Diamond, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Digital Design", href: "/services#design" },
    { label: "Web Engineering", href: "/services#engineering" },
    { label: "AI Automation", href: "/services#ai" },
    { label: "Brand Identity", href: "/services#branding" },
  ],
  Agency: [
    { label: "About Us", href: "/about" },
    { label: "Our Work", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
    { label: "Client Portal", href: "/login" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#090909]">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                <Diamond className="h-4 w-4 text-black fill-black" />
              </div>
              <span className="text-[17px] font-bold tracking-tight text-white">
                Nova<span className="text-white/40">Studio</span>
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              A boutique creative agency helping ambitious companies build world-class digital products.
            </p>
            <div className="space-y-3 text-sm text-white/40">
              <a href="mailto:hello@novastudio.co" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Mail className="h-4 w-4" /> hello@novastudio.co
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Phone className="h-4 w-4" /> +1 (234) 567-890
              </a>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4" /> San Francisco, CA — Remote
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
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Nova Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["X / Twitter", "LinkedIn", "Dribbble", "GitHub"].map((social) => (
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

