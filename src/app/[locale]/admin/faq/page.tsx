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

  const fetchFaqs = async () => {
    setLoading(true);
    const res = await fetch("/api/faq");
    const data = await res.json();
    setFaqs(data);
    setLoading(false);
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-primary">{isRtl ? "إدارة الأسئلة الشائعة" : "FAQ Management"}</h1>
          <p className="text-sm text-slate-500 mt-1">{isRtl ? "إضافة وتعديل وحذف الأسئلة" : "Add, edit, and delete FAQ items"}</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors">
          <Plus size={18} />
          {isRtl ? "إضافة سؤال" : "Add FAQ"}
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-primary" /></div>
      ) : faqs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-400 font-bold">{isRtl ? "لا توجد أسئلة بعد" : "No FAQ items yet"}</p>
          <button onClick={openAdd} className="mt-4 text-primary font-bold text-sm hover:underline">
            {isRtl ? "أضف أول سؤال" : "Add your first FAQ"}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black text-slate-300">#{i + 1}</span>
                  <h4 className="font-bold text-sm text-primary truncate">{isRtl ? f.question_ar : f.question_en}</h4>
                </div>
                <p className="text-xs text-slate-400 truncate">{isRtl ? f.answer_ar : f.answer_en}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => openEdit(f)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"><Pencil size={16} /></button>
                {deleteConfirm === f.id ? (
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleDelete(f.id)} className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">{isRtl ? "تأكيد" : "Confirm"}</button>
                    <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1 bg-slate-200 text-slate-600 text-xs font-bold rounded-lg">{isRtl ? "إلغاء" : "Cancel"}</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirm(f.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 size={16} /></button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-lg font-black text-primary">
                {modal.editing ? (isRtl ? "تعديل السؤال" : "Edit FAQ") : (isRtl ? "إضافة سؤال جديد" : "Add New FAQ")}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">{isRtl ? "السؤال (عربي)" : "Question (Arabic)"}</label>
                  <input required dir="rtl" value={form.question_ar} onChange={(e) => setForm({ ...form, question_ar: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">{isRtl ? "السؤال (إنجليزي)" : "Question (English)"}</label>
                  <input required dir="ltr" value={form.question_en} onChange={(e) => setForm({ ...form, question_en: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">{isRtl ? "الإجابة (عربي)" : "Answer (Arabic)"}</label>
                <textarea required dir="rtl" rows={4} value={form.answer_ar} onChange={(e) => setForm({ ...form, answer_ar: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm resize-none" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">{isRtl ? "الإجابة (إنجليزي)" : "Answer (English)"}</label>
                <textarea required dir="ltr" rows={4} value={form.answer_en} onChange={(e) => setForm({ ...form, answer_en: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-primary/20 font-medium text-sm resize-none" />
              </div>
              <button type="submit" disabled={saving} className="w-full bg-primary text-white py-4 rounded-xl font-black text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
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
