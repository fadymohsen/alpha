"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Upload } from "lucide-react";

interface CertificateItem {
  id: string;
  title_ar: string;
  title_en: string;
  image: string;
  order: number;
  visible: boolean;
}

const empty = { title_ar: "", title_en: "", image: "" };

export default function AdminCertificatesPage({ params: { locale } }: { params: { locale: string } }) {
  const isRtl = locale === "ar";
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; editing: CertificateItem | null }>({ open: false, editing: null });
  const [form, setForm] = useState(empty);
  const [preview, setPreview] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/certificates");
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setCertificates(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to fetch certificates:", e);
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCertificates(); }, []);

  const openAdd = () => { setForm(empty); setPreview(null); setModal({ open: true, editing: null }); };
  const openEdit = (item: CertificateItem) => {
    setForm({ title_ar: item.title_ar, title_en: item.title_en, image: item.image });
    setPreview(item.image);
    setModal({ open: true, editing: item });
  };
  const closeModal = () => { setModal({ open: false, editing: null }); setPreview(null); };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setForm((prev) => ({ ...prev, image: dataUrl }));
      setPreview(dataUrl);
      setUploading(false);
    };
    reader.onerror = () => setUploading(false);
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image) return;
    setSaving(true);
    if (modal.editing) {
      await fetch("/api/certificates", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: modal.editing.id, ...form }) });
    } else {
      await fetch("/api/certificates", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    setSaving(false);
    closeModal();
    fetchCertificates();
  };

  const handleToggleVisible = async (item: CertificateItem) => {
    const updated = !item.visible;
    setCertificates((prev) => prev.map((x) => (x.id === item.id ? { ...x, visible: updated } : x)));
    await fetch("/api/certificates", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id, visible: updated }) });
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/certificates", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setDeleteConfirm(null);
    fetchCertificates();
  };

  const visibleCount = certificates.filter((c) => c.visible).length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-primary">{isRtl ? "إدارة الشهادات" : "Certificates Management"}</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isRtl ? `${visibleCount} شهادة مفعّلة` : `${visibleCount} certificates visible`}
          </p>
        </div>
        <button onClick={openAdd} className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors w-full sm:w-auto">
          <Plus size={18} />
          {isRtl ? "إضافة شهادة" : "Add Certificate"}
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-primary" /></div>
      ) : certificates.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-400 font-bold">{isRtl ? "لا توجد شهادات بعد" : "No certificates yet"}</p>
          <button onClick={openAdd} className="mt-4 text-primary font-bold text-sm hover:underline">{isRtl ? "أضف أول شهادة" : "Add your first certificate"}</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((item) => (
            <div key={item.id} className={`bg-white rounded-xl border border-slate-200 overflow-hidden ${!item.visible ? "opacity-50" : ""}`}>
              <div className="relative aspect-[3/4]">
                <img src={item.image} alt={item.title_en} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-3">
                <div className="min-w-0">
                  <p className="font-bold text-sm text-primary truncate">{item.title_ar}</p>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{item.title_en}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-500"><Pencil size={15} /></button>
                    {deleteConfirm === item.id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleDelete(item.id)} className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">{isRtl ? "تأكيد" : "Yes"}</button>
                        <button onClick={() => setDeleteConfirm(null)} className="px-2.5 py-1 bg-slate-200 text-slate-600 text-xs font-bold rounded-lg">{isRtl ? "إلغاء" : "No"}</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(item.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={15} /></button>
                    )}
                  </div>
                  <button
                    onClick={() => handleToggleVisible(item)}
                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${item.visible ? "bg-green-500" : "bg-slate-300"}`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${item.visible ? "start-5" : "start-0.5"}`} />
                  </button>
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
                {modal.editing ? (isRtl ? "تعديل الشهادة" : "Edit Certificate") : (isRtl ? "إضافة شهادة جديدة" : "Add New Certificate")}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-lg"><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="p-4 sm:p-6 space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5">{isRtl ? "صورة الشهادة" : "Certificate Image"}</label>
                {preview ? (
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 mb-2">
                    <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                    <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 hover:bg-black/50 transition-colors cursor-pointer group">
                      {uploading ? (
                        <Loader2 size={24} className="animate-spin text-white" />
                      ) : (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center">
                          <Upload size={24} className="text-white mb-2" />
                          <span className="text-sm font-bold text-white">{isRtl ? "تغيير الصورة" : "Change Image"}</span>
                        </div>
                      )}
                      <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                    </label>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center aspect-[3/4] rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-colors">
                    {uploading ? (
                      <Loader2 size={24} className="animate-spin text-primary" />
                    ) : (
                      <>
                        <Upload size={24} className="text-slate-400 mb-2" />
                        <span className="text-sm font-bold text-slate-400">{isRtl ? "اضغط لرفع صورة" : "Click to upload"}</span>
                      </>
                    )}
                    <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                  </label>
                )}
              </div>

              {/* Title fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5">{isRtl ? "العنوان (عربي)" : "Title (Arabic)"}</label>
                  <input required dir="rtl" value={form.title_ar} onChange={(e) => setForm({ ...form, title_ar: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5">{isRtl ? "العنوان (إنجليزي)" : "Title (English)"}</label>
                  <input required dir="ltr" value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm" />
                </div>
              </div>

              <button type="submit" disabled={saving || !form.image} className="w-full bg-primary text-white py-3.5 rounded-xl font-black text-sm hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2">
                {saving && <Loader2 size={16} className="animate-spin" />}
                {modal.editing ? (isRtl ? "حفظ التعديلات" : "Save Changes") : (isRtl ? "إضافة الشهادة" : "Add Certificate")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
