"use client";
import { useDictionary } from "@/i18n/dictionary-provider";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const dict = useDictionary();
  return (
    <footer className="bg-[#fafafa] text-primary pt-32 pb-16 relative overflow-hidden border-t border-primary/5">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          <div className="space-y-10">
            <Link href="/" className="flex items-center gap-4 group">
               <div className="relative w-24 h-24 transition-transform hover:scale-105">
                  <Image src="/logo-transperent.png" alt="ALFA" fill className="object-contain" />
               </div>
            </Link>
            <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-sm">{dict.footer.slogan}</p>
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all cursor-pointer">
                 <Mail size={18} className="text-primary group-hover:text-white" />
               </div>
               <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-all cursor-pointer">
                 <Phone size={18} className="text-accent group-hover:text-white" />
               </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-10">{dict.nav.services}</h4>
            <ul className="space-y-6">
               {dict.services.list.map((s: any) => (
                 <li key={s.id}>
                    <Link href="/services" className="text-gray-600 hover:text-accent transition-all font-bold text-sm tracking-tight flex items-center gap-2 group">
                       <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:w-4 transition-all" />
                       {s.title}
                    </Link>
                 </li>
               ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-10">
              {dict.nav.home === "الرئيسية" ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-6 font-bold text-sm">
              <li><Link href="/about" className="text-gray-600 hover:text-accent transition-all">{dict.nav.about}</Link></li>
              <li><Link href="/faq" className="text-gray-600 hover:text-accent transition-all">{dict.nav.faq}</Link></li>
              <li><Link href="/careers" className="text-gray-600 hover:text-accent transition-all">{dict.nav.careers}</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-accent transition-all">{dict.nav.contact}</Link></li>
            </ul>
          </div>

          <div className="space-y-10">
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-10">{dict.nav.contact}</h4>
            <div className="space-y-8">
               <div className="flex items-start gap-4">
                  <MapPin size={24} className="text-accent flex-shrink-0" />
                  <p className="text-gray-600 text-sm font-medium leading-relaxed">{dict.contact.info.address}</p>
               </div>
               <div className="flex items-center gap-4">
                  <Phone size={24} className="text-accent flex-shrink-0" />
                  <p className="text-primary font-black tracking-widest text-lg" dir="ltr">{dict.contact.info.phones.split("|")[0]}</p>
               </div>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-primary/5 flex flex-col md:flex-row items-center justify-between gap-8">
           <p className="text-gray-400 text-xs font-black uppercase tracking-widest">{dict.footer.copyright}</p>
           <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-primary opacity-60">
              <span>Powered by <a href="https://veliq.co" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity underline">VELIQ</a></span>
           </div>
        </div>
      </div>
    </footer>
  );
}
