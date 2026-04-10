"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Truck,
  Briefcase,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";

const navItems = [
  { key: "services", icon: Truck, label: { ar: "الخدمات", en: "Services" }, href: "/services" },
  { key: "careers", icon: Briefcase, label: { ar: "الوظائف", en: "Careers" }, href: "/careers" },
  { key: "faq", icon: HelpCircle, label: { ar: "الأسئلة الشائعة", en: "FAQ" }, href: "/faq" },
  { key: "settings", icon: Settings, label: { ar: "الإعدادات", en: "Settings" }, href: "/settings" },
];

export default function AdminLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const { locale } = params;
  const isRtl = locale === "ar";
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const basePath = `/${locale}/admin`;

  const handleLogout = () => {
    document.cookie = "is_admin=; path=/; max-age=0";
    router.push(`/${locale}`);
  };

  const isActive = (href: string) => {
    const full = basePath + href;
    return href === "" ? pathname === basePath : pathname.startsWith(full);
  };

  const sidebar = (
    <div className="flex flex-col h-full bg-[#0f1a2e] text-white">
      {/* Logo */}
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <div className="relative w-10 h-10 flex-shrink-0">
          <Image src="/logo-transperent.png" alt="ALFA" fill className="object-contain brightness-0 invert" />
        </div>
        <div>
          <p className="font-black text-sm tracking-wide">ALFA TRANS</p>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
            {isRtl ? "لوحة الإدارة" : "Admin Panel"}
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.key}
              href={basePath + item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                active
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={18} />
              {item.label[isRtl ? "ar" : "en"]}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-white/50 hover:text-white hover:bg-white/5 transition-all"
        >
          <ChevronLeft size={18} className={isRtl ? "rotate-180" : ""} />
          {isRtl ? "العودة للموقع" : "Back to Site"}
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all w-full"
        >
          <LogOut size={18} />
          {isRtl ? "تسجيل الخروج" : "Logout"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-x-hidden" dir={isRtl ? "rtl" : "ltr"}>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0 fixed inset-y-0 start-0 z-40">
        {sidebar}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute inset-y-0 start-0 w-64">{sidebar}</div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ms-64 overflow-x-hidden min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-600">
            <Menu size={24} />
          </button>
          <h2 className="text-lg font-black text-primary tracking-tight">
            {navItems.find((item) => isActive(item.href))?.label[isRtl ? "ar" : "en"] || (isRtl ? "لوحة التحكم" : "Dashboard")}
          </h2>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {isRtl ? "مشرف" : "Admin"}
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
