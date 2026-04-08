"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDictionary } from "@/i18n/dictionary-provider";
import { useState, useEffect } from "react";
import { Menu, X, Globe, Phone, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export function Navbar({ locale }: { locale: string }) {
  const dict = useDictionary();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const navLinks = [
    { name: dict.nav.home, href: "/" },
    { name: dict.nav.about, href: "/about" },
    { name: dict.nav.services, href: "/services" },
    { name: dict.nav.careers, href: "/careers" },
    { name: dict.nav.contact, href: "/contact" },
  ];

  const currentLocale = locale || "ar";
  const switchLocale = currentLocale === "ar" ? "en" : "ar";
  const switchHref = pathname ? pathname.replace(`/${currentLocale}`, `/${switchLocale}`) : `/${switchLocale}`;
  const isRtl = currentLocale === "ar";

  return (
    <>
      <nav className={cn("fixed top-0 w-full z-50 transition-all duration-700", scrolled ? "bg-white/95 backdrop-blur-md h-20 shadow-xl border-b border-primary/5" : "bg-transparent h-32")}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link href={`/${currentLocale}`} className="flex items-center gap-4 group">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative w-16 h-16 md:w-20 md:h-20 overflow-hidden"
            >
               <Image src="/logo-transperent.png" alt="ALFA" fill className="object-contain" />
            </motion.div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const href = `/${currentLocale}${link.href}`;
              const isActive = pathname === href || (pathname === `/${currentLocale}` && link.href === "/");
              return (
                <motion.div key={link.href} whileHover={{ y: -2 }}>
                  <Link href={href} className={cn("text-sm font-black uppercase tracking-widest transition-all hover:text-accent relative py-2", isActive ? "text-primary" : "text-gray-500")}>
                    {link.name}
                    {isActive && <motion.div layoutId="nav-glow" className="absolute -bottom-1 inset-x-0 h-1 bg-accent rounded-full shadow-[0_0_15px_rgba(193,146,44,0.5)]" />}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <Link href={switchHref} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-accent transition-all">
              <Globe size={16} />
              <span>{currentLocale === "ar" ? "English" : "عربي"}</span>
            </Link>
            <Link href="https://wa.me/966555955056" target="_blank" className="btn-primary flex items-center gap-2 !px-8 !py-4">
               <Phone size={16} />{currentLocale === "ar" ? "طلب عرض سعر" : "Get Quote"}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-2xl bg-primary text-white shadow-2xl transition-transform active:scale-95" onClick={() => setIsOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Premium Full-Screen Mobile Menu - Moved Outside Nav for better z-index and scroll behavior */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-[#141414]/95 backdrop-blur-2xl flex flex-col text-cream overflow-hidden"
          >
            {/* Ambient Background Accents */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Header */}
            <div className="flex shrink-0 h-28 px-8 items-center justify-end relative z-10">
               <button onClick={() => setIsOpen(false)} className="w-14 h-14 rounded-2xl bg-accent text-primary flex items-center justify-center hover:rotate-90 transition-transform duration-500 shadow-2xl active:scale-90">
                 <X size={32} />
               </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-grow flex flex-col justify-center px-10 relative z-10">
               <div className="space-y-4 max-w-lg">
                  {navLinks.map((link, i) => (
                    <motion.div 
                      key={link.href} 
                      className="overflow-hidden border-b border-white/5"
                    >
                       <Link 
                          href={`/${currentLocale}${link.href}`} 
                          onClick={() => setIsOpen(false)} 
                          className="group flex items-center justify-between py-6 transition-all"
                          style={{
                             animation: `slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards ${i * 60}ms`,
                             opacity: 0,
                             transform: 'translateY(20px)'
                          }}
                       >
                          <span className="text-3xl font-semibold uppercase tracking-tight group-hover:gradient-text transition-all duration-300">
                             {link.name}
                          </span>
                          <motion.div 
                             whileHover={{ x: isRtl ? -10 : 10 }}
                             className="text-white/20 group-hover:text-accent transition-colors"
                          >
                             {isRtl ? <ArrowLeft size={28} /> : <ArrowRight size={28} />}
                          </motion.div>
                       </Link>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-10 shrink-0 border-t border-white/5 relative z-10 flex flex-col gap-6">
               <Link href={switchHref} className="btn-secondary !bg-white/5 flex items-center justify-center gap-3 !py-5">
                 <Globe size={20} className="text-accent" />
                 <span>{currentLocale === "ar" ? "English" : "عربي"}</span>
               </Link>
               <Link 
                 href={`/${currentLocale}/contact`} 
                 onClick={() => setIsOpen(false)}
                 className="btn-primary text-center !py-5"
               >
                 {currentLocale === "ar" ? "ابدأ رحلتك معنا" : "Start Your Journey"}
               </Link>
            </div>

            <style jsx>{`
              @keyframes slideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

}
