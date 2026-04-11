"use client";
import { useState } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";

interface ContactFormProps {
  dict: {
    name: string;
    name_placeholder: string;
    email: string;
    email_placeholder: string;
    message: string;
    message_placeholder: string;
    submit: string;
  };
  isRtl: boolean;
}

export function ContactForm({ dict, isRtl }: ContactFormProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "contact" }),
      });

      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-primary/5 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-primary/50 px-2">{dict.name}</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-4 ring-primary/5 transition-all text-sm font-medium"
            placeholder={dict.name_placeholder}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-primary/50 px-2">{dict.email}</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-4 ring-primary/5 transition-all text-sm font-medium text-start"
            placeholder={dict.email_placeholder}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-primary/50 px-2">{dict.message}</label>
        <textarea
          rows={5}
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-4 ring-primary/5 transition-all text-sm font-medium resize-none"
          placeholder={dict.message_placeholder}
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className="w-full group relative overflow-hidden bg-primary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl flex items-center justify-center gap-4 disabled:opacity-70"
      >
        <div className="absolute inset-0 bg-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
        <span className="relative z-10 flex items-center gap-3">
          {status === "sending" ? (
            <><Loader2 size={18} className="animate-spin" /> {isRtl ? "جاري الإرسال..." : "Sending..."}</>
          ) : status === "sent" ? (
            <><CheckCircle size={18} /> {isRtl ? "تم الإرسال بنجاح!" : "Sent successfully!"}</>
          ) : status === "error" ? (
            <>{isRtl ? "حدث خطأ، حاول مرة أخرى" : "Error, please try again"}</>
          ) : (
            <><Send size={18} className={isRtl ? "rotate-180" : ""} /> {dict.submit}</>
          )}
        </span>
      </button>
    </form>
  );
}
