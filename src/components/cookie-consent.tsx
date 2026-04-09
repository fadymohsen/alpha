"use client";
import { useState, useEffect } from "react";
import { useDictionary } from "@/i18n/dictionary-provider";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Link from "next/link";

export function CookieConsent({ locale }: { locale: string }) {
  const dict = useDictionary();
  const [visible, setVisible] = useState(false);
  const isRtl = locale === "ar";

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[90] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 space-y-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <Cookie size={20} className="text-secondary" />
              </div>
              <h3 className="text-sm font-black text-primary uppercase tracking-wider">
                {dict.cookie.title}
              </h3>
            </div>
            <button onClick={decline} className="text-gray-400 hover:text-gray-600 transition-colors shrink-0">
              <X size={18} />
            </button>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed">
            {dict.cookie.message}{" "}
            <Link href={`/${locale}/privacy`} className="text-secondary underline hover:text-primary transition-colors">
              {dict.cookie.privacy_link}
            </Link>
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={accept}
              className="flex-1 bg-secondary text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-secondary/90 transition-all active:scale-95"
            >
              {dict.cookie.accept}
            </button>
            <button
              onClick={decline}
              className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95"
            >
              {dict.cookie.decline}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
