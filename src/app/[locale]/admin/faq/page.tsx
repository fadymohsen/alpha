"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";

interface FaqItem {
  id: string;
  question_ar: string;
  question_en: string;
  answer_ar: string;
  answer_en: string;
  order: number;
  visible: boolean;
}

const empty = { question_ar: "", question_en: "", answer_ar: "", answer_en: "" };

export default function AdminFaqPage({ params: { locale } }: { params: { locale: string } }) {
  const isRtl = locale === "ar";
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; editing: FaqItem | null }>({ open: false, editing: null });
  const [form, setForm] = useState(empty);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const visibleCount = faqs.filter((f) => f.visible).length;

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/faq");
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setFaqs(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to fetch FAQs:", e);
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFaqs(); }, []);

  const openAdd = () => { setForm(empty); setModal({ open: true, editing: null }); };
  const openEdit = (f: FaqItem) => {
    setForm({ question_ar: f.question_ar, question_en: f.question_en, answer_ar: f.answer_ar, answer_en: f.answer_en });
    setModal({ open: true, editing: f });
  };
  const closeModal = () => setModal({ open: false, editing: null });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (modal.editing) {
      await fetch("/api/faq", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: modal.editing.id, ...form, order: modal.editing.order }),
      });
    } else {
      await fetch("/api/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setSaving(false);
    closeModal();
    fetchFaqs();
  };

  const handleToggleVisible = async (f: FaqItem) => {
    if (!f.visible && visibleCount >= 4) {
      setError(
        isRtl
          ? "لا يمكن تفعيل أكثر من 4 أسئلة في الصفحة الرئيسية. قم بإيقاف سؤال آخر أولاً."
          : "You cannot enable more than 4 FAQs on the homepage. Please disable another FAQ first."
      );
      return;
    }
    setError(null);
    const updated = !f.visible;
    setFaqs((prev) => prev.map((x) => (x.id === f.id ? { ...x, visible: updated } : x)));
    await fetch("/api/faq", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: f.id, visible: updated }),
    });
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/faq", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setDeleteConfirm(null);
    fetchFaqs();
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-primary">{isRtl ? "إدارة الأسئلة الشائعة" : "FAQ Management"}</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isRtl ? `${visibleCount}/4 مفعّلة في الصفحة الرئيسية` : `${visibleCount}/4 enabled on homepage`}
          </p>
        </div>
        <button onClick={openAdd} className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors w-full sm:w-auto">
          <Plus size={18} />
          {isRtl ? "إضافة سؤال" : "Add FAQ"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start justify-between gap-3">
          <p className="text-xs sm:text-sm font-bold text-red-600">{error}</p>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 shrink-0 mt-0.5"><X size={16} /></button>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-primary" /></div>
      ) : faqs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-400 font-bold">{isRtl ? "لا توجد أسئلة بعد" : "No FAQ items yet"}</p>
          <button onClick={openAdd} className="mt-4 text-primary font-bold text-sm hover:underline">{isRtl ? "أضف أول سؤال" : "Add your first FAQ"}</button>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.id} className={`bg-white rounded-xl border border-slate-200 p-4 sm:p-5 ${!f.visible ? "opacity-50" : ""}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-slate-300">#{i + 1}</span>
                    <h4 className="font-bold text-sm text-primary truncate">{isRtl ? f.question_ar : f.question_en}</h4>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{isRtl ? f.answer_ar : f.answer_en}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => openEdit(f)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-500"><Pencil size={15} /></button>
                  {deleteConfirm === f.id ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleDelete(f.id)} className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">{isRtl ? "تأكيد" : "Yes"}</button>
                      <button onClick={() => setDeleteConfirm(null)} className="px-2.5 py-1 bg-slate-200 text-slate-600 text-xs font-bold rounded-lg">{isRtl ? "إلغاء" : "No"}</button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirm(f.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={15} /></button>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-400">{isRtl ? "ظاهرة في الرئيسية" : "Show on homepage"}</span>
                <button
                  onClick={() => handleToggleVisible(f)}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${f.visible ? "bg-green-500" : "bg-slate-300"}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${f.visible ? "start-5" : "start-0.5"}`} />
                </button>
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
                {modal.editing ? (isRtl ? "تعديل السؤال" : "Edit FAQ") : (isRtl ? "إضافة سؤال جديد" : "Add New FAQ")}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-lg"><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">{isRtl ? "السؤال (عربي)" : "Question (Arabic)"}</label>
                  <input required dir="rtl" value={form.question_ar} onChange={(e) => setForm({ ...form, question_ar: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5">{isRtl ? "السؤال (إنجليزي)" : "Question (English)"}</label>
                  <input required dir="ltr" value={form.question_en} onChange={(e) => setForm({ ...form, question_en: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5">{isRtl ? "الإجابة (عربي)" : "Answer (Arabic)"}</label>
                <textarea required dir="rtl" rows={3} value={form.answer_ar} onChange={(e) => setForm({ ...form, answer_ar: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm resize-none" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5">{isRtl ? "الإجابة (إنجليزي)" : "Answer (English)"}</label>
                <textarea required dir="ltr" rows={3} value={form.answer_en} onChange={(e) => setForm({ ...form, answer_en: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm resize-none" />
              </div>
              <button type="submit" disabled={saving} className="w-full bg-primary text-white py-3.5 rounded-xl font-black text-sm hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2">
                {saving && <Loader2 size={16} className="animate-spin" />}
                {modal.editing ? (isRtl ? "حفظ التعديلات" : "Save Changes") : (isRtl ? "إضافة السؤال" : "Add FAQ")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
