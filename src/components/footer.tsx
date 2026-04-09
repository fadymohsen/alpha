"use client";
import { useDictionary } from "@/i18n/dictionary-provider";
import { Phone, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer({ locale }: { locale: string }) {
  const dict = useDictionary();
  const isRtl = locale === "ar";

  return (
    <footer className="bg-primary text-white pt-20 pb-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="space-y-6 lg:col-span-1">
            <Link href={`/${locale}`} className="inline-block group">
              <div className="relative w-20 h-20 transition-transform hover:scale-105">
                <Image src="/logo-transperent.png" alt="ALFA" fill className="object-contain brightness-0 invert" />
              </div>
            </Link>
            <p className="text-white/60 text-sm font-medium leading-relaxed max-w-xs">{dict.about.description}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white/40 mb-8">
              {isRtl ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-4">
              {[
                { href: `/${locale}/about`, label: dict.nav.about },
                { href: `/${locale}/services`, label: dict.nav.services },
                { href: `/${locale}/careers`, label: dict.nav.careers },
                { href: `/${locale}/faq`, label: dict.nav.faq },
                { href: `/${locale}/contact`, label: dict.nav.contact },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-white transition-colors font-medium text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white/40 mb-8">{dict.nav.contact}</h4>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary flex-shrink-0 mt-0.5" />
                <p className="text-white/70 text-sm font-medium leading-relaxed">{dict.contact.info.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-secondary flex-shrink-0" />
                <p className="text-white font-bold text-sm tracking-wide" dir="ltr">{dict.contact.info.phones}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-bold uppercase tracking-widest">{dict.footer.copyright}</p>
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-secondary">
            Powered by <a href="https://veliq.co" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">VELIQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
