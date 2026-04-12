"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const fleetImages = [
  { src: "/fleet/fleet-1.jpg", alt: "Fleet Vehicle 1" },
  { src: "/fleet/fleet-2.jpg", alt: "Fleet Vehicle 2" },
  { src: "/fleet/fleet-3.jpg", alt: "Fleet Vehicle 3" },
  { src: "/fleet/fleet-4.jpg", alt: "Fleet Vehicle 4" },
  { src: "/fleet/fleet-5.jpg", alt: "Fleet Vehicle 5" },
  { src: "/fleet/fleet-6.jpg", alt: "Fleet Vehicle 6" },
];

export function FleetGallery({ isRtl }: { isRtl: boolean }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const goNext = () => setSelectedIndex((prev) => (prev !== null ? (prev + 1) % fleetImages.length : null));
  const goPrev = () => setSelectedIndex((prev) => (prev !== null ? (prev - 1 + fleetImages.length) % fleetImages.length : null));

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 space-y-4"
        >
          <h2 className="text-2xl md:text-5xl font-black text-primary tracking-tighter leading-none">
            {isRtl ? "أسطولنا" : "Our Fleet"}
          </h2>
          <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
            {isRtl
              ? "أسطول متطور ومجهز بأحدث التقنيات لتلبية جميع احتياجات النقل"
              : "A modern fleet equipped with the latest technology to meet all transport needs"}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {fleetImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-500" />
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
          <div
            className="relative w-full max-w-4xl aspect-[16/10] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={fleetImages[selectedIndex].src}
              alt={fleetImages[selectedIndex].alt}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
