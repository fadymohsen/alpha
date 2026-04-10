"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight, Heart, Star, Sparkles, X, User, Phone, Mail, FileText, Send } from "lucide-react";
import { useSettings } from "@/lib/settings-context";

interface Job {
  title: string;
  type: string;
  location: string;
  requirements: string;
}

interface CareersContentProps {
  locale: string;
  jobs: Job[];
}

export default function CareersContent({ locale, jobs }: CareersContentProps) {
  const isRtl = locale === "ar";
  const { whatsapp } = useSettings();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", about: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    const message = isRtl
      ? `📋 *طلب توظيف - ${selectedJob.title}*
👤 الاسم: ${form.name}
📱 الجوال: ${form.phone}
📧 البريد: ${form.email}
📍 الموقع: ${selectedJob.location}
💼 نبذة: ${form.about}`
      : `📋 *Job Application - ${selectedJob.title}*
👤 Name: ${form.name}
📱 Phone: ${form.phone}
📧 Email: ${form.email}
📍 Location: ${selectedJob.location}
💼 About: ${form.about}`;

    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setSelectedJob(null);
    setForm({ name: "", phone: "", email: "", about: "" });
  };

  const closeModal = () => {
    setSelectedJob(null);
    setForm({ name: "", phone: "", email: "", about: "" });
  };

  return (
    <main className="flex-grow pt-32 pb-16">
      {/* Hero */}
      <section className="bg-primary py-24 text-center relative overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 top-0 opacity-10 pointer-events-none">
          <Briefcase size={500} className="absolute -left-20 -bottom-20 -rotate-12" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
            {isRtl ? "انضم لفريقنا" : "Join Our Team"}
          </h1>
          <p className="text-xl text-white/80 font-medium max-w-2xl mx-auto">
            {isRtl ? "ابنِ مستقبلك المهني مع رائد حلول النقل في المملكة" : "Build your career with the leader of transport solutions in the Kingdom"}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Why work */}
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-5xl font-black text-primary leading-tight">
                  {isRtl ? "لماذا تعمل في ألفا؟" : "Why Work at ALFA?"}
                </h2>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  {isRtl
                    ? "نحن نوفر بيئة عمل محفزة، تقدر الإبداع والالتزام، ونسعى دائماً لتطوير مهارات فريقنا لمواكبة التطورات العالمية."
                    : "We provide a stimulating work environment that values creativity and commitment, and we always strive to develop our team's skills to keep pace with global developments."}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Heart className="text-secondary" />
                  <h4 className="font-bold text-primary">{isRtl ? "تأمين طبي شامل" : "Comprehensive Medical"}</h4>
                </div>
                <div className="space-y-4">
                  <Star className="text-accent" />
                  <h4 className="font-bold text-primary">{isRtl ? "رواتب تنافسية" : "Competitive Salary"}</h4>
                </div>
                <div className="space-y-4">
                  <Sparkles className="text-primary" />
                  <h4 className="font-bold text-primary">{isRtl ? "بيئة تطوير" : "Development Env"}</h4>
                </div>
                <div className="space-y-4">
                  <Briefcase className="text-slate-400" />
                  <h4 className="font-bold text-primary">{isRtl ? "استقرار وظيفي" : "Job Stability"}</h4>
                </div>
              </div>
            </div>

            {/* Jobs list */}
            <div className="p-12 bg-slate-50 rounded-[4rem] border border-primary/5 space-y-8">
              <h3 className="text-3xl font-black text-primary">{isRtl ? "الفرص المتاحة" : "Open Positions"}</h3>
              <div className="space-y-4">
                {jobs.map((job, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedJob(job)}
                    className="p-8 bg-white rounded-3xl shadow-sm border border-primary/5 group hover:border-accent transition-all cursor-pointer space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="text-xl font-black text-primary group-hover:text-accent transition-colors">{job.title}</h4>
                        <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                          <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                          <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white group-hover:rotate-45 transition-all shrink-0">
                        <ArrowRight size={20} className={isRtl ? "rotate-180" : ""} />
                      </div>
                    </div>
                    {job.requirements && (
                      <div className="border-t border-slate-100 pt-3">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{isRtl ? "المتطلبات" : "Requirements"}</p>
                        <p className="text-sm text-gray-500 leading-relaxed">{job.requirements}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[3rem] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal header */}
              <div className="bg-primary p-8 rounded-t-[3rem] relative">
                <button
                  onClick={closeModal}
                  className="absolute top-6 end-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <X size={18} />
                </button>
                <div className="space-y-2">
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest">
                    {isRtl ? "تقديم طلب توظيف" : "Job Application"}
                  </p>
                  <h3 className="text-2xl font-black text-white">{selectedJob.title}</h3>
                  <div className="flex items-center gap-4 text-xs font-bold text-white/50 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {selectedJob.location}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {selectedJob.type}</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 space-y-5">
                {/* Name */}
                <div className="relative group">
                  <User className="absolute top-1/2 -translate-y-1/2 start-5 text-gray-400 group-focus-within:text-accent transition-colors" size={18} />
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full ps-14 pe-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-4 ring-primary/5 transition-all font-medium text-sm"
                    placeholder={isRtl ? "الاسم الكامل" : "Full Name"}
                  />
                </div>

                {/* Phone */}
                <div className="relative group">
                  <Phone className="absolute top-1/2 -translate-y-1/2 start-5 text-gray-400 group-focus-within:text-accent transition-colors" size={18} />
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full ps-14 pe-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-4 ring-primary/5 transition-all font-medium text-sm"
                    placeholder={isRtl ? "رقم الجوال" : "Phone Number"}
                    dir="ltr"
                  />
                </div>

                {/* Email */}
                <div className="relative group">
                  <Mail className="absolute top-1/2 -translate-y-1/2 start-5 text-gray-400 group-focus-within:text-accent transition-colors" size={18} />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full ps-14 pe-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-4 ring-primary/5 transition-all font-medium text-sm"
                    placeholder={isRtl ? "البريد الإلكتروني" : "Email Address"}
                    dir="ltr"
                  />
                </div>

                {/* About */}
                <div className="relative group">
                  <FileText className="absolute top-5 start-5 text-gray-400 group-focus-within:text-accent transition-colors" size={18} />
                  <textarea
                    required
                    rows={4}
                    value={form.about}
                    onChange={(e) => setForm({ ...form, about: e.target.value })}
                    className="w-full ps-14 pe-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-4 ring-primary/5 transition-all font-medium text-sm resize-none"
                    placeholder={isRtl ? "نبذة عنك وخبراتك" : "Tell us about yourself and your experience"}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full group relative overflow-hidden bg-[#25D366] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl flex items-center justify-center gap-3"
                >
                  <Send size={16} className={isRtl ? "rotate-180" : ""} />
                  {isRtl ? "إرسال عبر واتساب" : "Send via WhatsApp"}
                </button>

                <p className="text-center text-xs text-gray-400 font-medium">
                  {isRtl
                    ? "سيتم فتح واتساب لإرسال بيانات طلبك مباشرة"
                    : "WhatsApp will open to send your application details directly"}
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
