"use client";
import { useDictionary } from "@/i18n/dictionary-provider";
import { Phone, MapPin, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer({ locale }: { locale: string }) {
  const dict = useDictionary();
  const isRtl = locale === "ar";

  return (
    <footer className="bg-white text-primary pt-20 pb-10 relative overflow-hidden border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 pb-16 border-b border-primary/10">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href={`/${locale}`} className="inline-block group">
              <div className="relative w-28 h-28 transition-transform hover:scale-105">
                <Image src="/logo-transperent.png" alt="ALFA" fill className="object-contain" />
              </div>
            </Link>
            <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-xs">{dict.about.description}</p>
          </div>

          {/* Quick Links - Centered */}
          <div className="flex flex-col items-center">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.4em] text-secondary mb-8">
                {isRtl ? "روابط سريعة" : "Quick Links"}
              </h4>
              <ul className="space-y-4">
                {[
                  { href: `/${locale}/about`, label: dict.nav.about },
                  { href: `/${locale}/services`, label: dict.nav.services },
                  { href: `/${locale}/careers`, label: dict.nav.careers },
                  { href: `/${locale}/contact`, label: dict.nav.contact },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-500 hover:text-primary transition-colors font-medium text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-secondary mb-8">{dict.nav.contact}</h4>
            <div className="space-y-5">
              <a href="tel:0114152675" className="flex items-center gap-3 group">
                <Phone size={18} className="text-secondary flex-shrink-0" />
                <span className="text-gray-500 group-hover:text-primary transition-colors font-medium text-sm" dir="ltr">0114152675</span>
              </a>
              <a href="https://wa.me/966555955056" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                <MessageCircle size={18} className="text-secondary flex-shrink-0" />
                <span className="text-gray-500 group-hover:text-primary transition-colors font-medium text-sm" dir="ltr">0555955056</span>
              </a>
              <a href="mailto:alfa.ex@hotmail.com" className="flex items-center gap-3 group">
                <Mail size={18} className="text-secondary flex-shrink-0" />
                <span className="text-gray-500 group-hover:text-primary transition-colors font-medium text-sm">alfa.ex@hotmail.com</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary flex-shrink-0 mt-0.5" />
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{dict.contact.info.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{dict.footer.copyright}</p>
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-secondary">
            Powered by <a href="https://veliq.co" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline">VELIQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
