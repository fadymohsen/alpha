"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Eye, EyeOff } from "lucide-react";

interface Service {
  id: string;
  title_ar: string;
  title_en: string;
  desc_ar: string;
  desc_en: string;
  visible: boolean;
}

const empty: Omit<Service, "id" | "visible"> = { title_ar: "", title_en: "", desc_ar: "", desc_en: "" };

export default function AdminServicesPage({ params: { locale } }: { params: { locale: string } }) {
  const isRtl = locale === "ar";
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; editing: Service | null }>({ open: false, editing: null });
  const [form, setForm] = useState(empty);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const visibleCount = services.filter((s) => s.visible).length;

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to fetch services:", e);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const openAdd = () => {
    setForm(empty);
    setModal({ open: true, editing: null });
  };

  const openEdit = (s: Service) => {
    setForm({ title_ar: s.title_ar, title_en: s.title_en, desc_ar: s.desc_ar, desc_en: s.desc_en });
    setModal({ open: true, editing: s });
  };

  const closeModal = () => setModal({ open: false, editing: null });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (modal.editing) {
      await fetch("/api/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: modal.editing.id, ...form }),
      });
    } else {
      await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setSaving(false);
    closeModal();
    fetchServices();
  };

  const handleToggleVisible = async (s: Service) => {
    if (!s.visible && visibleCount >= 4) {
      setError(
        isRtl
          ? "لا يمكن تفعيل أكثر من 4 خدمات في الصفحة الرئيسية. قم بإيقاف خدمة أخرى أولاً."
          : "You cannot enable more than 4 services on the homepage. Please disable another service first."
      );
      return;
    }
    setError(null);
    const updated = !s.visible;
    setServices((prev) => prev.map((x) => (x.id === s.id ? { ...x, visible: updated } : x)));
    await fetch("/api/services", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: s.id, visible: updated }),
    });
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/services", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setDeleteConfirm(null);
    fetchServices();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-primary">{isRtl ? "إدارة الخدمات" : "Services Management"}</h1>
          <p className="text-sm text-slate-500 mt-1">
            {isRtl ? `${visibleCount}/4 مفعّلة في الصفحة الرئيسية` : `${visibleCount}/4 enabled on homepage`}
          </p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors">
          <Plus size={18} />
          {isRtl ? "إضافة خدمة" : "Add Service"}
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
          <p className="text-sm font-bold text-red-600">{error}</p>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 transition-colors shrink-0">
            <X size={18} />
          </button>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-400 font-bold">{isRtl ? "لا توجد خدمات بعد" : "No services yet"}</p>
          <button onClick={openAdd} className="mt-4 text-primary font-bold text-sm hover:underline">
            {isRtl ? "أضف أول خدمة" : "Add your first service"}
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-start px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">
                    {isRtl ? "الحالة" : "Visible"}
                  </th>
                  <th className="text-start px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">
                    {isRtl ? "العنوان (عربي)" : "Title (AR)"}
                  </th>
                  <th className="text-start px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">
                    {isRtl ? "العنوان (إنجليزي)" : "Title (EN)"}
                  </th>
                  <th className="text-start px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">
                    {isRtl ? "الإجراءات" : "Actions"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id} className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${!s.visible ? "opacity-50" : ""}`}>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleVisible(s)}
                        className={`relative w-12 h-7 rounded-full transition-colors cursor-pointer ${s.visible ? "bg-green-500" : "bg-slate-300"}`}
                      >
                        <span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-all ${s.visible ? "start-5" : "start-0.5"}`} />
                      </button>
                    </td>
                    <td className="px-6 py-4 font-bold text-sm text-primary">{s.title_ar}</td>
                    <td className="px-6 py-4 font-medium text-sm text-slate-600">{s.title_en}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(s)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors">
                          <Pencil size={16} />
                        </button>
                        {deleteConfirm === s.id ? (
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleDelete(s.id)} className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">
                              {isRtl ? "تأكيد" : "Confirm"}
                            </button>
                            <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1 bg-slate-200 text-slate-600 text-xs font-bold rounded-lg">
                              {isRtl ? "إلغاء" : "Cancel"}
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirm(s.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
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
                {modal.editing
                  ? (isRtl ? "تعديل الخدمة" : "Edit Service")
                  : (isRtl ? "إضافة خدمة جديدة" : "Add New Service")}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                    {isRtl ? "العنوان (عربي)" : "Title (Arabic)"}
                  </label>
                  <input required dir="rtl" value={form.title_ar} onChange={(e) => setForm({ ...form, title_ar: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                    {isRtl ? "العنوان (إنجليزي)" : "Title (English)"}
                  </label>
                  <input required dir="ltr" value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">{isRtl ? "الوصف (عربي)" : "Description (Arabic)"}</label>
                <textarea required dir="rtl" rows={3} value={form.desc_ar} onChange={(e) => setForm({ ...form, desc_ar: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm resize-none" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">{isRtl ? "الوصف (إنجليزي)" : "Description (English)"}</label>
                <textarea required dir="ltr" rows={3} value={form.desc_en} onChange={(e) => setForm({ ...form, desc_en: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm resize-none" />
              </div>
              <button type="submit" disabled={saving} className="w-full bg-primary text-white py-4 rounded-xl font-black text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {saving && <Loader2 size={16} className="animate-spin" />}
                {modal.editing ? (isRtl ? "حفظ التعديلات" : "Save Changes") : (isRtl ? "إضافة الخدمة" : "Add Service")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
