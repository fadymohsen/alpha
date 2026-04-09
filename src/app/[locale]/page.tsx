"use client";
import { useDictionary } from "@/i18n/dictionary-provider";
import { ArrowLeft, ArrowRight, Truck, Crosshair, ShieldCheck, Activity, Award, Users, Zap, Coffee, Heart, Rocket, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CountUpStat = ({ end, label, index, isRtl }: { end: number; label: string; index: number; isRtl: boolean }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasStarted) setHasStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const duration = 2000;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [hasStarted, end]);

  const toArabicNumerals = (n: number) => n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index }}
      className="space-y-4 group text-center md:text-start md:border-l md:border-white/5 md:pl-8"
    >
      <div className="text-4xl md:text-7xl font-black text-white tracking-tighter group-hover:text-white/80 transition-colors duration-500">
        {isRtl ? toArabicNumerals(count) : count}+
      </div>
      <div className="flex items-center justify-center md:justify-start gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
        <div className="text-white/70 text-xs font-black">{label}</div>
      </div>
    </motion.div>
  );
};

const TypewriterText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const characters = Array.from(text);
  
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.05, delayChildren: delay }
        }
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function HomePage({ params }: { params: { locale: string } }) {
  const dict = useDictionary();
  const locale = params.locale;
  const isRtl = locale === "ar";
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.4 }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 100, duration: 0.8 } }
  };

  return (
    <main className="flex-grow">
      {/* Enhanced Hero - Video Background */}
      <section className="relative min-h-[100vh] flex items-center pt-24 pb-12 overflow-hidden bg-dark">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-dark/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/50" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 max-w-4xl mx-auto">
             <motion.h1 className="text-5xl md:text-[5.5rem] font-black tracking-tight text-white leading-tight-override">
               <motion.div variants={fadeUp}>
                 {dict.hero.title2.split("..")[0]}
               </motion.div>
               <motion.div variants={fadeUp} className="text-[#C1922C]">
                 {dict.hero.title2.split("..")[1]}
               </motion.div>
               <motion.div variants={fadeUp} className="text-white/80 text-3xl md:text-5xl">
                 {dict.hero.title2.split("..")[2]}
               </motion.div>
             </motion.h1>

             <motion.p variants={fadeUp} className="text-lg text-white/70 max-w-xl mx-auto font-medium leading-relaxed">
               {dict.hero.subtitle}
             </motion.p>

             <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href={`/${locale}/contact`} className="btn-primary w-64 h-[60px] !p-0 !text-sm group shadow-xl flex items-center justify-center gap-3 active:scale-95 !rounded-3xl">
                   {isRtl ? (
                     <>
                        {dict.hero.cta_primary}
                        <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
                     </>
                   ) : (
                     <>
                        <ArrowRight size={18} className="group-hover:-translate-x-2 transition-transform" />
                        {dict.hero.cta_primary}
                     </>
                   )}
                </Link>
                <Link href={`/${locale}/about`} className="bg-white/10 backdrop-blur-sm text-white w-64 h-[60px] rounded-3xl text-sm font-black uppercase tracking-widest hover:bg-white/20 transition-all shadow-xl group flex items-center justify-center gap-4 active:scale-95 border border-white/10">
                   {dict.hero.cta_secondary}
                   <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all shrink-0">
                     <ArrowRight size={18} className={isRtl ? "rotate-180" : ""} />
                   </div>
                </Link>
             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats - Standard Spacing */}
      <section className="bg-secondary py-32 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/2" />
         <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
            {Object.entries(dict.stats).map(([key, val], i) => {
              const values = [15, 500, 10, 200];
              return (
                <CountUpStat key={key} end={values[i]} label={val as string} index={i} isRtl={isRtl} />
              );
            })}
         </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-black text-primary tracking-tight">{isRtl ? "شركاؤنا" : "Our Partners"}</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
          >
            {[
              { src: "/partners/sabic.jpeg", alt: "SABIC" },
              { src: "/partners/sapac.jpeg", alt: "SAPAC" },
              { src: "/partners/al-terais.jpeg", alt: "Saudi Al-Terais" },
              { src: "/partners/nagadi.jpeg", alt: "T. Nagadi" },
              { src: "/partners/tawuniya.jpeg", alt: "Tawuniya" },
              { src: "/partners/qassim-cement.jpeg", alt: "Qassim Cement" },
            ].map((partner, i) => (
              <motion.div
                key={partner.alt}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="flex items-center justify-center p-4 rounded-2xl transition-all duration-300 bg-transparent h-28"
              >
                <div className="relative w-full h-full">
                  <Image src={partner.src} alt={partner.alt} fill className="object-contain transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-32 bg-[#fafafa] relative overflow-hidden">
         <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="max-w-2xl space-y-6 mb-24 text-center mx-auto"
            >
               <h2 className="text-5xl md:text-7xl font-black text-primary tracking-tighter leading-none">{isRtl ? "قيمنا الجوهرية" : "Our Core Values"}</h2>
               <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-xl mx-auto">{isRtl ? "نحن نؤمن بأن للوجيستيات روحاً، وقيمنا هي المحرك الرئيسي لكل رحلة نقوم بها لضمان رضا عملائنا." : "We believe logistics has a soul, and our values are the main engine for every journey we take to ensure our clients' satisfaction."}</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { icon: <Heart className="text-secondary" />, title: isRtl ? "الالتزام" : "Commitment", desc: isRtl ? "نضع مواعيدكم كأولوية قصوى لا تقبل المساومة." : "We put your deadlines as a top uncompromising priority." },
                 { icon: <Zap className="text-secondary" />, title: isRtl ? "السرعة" : "Agility", desc: isRtl ? "استجابة سريعة لمتطلبات السوق المتغيرة باستمرار." : "Quick response to ever-changing market requirements." },
                 { icon: <Coffee className="text-secondary" />, title: isRtl ? "الموثوقية" : "Reliability", desc: isRtl ? "شراكة ممتدة عبر سنوات من الثقة المتبادلة." : "An extended partnership through years of mutual trust." }
               ].map((v, i) => (
                 <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 40 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: 0.1 * i }} 
                  className="space-y-8 group text-center p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-500"
                >
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-white flex items-center justify-center shadow-lg group-hover:-translate-y-2 transition-all duration-500">
                      <div className="scale-110">{v.icon}</div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-3xl font-black text-primary tracking-tight">{v.title}</h4>
                      <p className="text-base text-gray-500 font-medium leading-relaxed px-2">{v.desc}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Services Grid */}
      <section className="pt-32 pb-16 bg-white">
         <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col justify-center items-center text-center gap-10 mb-14">
               <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="space-y-6">
                  <h2 className="text-5xl md:text-7xl font-black text-primary tracking-tighter leading-none">{dict.services.title}</h2>
                  <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">{dict.why_choose_us.subtitle}</p>
               </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
               {dict.services.list.map((s: any, i: number) => (
                 <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  style={{ height: "100%" }}
                  className="group p-12 rounded-[2.5rem] bg-slate-50 hover:bg-primary transition-all duration-700 overflow-hidden relative border border-primary/5 flex flex-col"
                >
                    <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all shadow-xl relative z-10 mb-10">
                       {i === 0 ? <Truck size={32} /> : i === 2 ? <ShieldCheck size={32} /> : <Activity size={32} />}
                    </div>
                    <div className="space-y-4 relative z-10 flex-grow">
                      <h3 className="text-3xl font-black text-primary group-hover:text-white transition-colors tracking-tighter leading-none">{s.title}</h3>
                      <p className="text-base text-gray-500 font-medium leading-relaxed group-hover:text-white/60 transition-all">{s.desc}</p>
                    </div>
                    <div className="pt-6 relative z-10 mt-auto">
                       <Link
                         href={`https://wa.me/966555955056?text=${encodeURIComponent(`Hi, I'm interested in: ${s.title}`)}`}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="w-full flex items-center justify-center gap-3 bg-secondary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-secondary/90 transition-all"
                       >
                         <MessageCircle size={18} />
                         {isRtl ? "تواصل عبر واتساب" : "Inquire via WhatsApp"}
                       </Link>
                    </div>
                 </motion.div>
               ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-center mt-16">
              <Link href={`/${locale}/services`} className="bg-secondary text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-secondary/90 transition-all group flex items-center gap-3">
                {dict.cta.services_btn}
                <ArrowRight size={18} className={`${isRtl ? "rotate-180" : ""} group-hover:translate-x-1 transition-transform`} />
              </Link>
            </motion.div>
         </div>
      </section>

      {/* CTA → Careers */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-2 border-primary/10 rounded-[2rem] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-start"
          >
            <div className="space-y-3 max-w-lg">
              <h3 className="text-3xl md:text-4xl font-black text-primary tracking-tight">{dict.cta.careers_heading}</h3>
              <p className="text-base text-gray-500 font-medium leading-relaxed">{dict.cta.careers_desc}</p>
            </div>
            <Link href={`/${locale}/careers`} className="shrink-0 bg-secondary text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-secondary/90 transition-all group flex items-center gap-3">
              {dict.cta.careers_btn}
              <ArrowRight size={18} className={`${isRtl ? "rotate-180" : ""} group-hover:translate-x-1 transition-transform`} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Specialized Solutions */}
      <section className="py-32 bg-primary relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
         <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-1 gap-24 items-center relative z-10 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 60 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="space-y-16"
            >
               <div className="space-y-8 max-w-4xl mx-auto">
                  <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter">{dict.specialized_solutions.title}</h2>
                  <p className="text-xl text-white/80 leading-relaxed font-medium mx-auto max-w-2xl">{dict.specialized_solutions.description}</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                  <div className="space-y-8 p-12 bg-white/5 rounded-[3rem] border border-white/5 hover:bg-white/10 transition-all duration-700 group">
                     <div className="w-16 h-16 mx-auto bg-[#C1922C]/10 rounded-full flex items-center justify-center"><Award size={32} className="text-[#C1922C]" /></div>
                     <h4 className="font-black text-2xl text-white">{dict.specialized_solutions.quality_title}</h4>
                     <p className="text-base text-white/70 leading-relaxed mx-auto max-w-xs">{dict.specialized_solutions.quality_desc}</p>
                  </div>
                  <div className="space-y-8 p-12 bg-white/5 rounded-[3rem] border border-white/5 hover:bg-white/10 transition-all duration-700 group">
                     <div className="w-16 h-16 mx-auto bg-[#C1922C]/10 rounded-full flex items-center justify-center"><Users size={32} className="text-[#C1922C]" /></div>
                     <h4 className="font-black text-2xl text-white">{dict.specialized_solutions.pro_title}</h4>
                     <p className="text-base text-white/70 leading-relaxed mx-auto max-w-xs">{dict.specialized_solutions.pro_desc}</p>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>
    </main>
  );
}
