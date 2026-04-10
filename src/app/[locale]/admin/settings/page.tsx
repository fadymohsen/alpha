"use client";
import { useState, useEffect } from "react";
import { Loader2, Save, Phone, Mail, MessageCircle, Globe, FileText } from "lucide-react";

const settingFields = [
  { key: "phone", label: { ar: "رقم الهاتف", en: "Phone Number" }, icon: Phone, placeholder: "0114152675" },
  { key: "whatsapp", label: { ar: "رقم الواتساب", en: "WhatsApp Number" }, icon: MessageCircle, placeholder: "966555955056" },
  { key: "email", label: { ar: "البريد الإلكتروني", en: "Email Address" }, icon: Mail, placeholder: "alfa.ex@hotmail.com" },
  { key: "website", label: { ar: "الموقع الإلكتروني", en: "Website URL" }, icon: Globe, placeholder: "https://alpha-transportation.vercel.app" },
  { key: "profile_pdf", label: { ar: "رابط ملف التعريف PDF", en: "Company Profile PDF URL" }, icon: FileText, placeholder: "/profile.pdf" },
  { key: "address_ar", label: { ar: "العنوان (عربي)", en: "Address (Arabic)" }, icon: Globe, placeholder: "" },
  { key: "address_en", label: { ar: "العنوان (إنجليزي)", en: "Address (English)" }, icon: Globe, placeholder: "" },
];

export default function AdminSettingsPage({ params: { locale } }: { params: { locale: string } }) {
  const isRtl = locale === "ar";
  const [data, setData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((items: { key: string; value: string }[]) => {
        const map: Record<string, string> = {};
        items.forEach((item) => { map[item.key] = item.value; });
        setData(map);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const items = Object.entries(data).map(([key, value]) => ({ key, value }));
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-primary">{isRtl ? "الإعدادات العامة" : "General Settings"}</h1>
          <p className="text-sm text-slate-500 mt-1">{isRtl ? "معلومات الاتصال والروابط" : "Contact info and links"}</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saved ? (isRtl ? "تم الحفظ!" : "Saved!") : (isRtl ? "حفظ الإعدادات" : "Save Settings")}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
        {settingFields.map((field) => (
          <div key={field.key} className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3 sm:w-56 flex-shrink-0">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                <field.icon size={18} />
              </div>
              <span className="text-sm font-bold text-primary">{field.label[isRtl ? "ar" : "en"]}</span>
            </div>
            <input
              dir="ltr"
              value={data[field.key] || ""}
              onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
              placeholder={field.placeholder}
              className="flex-1 px-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
