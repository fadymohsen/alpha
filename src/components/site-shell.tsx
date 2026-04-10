"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { CookieConsent } from "@/components/cookie-consent";

export function SiteShell({ locale, children }: { locale: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.includes("/admin") || pathname.includes("/login");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Navbar locale={locale} />
      {children}
      <Footer locale={locale} />
      <WhatsAppFloat />
      <CookieConsent locale={locale} />
    </>
  );
}
