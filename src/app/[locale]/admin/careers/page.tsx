"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Loader2, MapPin } from "lucide-react";

interface Career {
  id: string;
  title_ar: string;
  title_en: string;
  location_ar: string;
  location_en: string;
  req_ar: string;
  req_en: string;
  visible: boolean;
}

const empty = { title_ar: "", title_en: "", location_ar: "", location_en: "", req_ar: "", req_en: "" };

export default function AdminCareersPage({ params: { locale } }: { params: { locale: string } }) {
  const isRtl = locale === "ar";
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; editing: Career | null }>({ open: false, editing: null });
  const [form, setForm] = useState(empty);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const visibleCount = careers.filter((c) => c.visible).length;

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

  const openAdd = () => {
    setForm(empty);
    setModal({ open: true, editing: null });
  };

  const openEdit = (c: Career) => {
    setForm({ title_ar: c.title_ar, title_en: c.title_en, location_ar: c.location_ar, location_en: c.location_en, req_ar: c.req_ar, req_en: c.req_en });
    setModal({ open: true, editing: c });
  };

  const closeModal = () => setModal({ open: false, editing: null });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (modal.editing) {
      await fetch("/api/careers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: modal.editing.id, ...form }),
      });
    } else {
      await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setSaving(false);
    closeModal();
    fetchCareers();
  };

  const handleToggleVisible = async (c: Career) => {
    const updated = !c.visible;
    setCareers((prev) => prev.map((x) => (x.id === c.id ? { ...x, visible: updated } : x)));
    await fetch("/api/careers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: c.id, visible: updated }),
    });
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/careers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setDeleteConfirm(null);
    fetchCareers();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-primary">{isRtl ? "إدارة الوظائف" : "Careers Management"}</h1>
          <p className="text-sm text-slate-500 mt-1">
            {isRtl ? `${visibleCount} ظاهرة في الموقع (الحد الأقصى 4 في الرئيسية)` : `${visibleCount} visible on website (max 4 on homepage)`}
          </p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors">
          <Plus size={18} />
          {isRtl ? "إضافة وظيفة" : "Add Job"}
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      ) : careers.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-400 font-bold">{isRtl ? "لا توجد وظائف بعد" : "No jobs yet"}</p>
          <button onClick={openAdd} className="mt-4 text-primary font-bold text-sm hover:underline">
            {isRtl ? "أضف أول وظيفة" : "Add your first job"}
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-start px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">{isRtl ? "الحالة" : "Visible"}</th>
                  <th className="text-start px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">{isRtl ? "المسمى الوظيفي" : "Job Title"}</th>
                  <th className="text-start px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">{isRtl ? "الموقع" : "Location"}</th>
                  <th className="text-start px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">{isRtl ? "الإجراءات" : "Actions"}</th>
                </tr>
              </thead>
              <tbody>
                {careers.map((c) => (
                  <tr key={c.id} className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${!c.visible ? "opacity-50" : ""}`}>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleVisible(c)}
                        className={`relative w-12 h-7 rounded-full transition-colors cursor-pointer ${c.visible ? "bg-green-500" : "bg-slate-300"}`}
                      >
                        <span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-all ${c.visible ? "start-5" : "start-0.5"}`} />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-sm text-primary">{isRtl ? c.title_ar : c.title_en}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{isRtl ? c.title_en : c.title_ar}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-sm text-slate-600 font-medium">
                        <MapPin size={14} className="text-slate-400" />
                        {isRtl ? c.location_ar : c.location_en}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(c)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors">
                          <Pencil size={16} />
                        </button>
                        {deleteConfirm === c.id ? (
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleDelete(c.id)} className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">
                              {isRtl ? "تأكيد" : "Confirm"}
                            </button>
                            <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1 bg-slate-200 text-slate-600 text-xs font-bold rounded-lg">
                              {isRtl ? "إلغاء" : "Cancel"}
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirm(c.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-lg font-black text-primary">
                {modal.editing ? (isRtl ? "تعديل الوظيفة" : "Edit Job") : (isRtl ? "إضافة وظيفة جديدة" : "Add New Job")}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">{isRtl ? "المسمى (عربي)" : "Title (Arabic)"}</label>
                  <input required dir="rtl" value={form.title_ar} onChange={(e) => setForm({ ...form, title_ar: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">{isRtl ? "المسمى (إنجليزي)" : "Title (English)"}</label>
                  <input required dir="ltr" value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">{isRtl ? "الموقع (عربي)" : "Location (Arabic)"}</label>
                  <input required dir="rtl" value={form.location_ar} onChange={(e) => setForm({ ...form, location_ar: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">{isRtl ? "الموقع (إنجليزي)" : "Location (English)"}</label>
                  <input required dir="ltr" value={form.location_en} onChange={(e) => setForm({ ...form, location_en: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">{isRtl ? "المتطلبات (عربي)" : "Requirements (Arabic)"}</label>
                <textarea required dir="rtl" rows={3} value={form.req_ar} onChange={(e) => setForm({ ...form, req_ar: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm resize-none" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">{isRtl ? "المتطلبات (إنجليزي)" : "Requirements (English)"}</label>
                <textarea required dir="ltr" rows={3} value={form.req_en} onChange={(e) => setForm({ ...form, req_en: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm resize-none" />
              </div>
              <button type="submit" disabled={saving} className="w-full bg-primary text-white py-4 rounded-xl font-black text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
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
