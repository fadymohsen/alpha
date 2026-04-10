"use client";
import { useDictionary } from "@/i18n/dictionary-provider";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DbFaq { id: string; question_ar: string; question_en: string; answer_ar: string; answer_en: string; }

export default function FaqPage({ params }: { params: { locale: string } }) {
  const dict = useDictionary();
  const locale = params.locale;
  const isRtl = locale === "ar";
  const [open, setOpen] = useState<number | null>(null);
  const [dbFaqs, setDbFaqs] = useState<DbFaq[] | null>(null);

  useEffect(() => {
    fetch("/api/faq?visible=true")
      .then((r) => r.ok ? r.json() : [])
      .then((d) => { if (Array.isArray(d) && d.length > 0) setDbFaqs(d); })
      .catch(() => {});
  }, []);

  const faqItems = dbFaqs
    ? dbFaqs.map((f) => ({ q: isRtl ? f.question_ar : f.question_en, a: isRtl ? f.answer_ar : f.answer_en }))
    : dict.faq.items;

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <main className="flex-grow pt-32 pb-16">
      <section className="py-24 bg-[#fafafa] text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-primary tracking-tighter leading-tight-override">{dict.faq.title}</h1>
          <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">{dict.faq.subtitle}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 -mt-12 relative z-20 space-y-4">
        {faqItems.map((item: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * i }}
            className="bg-white rounded-2xl border border-primary/5 shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between p-6 text-start gap-4"
            >
              <span className="text-base font-bold text-primary">{item.q}</span>
              <ChevronDown
                size={20}
                className={`text-secondary shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
