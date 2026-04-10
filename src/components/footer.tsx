"use client";
import { useDictionary } from "@/i18n/dictionary-provider";
import { useSettings } from "@/lib/settings-context";
import { Phone, MapPin, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer({ locale }: { locale: string }) {
  const dict = useDictionary();
  const settings = useSettings();
  const isRtl = locale === "ar";

  return (
    <footer className="bg-dark text-white pt-20 pb-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href={`/${locale}`} className="inline-block group">
              <div className="relative w-28 h-28 transition-transform hover:scale-105">
                <Image src="/logo-transperent.png" alt="ALFA" fill className="object-contain brightness-0 invert" />
              </div>
            </Link>
            <p className="text-white/60 text-sm font-medium leading-relaxed max-w-xs">{dict.about.description}</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start lg:items-center">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.4em] text-[#C1922C] mb-8">
                {isRtl ? "روابط سريعة" : "Quick Links"}
              </h4>
              <ul className="space-y-4">
                {[
                  { href: `/${locale}/about`, label: dict.nav.about },
                  { href: `/${locale}/services`, label: dict.nav.services },
                  { href: `/${locale}/careers`, label: dict.nav.careers },
                  { href: `/${locale}/contact`, label: dict.nav.contact },
                  { href: `/${locale}/faq`, label: dict.nav.faq },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/60 hover:text-white transition-colors font-medium text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col items-start lg:items-center">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.4em] text-[#C1922C] mb-8">
                {isRtl ? "قانوني" : "Legal"}
              </h4>
              <ul className="space-y-4">
                {[
                  { href: `/${locale}/privacy`, label: isRtl ? "سياسة الخصوصية" : "Privacy Policy" },
                  { href: `/${locale}/terms`, label: isRtl ? "الشروط والأحكام" : "Terms & Conditions" },
                  { href: `/${locale}/refund`, label: isRtl ? "سياسة الاسترجاع" : "Refund Policy" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/60 hover:text-white transition-colors font-medium text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-[#C1922C] mb-8">{dict.nav.contact}</h4>
            <div className="space-y-5">
              <a href={`tel:${settings.phone}`} className="flex items-center gap-3 group">
                <Phone size={18} className="text-[#C1922C] flex-shrink-0" />
                <span className="text-white/60 group-hover:text-white transition-colors font-medium text-sm" dir="ltr">{settings.phone}</span>
              </a>
              <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                <MessageCircle size={18} className="text-[#C1922C] flex-shrink-0" />
                <span className="text-white/60 group-hover:text-white transition-colors font-medium text-sm" dir="ltr">{settings.whatsapp}</span>
              </a>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-3 group">
                <Mail size={18} className="text-[#C1922C] flex-shrink-0" />
                <span className="text-white/60 group-hover:text-white transition-colors font-medium text-sm">{settings.email}</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#C1922C] flex-shrink-0 mt-0.5" />
                <p className="text-white/60 text-sm font-medium leading-relaxed">{isRtl ? settings.address_ar : settings.address_en}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{dict.footer.copyright}</p>
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">
            Powered by <a href="https://veliq.co" target="_blank" rel="noopener noreferrer" className="text-[#C1922C] hover:text-white transition-colors underline">VELIQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
