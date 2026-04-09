import { getDictionary } from "@/i18n/get-dictionary";
import { Briefcase, MapPin, Clock, ArrowRight, Heart, Star, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "الوظائف" : "Careers",
    description: isAr
      ? "انضم لفريق شركة ألفا للنقل المحدودة. فرص عمل في النقل واللوجستيات في المملكة العربية السعودية."
      : "Join the ALFA TRANS team. Career opportunities in transport and logistics across Saudi Arabia.",
  };
}

export default async function CareersPage({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale as any);
  const isRtl = locale === "ar";
  
  const jobs = [
    { title: isRtl ? "سائق نقل ثقيل" : "Heavy Truck Driver", type: isRtl ? "دوام كامل" : "Full Time", location: isRtl ? "الرياض" : "Riyadh" },
    { title: isRtl ? "مشرف لوجستي" : "Logistics Supervisor", type: isRtl ? "دوام كامل" : "Full Time", location: isRtl ? "جدة" : "Jeddah" },
    { title: isRtl ? "منسق سلاسل إمداد" : "Supply Chain Coordinator", type: isRtl ? "دوام كامل" : "Full Time", location: isRtl ? "الدمام" : "Dammam" }
  ];

  return (
    <main className="flex-grow pt-32 pb-16">
      <section className="bg-primary py-24 text-center relative overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 top-0 opacity-10 pointer-events-none">
           <Briefcase size={500} className="absolute -left-20 -bottom-20 -rotate-12" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">{isRtl ? "انضم لفريقنا" : "Join Our Team"}</h1>
          <p className="text-xl text-white/80 font-medium max-w-2xl mx-auto">{isRtl ? "ابنِ مستقبلك المهني مع رائد حلول النقل في المملكة" : "Build your career with the leader of transport solutions in the Kingdom"}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-10">
                 <div className="space-y-4">
                    <h2 className="text-5xl font-black text-primary leading-tight">{isRtl ? "لماذا تعمل في ألفا؟" : "Why Work at ALFA?"}</h2>
                    <p className="text-lg text-gray-500 font-medium leading-relaxed">{isRtl ? "نحن نوفر بيئة عمل محفزة، تقدر الإبداع والالتزام، ونسعى دائماً لتطوير مهارات فريقنا لمواكبة التطورات العالمية." : "We provide a stimulating work environment that values creativity and commitment, and we always strive to develop our team's skills to keep pace with global developments."}</p>
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
              <div className="p-12 bg-slate-50 rounded-[4rem] border border-primary/5 space-y-8">
                 <h3 className="text-3xl font-black text-primary">{isRtl ? "الفرص المتاحة" : "Open Positions"}</h3>
                 <div className="space-y-4">
                    {jobs.map((job, i) => (
                      <div key={i} className="p-8 bg-white rounded-3xl shadow-sm border border-primary/5 flex items-center justify-between group hover:border-accent transition-all cursor-pointer">
                         <div className="space-y-1">
                            <h4 className="text-xl font-black text-primary group-hover:text-accent transition-colors">{job.title}</h4>
                            <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                               <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                               <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                            </div>
                         </div>
                         <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white group-hover:rotate-45 transition-all"><ArrowRight size={20} className={isRtl ? "rotate-180" : ""} /></div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>
    </main>
  );
}
