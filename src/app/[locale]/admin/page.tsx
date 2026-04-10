"use client";
import Link from "next/link";
import { Truck, Briefcase, Home, Info, HelpCircle, Settings } from "lucide-react";

const modules = [
  { icon: Truck, label: { ar: "إدارة الخدمات", en: "Services" }, desc: { ar: "إضافة وتعديل وحذف الخدمات", en: "Add, edit, and delete services" }, href: "/services", color: "bg-blue-500" },
  { icon: Briefcase, label: { ar: "إدارة الوظائف", en: "Careers" }, desc: { ar: "إدارة فرص العمل المتاحة", en: "Manage job openings" }, href: "/careers", color: "bg-emerald-500" },
  { icon: Home, label: { ar: "الصفحة الرئيسية", en: "Homepage" }, desc: { ar: "تعديل محتوى الصفحة الرئيسية", en: "Edit homepage content" }, href: "/homepage", color: "bg-violet-500" },
  { icon: Info, label: { ar: "من نحن", en: "About" }, desc: { ar: "تعديل صفحة من نحن", en: "Edit about page" }, href: "/about", color: "bg-amber-500" },
  { icon: HelpCircle, label: { ar: "الأسئلة الشائعة", en: "FAQ" }, desc: { ar: "إدارة الأسئلة والأجوبة", en: "Manage Q&A items" }, href: "/faq", color: "bg-rose-500" },
  { icon: Settings, label: { ar: "الإعدادات", en: "Settings" }, desc: { ar: "الهاتف، البريد، الروابط", en: "Phone, email, links" }, href: "/settings", color: "bg-slate-500" },
];

export default function AdminDashboard({ params: { locale } }: { params: { locale: string } }) {
  const isRtl = locale === "ar";
  const basePath = `/${locale}/admin`;

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-primary rounded-3xl p-8 text-white">
        <h1 className="text-3xl font-black tracking-tight">
          {isRtl ? "مرحباً بك في لوحة التحكم" : "Welcome to the Dashboard"}
        </h1>
        <p className="text-white/60 mt-2 font-medium">
          {isRtl ? "إدارة محتوى موقع شركة ألفا للنقل المحدودة" : "Manage ALFA TRANS website content"}
        </p>
      </div>

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {modules.map((mod) => (
          <Link
            key={mod.href}
            href={basePath + mod.href}
            className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-primary/20 hover:shadow-lg transition-all group"
          >
            <div className={`w-12 h-12 ${mod.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <mod.icon size={22} className="text-white" />
            </div>
            <h3 className="text-lg font-black text-primary">{mod.label[isRtl ? "ar" : "en"]}</h3>
            <p className="text-sm text-slate-500 mt-1 font-medium">{mod.desc[isRtl ? "ar" : "en"]}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
