"use client";
import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";

const fields = [
  { key: "about.title", label: { ar: "عنوان الصفحة", en: "Page Title" } },
  { key: "about.description", label: { ar: "وصف الشركة", en: "Company Description" }, textarea: true },
  { key: "about.goals.title", label: { ar: "عنوان الأهداف", en: "Goals Title" } },
  { key: "about.goals.desc1", label: { ar: "الهدف ١", en: "Goal 1" } },
  { key: "about.goals.desc2", label: { ar: "الهدف ٢", en: "Goal 2" } },
  { key: "about.goals.desc3", label: { ar: "الهدف ٣", en: "Goal 3" } },
];

export default function AdminAboutPage({ params: { locale } }: { params: { locale: string } }) {
  const isRtl = locale === "ar";
  const [data, setData] = useState<Record<string, { value_ar: string; value_en: string }>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content?prefix=about.")
      .then((r) => {
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then((items: { key: string; value_ar: string; value_en: string }[]) => {
        const map: Record<string, { value_ar: string; value_en: string }> = {};
        if (Array.isArray(items)) items.forEach((item) => { map[item.key] = { value_ar: item.value_ar, value_en: item.value_en }; });
        setData(map);
      })
      .catch((e) => console.error("Failed to fetch about content:", e))
      .finally(() => setLoading(false));
  }, []);

  const getValue = (key: string, lang: "ar" | "en") => data[key]?.[`value_${lang}`] || "";
  const setValue = (key: string, lang: "ar" | "en", value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: { ...prev[key], [`value_${lang}`]: value, [`value_${lang === "ar" ? "en" : "ar"}`]: prev[key]?.[`value_${lang === "ar" ? "en" : "ar"}`] || "" },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const items = Object.entries(data).map(([key, val]) => ({ key, value_ar: val.value_ar, value_en: val.value_en }));
    await fetch("/api/content", {
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
          <h1 className="text-2xl font-black text-primary">{isRtl ? "محتوى صفحة من نحن" : "About Page Content"}</h1>
          <p className="text-sm text-slate-500 mt-1">{isRtl ? "تعديل نصوص صفحة من نحن" : "Edit about page text content"}</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saved ? (isRtl ? "تم الحفظ!" : "Saved!") : (isRtl ? "حفظ التعديلات" : "Save Changes")}
        </button>
      </div>

      <div className="space-y-6">
        {fields.map((field) => (
          <div key={field.key} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-sm font-black text-primary">{field.label[isRtl ? "ar" : "en"]}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">{isRtl ? "عربي" : "Arabic"}</label>
                {(field as any).textarea ? (
                  <textarea dir="rtl" rows={3} value={getValue(field.key, "ar")} onChange={(e) => setValue(field.key, "ar", e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm resize-none" />
                ) : (
                  <input dir="rtl" value={getValue(field.key, "ar")} onChange={(e) => setValue(field.key, "ar", e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm" />
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">{isRtl ? "إنجليزي" : "English"}</label>
                {(field as any).textarea ? (
                  <textarea dir="ltr" rows={3} value={getValue(field.key, "en")} onChange={(e) => setValue(field.key, "en", e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm resize-none" />
                ) : (
                  <input dir="ltr" value={getValue(field.key, "en")} onChange={(e) => setValue(field.key, "en", e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
