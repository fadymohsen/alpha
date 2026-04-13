"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDictionary } from "@/i18n/dictionary-provider";
import { useSettings } from "@/lib/settings-context";
import { useState, useEffect } from "react";
import { Menu, X, Globe, Phone, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export function Navbar({ locale }: { locale: string }) {
  const dict = useDictionary();
  const { whatsapp, careers_visible } = useSettings();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    ...(careers_visible ? [{ name: dict.nav.careers, href: "/careers" }] : []),
    { name: dict.nav.contact, href: "/contact" },
    { name: dict.nav.faq, href: "/faq" },
  ];

  const currentLocale = locale || "ar";
  const switchLocale = currentLocale === "ar" ? "en" : "ar";
  const switchHref = pathname ? pathname.replace(`/${currentLocale}`, `/${switchLocale}`) : `/${switchLocale}`;
  const isRtl = currentLocale === "ar";
  const isHome = pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`;
  const isTransparent = isHome && !scrolled;

  return (
    <>
      <nav className="fixed top-0 w-full z-50 px-4 pt-4 transition-all duration-500">
        <div className={cn(
          "max-w-7xl mx-auto px-6 h-16 flex items-center justify-between rounded-full transition-all duration-500",
          isTransparent
            ? "bg-white/15 backdrop-blur-md border border-white/20"
            : "bg-white shadow-xl border border-gray-100"
        )}>
          {/* Logo */}
          <Link href={`/${currentLocale}`} className="flex items-center gap-3 shrink-0">
            <div className="relative w-16 h-16">
              <Image src="/logo-transperent.png" alt="ALFA" fill className={cn("object-contain transition-all duration-500", isTransparent ? "brightness-0 invert" : "")} />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const href = `/${currentLocale}${link.href}`;
              const isActive = pathname === href || (pathname === `/${currentLocale}` && link.href === "/");
              return (
                <Link
                  key={link.href}
                  href={href}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300",
                    isTransparent
                      ? isActive
                        ? "bg-white/20 text-white backdrop-blur-sm"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                      : isActive
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={switchHref}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-bold transition-all",
                isTransparent
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
              )}
            >
              <Globe size={16} />
              <span>{currentLocale === "ar" ? "English" : "عربي"}</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={cn(
              "lg:hidden w-10 h-10 flex items-center justify-center rounded-full active:scale-95 transition-all",
              isTransparent ? "bg-white/20 text-white" : "bg-primary text-white"
            )}
            onClick={() => setIsOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex shrink-0 h-20 px-6 items-center justify-between border-b border-gray-100">
              <Link href={`/${currentLocale}`} onClick={() => setIsOpen(false)} className="relative w-14 h-14">
                <Image src="/logo-transperent.png" alt="ALFA" fill className="object-contain" />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="w-11 h-11 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors active:scale-90"
              >
                <X size={22} />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-grow flex flex-col px-6 pt-6 overflow-y-auto">
              <div className="space-y-1">
                {navLinks.map((link, i) => {
                  const href = `/${currentLocale}${link.href}`;
                  const isActive = pathname === href || (pathname === `/${currentLocale}` && link.href === "/");
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center justify-between py-4 px-4 rounded-2xl transition-all",
                          isActive
                            ? "bg-primary text-white"
                            : "text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        <span className="text-base font-bold">{link.name}</span>
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          isActive ? "bg-white/20" : "bg-gray-100"
                        )}>
                          {isRtl
                            ? <ArrowLeft size={16} className={isActive ? "text-white" : "text-gray-400"} />
                            : <ArrowRight size={16} className={isActive ? "text-white" : "text-gray-400"} />
                          }
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="px-6 pb-8 pt-4 shrink-0 flex flex-col gap-3 border-t border-gray-100">
              <Link
                href={switchHref}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-3 py-4 rounded-2xl border border-gray-200 text-gray-700 text-sm font-bold hover:border-primary transition-colors"
              >
                <Globe size={18} className="text-primary" />
                <span>{currentLocale === "ar" ? "English" : "عربي"}</span>
              </Link>
              <Link
                href={`/${currentLocale}/contact`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-primary text-white text-sm font-bold shadow-lg"
              >
                <Phone size={18} />
                {currentLocale === "ar" ? "تواصل معنا" : "Contact Us"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
