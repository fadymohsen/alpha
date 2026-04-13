"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Certificate {
  id: string;
  title_ar: string;
  title_en: string;
  image: string;
}

export function CertificatesGallery({ isRtl }: { isRtl: boolean }) {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/certificates?visible=true")
      .then((res) => res.json())
      .then((data) => setCertificates(Array.isArray(data) ? data : []))
      .catch(() => setCertificates([]));
  }, []);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const goNext = () => setSelectedIndex((prev) => (prev !== null ? (prev + 1) % certificates.length : null));
  const goPrev = () => setSelectedIndex((prev) => (prev !== null ? (prev - 1 + certificates.length) % certificates.length : null));

  if (certificates.length === 0) return null;

  return (
    <section className="py-24 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 space-y-4"
        >
          <h2 className="text-2xl md:text-5xl font-black text-primary tracking-tighter leading-none">
            {isRtl ? "شهاداتنا واعتماداتنا" : "Our Certificates"}
          </h2>
          <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
            {isRtl
              ? "نفتخر بحصولنا على أعلى الشهادات والاعتمادات الدولية في مجال النقل واللوجستيات"
              : "We are proud to hold the highest international certificates and accreditations in transport and logistics"}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
              className="bg-white rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-500 border border-primary/5"
              onClick={() => openLightbox(i)}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={cert.image}
                  alt={isRtl ? cert.title_ar : cert.title_en}
                  fill
                  unoptimized={cert.image.startsWith("data:")}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-center">
                <p className="font-bold text-sm text-primary truncate">
                  {isRtl ? cert.title_ar : cert.title_en}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
          >
            <X size={32} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 md:left-8 text-white/80 hover:text-white transition-colors z-10"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 md:right-8 text-white/80 hover:text-white transition-colors z-10"
          >
            <ChevronRight size={40} />
          </button>
          <div className="flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full max-w-2xl aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src={certificates[selectedIndex].image}
                alt={isRtl ? certificates[selectedIndex].title_ar : certificates[selectedIndex].title_en}
                fill
                unoptimized={certificates[selectedIndex].image.startsWith("data:")}
                className="object-contain"
              />
            </div>
            <p className="text-white font-bold text-lg">
              {isRtl ? certificates[selectedIndex].title_ar : certificates[selectedIndex].title_en}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
