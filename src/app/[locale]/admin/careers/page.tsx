"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Loader2, MapPin, Clock } from "lucide-react";

interface Career {
  id: string;
  title_ar: string;
  title_en: string;
  location_ar: string;
  location_en: string;
  type: string;
  req_ar: string;
  req_en: string;
}

const empty = { title_ar: "", title_en: "", location_ar: "", location_en: "", type: "full_time", req_ar: "", req_en: "" };

const typeLabel = (type: string, isRtl: boolean) =>
  type === "part_time" ? (isRtl ? "دوام جزئي" : "Part Time") : (isRtl ? "دوام كامل" : "Full Time");

export default function AdminCareersPage({ params: { locale } }: { params: { locale: string } }) {
  const isRtl = locale === "ar";
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; editing: Career | null }>({ open: false, editing: null });
  const [form, setForm] = useState(empty);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/careers");
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setCareers(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to fetch careers:", e);
      setCareers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCareers(); }, []);

  const openAdd = () => { setForm(empty); setModal({ open: true, editing: null }); };
  const openEdit = (c: Career) => {
    setForm({ title_ar: c.title_ar, title_en: c.title_en, location_ar: c.location_ar, location_en: c.location_en, type: c.type, req_ar: c.req_ar, req_en: c.req_en });
    setModal({ open: true, editing: c });
  };
  const closeModal = () => setModal({ open: false, editing: null });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (modal.editing) {
      await fetch("/api/careers", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: modal.editing.id, ...form }) });
    } else {
      await fetch("/api/careers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    setSaving(false);
    closeModal();
    fetchCareers();
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/careers", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setDeleteConfirm(null);
    fetchCareers();
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-primary">{isRtl ? "إدارة الوظائف" : "Careers Management"}</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">{isRtl ? "إدارة فرص العمل المتاحة" : "Manage job openings"}</p>
        </div>
        <button onClick={openAdd} className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors w-full sm:w-auto">
          <Plus size={18} />
          {isRtl ? "إضافة وظيفة" : "Add Job"}
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-primary" /></div>
      ) : careers.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-400 font-bold">{isRtl ? "لا توجد وظائف بعد" : "No jobs yet"}</p>
          <button onClick={openAdd} className="mt-4 text-primary font-bold text-sm hover:underline">{isRtl ? "أضف أول وظيفة" : "Add your first job"}</button>
        </div>
      ) : (
        <div className="space-y-3">
          {careers.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-sm text-primary">{isRtl ? c.title_ar : c.title_en}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{isRtl ? c.title_en : c.title_ar}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs text-slate-500"><MapPin size={12} /> {isRtl ? c.location_ar : c.location_en}</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${c.type === "full_time" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"}`}>
                      <Clock size={10} /> {typeLabel(c.type, isRtl)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => openEdit(c)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-500"><Pencil size={15} /></button>
                  {deleteConfirm === c.id ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleDelete(c.id)} className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">{isRtl ? "تأكيد" : "Yes"}</button>
                      <button onClick={() => setDeleteConfirm(null)} className="px-2.5 py-1 bg-slate-200 text-slate-600 text-xs font-bold rounded-lg">{isRtl ? "إلغاء" : "No"}</button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirm(c.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={15} /></button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100">
              <h3 className="text-base sm:text-lg font-black text-primary">
                {modal.editing ? (isRtl ? "تعديل الوظيفة" : "Edit Job") : (isRtl ? "إضافة وظيفة جديدة" : "Add New Job")}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-lg"><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5">{isRtl ? "المسمى (عربي)" : "Title (Arabic)"}</label>
                  <input required dir="rtl" value={form.title_ar} onChange={(e) => setForm({ ...form, title_ar: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5">{isRtl ? "المسمى (إنجليزي)" : "Title (English)"}</label>
                  <input required dir="ltr" value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5">{isRtl ? "الموقع (عربي)" : "Location (Arabic)"}</label>
                  <input required dir="rtl" value={form.location_ar} onChange={(e) => setForm({ ...form, location_ar: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5">{isRtl ? "الموقع (إنجليزي)" : "Location (English)"}</label>
                  <input required dir="ltr" value={form.location_en} onChange={(e) => setForm({ ...form, location_en: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5">{isRtl ? "نوع الدوام" : "Job Type"}</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm">
                  <option value="full_time">{isRtl ? "دوام كامل" : "Full Time"}</option>
                  <option value="part_time">{isRtl ? "دوام جزئي" : "Part Time"}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5">{isRtl ? "المتطلبات (عربي)" : "Requirements (Arabic)"}</label>
                <textarea required dir="rtl" rows={3} value={form.req_ar} onChange={(e) => setForm({ ...form, req_ar: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm resize-none" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5">{isRtl ? "المتطلبات (إنجليزي)" : "Requirements (English)"}</label>
                <textarea required dir="ltr" rows={3} value={form.req_en} onChange={(e) => setForm({ ...form, req_en: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm resize-none" />
              </div>
              <button type="submit" disabled={saving} className="w-full bg-primary text-white py-3.5 rounded-xl font-black text-sm hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2">
                {saving && <Loader2 size={16} className="animate-spin" />}
                {modal.editing ? (isRtl ? "حفظ التعديلات" : "Save Changes") : (isRtl ? "إضافة الوظيفة" : "Add Job")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
