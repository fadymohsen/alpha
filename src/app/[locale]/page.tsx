"use client";
import { useDictionary } from "@/i18n/dictionary-provider";
import { ArrowLeft, ArrowRight, Truck, Crosshair, ShieldCheck, Activity, Award, Users, Zap, Coffee, Heart, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

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
  const isRtl = params.locale === "ar";
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

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
      {/* Enhanced Hero - Centered & Premium Branding */}
      <section className="relative min-h-[85vh] flex items-center pt-32 pb-24 overflow-hidden bg-white">
        {/* Logo Watermark Background - Enhanced Visibility */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
           <div className="relative w-[800px] h-[800px]">
              <Image src="/logo-transperent.png" alt="Watermark" fill className="object-contain grayscale" priority />
           </div>
        </motion.div>

        {/* Ambient Soul Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            style={{ y: y1 }}
            className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[100px]" 
          />
          <motion.div 
            style={{ y: y2 }}
            className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] bg-accent/5 rounded-full blur-[80px]" 
          />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.015]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12 max-w-4xl mx-auto">
             <motion.h1 className="text-5xl md:text-[5.5rem] font-black tracking-tight leading-[1.1] text-primary">
               <motion.div variants={fadeUp} className="mb-2">
                 {dict.hero.title2.split("..")[0]}
               </motion.div>
               <motion.div variants={fadeUp} className="text-accent mb-2">
                 {dict.hero.title2.split("..")[1]}
               </motion.div>
               <motion.div variants={fadeUp} className="italic text-secondary text-3xl md:text-5xl">
                 {dict.hero.title2.split("..")[2]}
               </motion.div>
             </motion.h1>

             <motion.p variants={fadeUp} className="text-xl text-gray-600 max-w-xl mx-auto font-medium leading-relaxed">
               {dict.hero.subtitle}
             </motion.p>

             <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-4">
                <Link href="/contact" className="btn-primary w-64 h-[72px] !p-0 !text-sm group shadow-xl flex items-center justify-center gap-3 active:scale-95 !rounded-3xl">
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
                <Link href="/about" className="bg-accent text-white w-64 h-[72px] rounded-3xl text-sm font-black uppercase tracking-widest hover:bg-accent/90 transition-all shadow-xl group flex items-center justify-center gap-4 active:scale-95">
                   {dict.hero.cta_secondary}
                   <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-accent transition-all shrink-0">
                     <ArrowRight size={18} className={isRtl ? "rotate-180" : ""} />
                   </div>
                </Link>
             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats - Standard Spacing */}
      <section className="bg-primary py-32 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/2" />
         <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
            {Object.entries(dict.stats).map(([key, val], i) => (
              <motion.div 
                key={key} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: 0.1 * i }} 
                className="space-y-6 group border-l border-white/5 pl-8"
              >
                 <div className="text-5xl md:text-7xl font-black text-white tracking-tighter group-hover:text-accent transition-colors duration-500">
                   {i === 0 ? (isRtl ? "١٥+" : "15+") : i === 1 ? (isRtl ? "٥٠٠+" : "500+") : i === 2 ? (isRtl ? "١٠+" : "10+") : (isRtl ? "٢٠٠+" : "200+")}
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <div className="text-white/70 text-xs font-black uppercase tracking-[0.4em]">{val as string}</div>
                 </div>
              </motion.div>
            ))}
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
                 { icon: <Zap className="text-accent" />, title: isRtl ? "السرعة" : "Agility", desc: isRtl ? "استجابة سريعة لمتطلبات السوق المتغيرة باستمرار." : "Quick response to ever-changing market requirements." },
                 { icon: <Coffee className="text-primary" />, title: isRtl ? "الموثوقية" : "Reliability", desc: isRtl ? "شراكة ممتدة عبر سنوات من الثقة المتبادلة." : "An extended partnership through years of mutual trust." }
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
      <section className="py-32 bg-white">
         <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col justify-center items-center text-center gap-10 mb-28">
               <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="space-y-6">
                  <h2 className="text-5xl md:text-7xl font-black text-primary tracking-tighter leading-none">{dict.services.title}</h2>
                  <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">{dict.why_choose_us.subtitle}</p>
               </motion.div>
               <Link href="/services" className="btn-secondary !rounded-full !px-12 !py-4 group border">
                 <span className="flex items-center gap-4 font-black tracking-widest text-xs">
                   EXPLORE ECOSYSTEM <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform" />
                 </span>
               </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               {dict.services.list.map((s: any, i: number) => (
                 <motion.div 
                  key={s.id} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: 0.1 * i }} 
                  className="group p-12 rounded-[2.5rem] bg-slate-50 hover:bg-primary transition-all duration-700 space-y-10 overflow-hidden relative border border-primary/5"
                >
                    <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-primary transition-all shadow-xl relative z-10">
                       {i === 0 ? <Truck size={32} /> : i === 2 ? <ShieldCheck size={32} /> : <Activity size={32} />}
                    </div>
                    <div className="space-y-4 relative z-10">
                      <h3 className="text-3xl font-black text-primary group-hover:text-white transition-colors tracking-tighter leading-none">{s.title}</h3>
                      <p className="text-base text-gray-500 font-medium leading-relaxed group-hover:text-white/60 transition-all">{s.desc}</p>
                    </div>
                    <div className="pt-8 border-t border-primary/10 group-hover:border-white/10 flex items-center justify-between relative z-10">
                       <span className="font-black text-xs uppercase tracking-[0.4em] text-accent group-hover:text-white transition-colors">Strategic Solution</span>
                       <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary group-hover:rotate-45 transition-all shadow-md">
                          <ArrowRight size={20} />
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
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
                     <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center"><Award size={32} className="text-accent" /></div>
                     <h4 className="font-black text-2xl text-white">{dict.specialized_solutions.quality_title}</h4>
                     <p className="text-base text-white/70 leading-relaxed mx-auto max-w-xs">{dict.specialized_solutions.quality_desc}</p>
                  </div>
                  <div className="space-y-8 p-12 bg-white/5 rounded-[3rem] border border-white/5 hover:bg-white/10 transition-all duration-700 group">
                     <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center"><Users size={32} className="text-accent" /></div>
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
