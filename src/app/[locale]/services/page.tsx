import { getDictionary } from "@/i18n/get-dictionary";
import { Truck, Activity, Construction, ShieldCheck, Microscope, Globe, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function ServicesPage({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as any);
  const isRtl = locale === "ar";
  
  return (
    <main className="flex-grow pt-32 pb-16">
      {/* Header Section - Refined */}
      <section className="bg-[#fafafa] py-24 text-center relative overflow-hidden">
         <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
         <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-4">
            <h1 className="text-5xl md:text-7xl font-black text-primary tracking-tighter leading-none">{dict.services.title}</h1>
            <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">{dict.why_choose_us.subtitle}</p>
         </div>
      </section>

      {/* Detailed Services Grid - Scaled down */}
      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        {dict.services.list.map((s: any, i: number) => (
          <div key={s.id} className="group p-10 rounded-[2.5rem] bg-white border border-primary/5 shadow-2xl hover:bg-primary transition-all duration-700 space-y-6 overflow-hidden relative">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all shadow-inner relative z-10">
               {i === 0 ? <Truck size={32} /> : i === 1 ? <Construction size={32} /> : i === 2 ? <ShieldCheck size={32} /> : <Globe size={32} />}
            </div>
            <div className="space-y-3 relative z-10">
              <h3 className="text-3xl font-black text-primary group-hover:text-white transition-colors tracking-tighter">{s.title}</h3>
              <p className="text-base text-gray-500 font-medium leading-relaxed group-hover:text-white/80 transition-all">{s.desc}</p>
            </div>
            <div className="pt-6 relative z-10">
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
          </div>
        ))}
      </div>

      {/* Expertise Section - Constrained Width & Downsized (30%) */}
      <section className="py-16 mt-8">
         <div className="max-w-5xl mx-auto px-6 bg-primary rounded-[4rem] p-12 md:p-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
               <Truck size={300} className="absolute -bottom-10 -right-10 rotate-12" />
            </div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div className="space-y-6">
                  <h2 className="text-4xl font-black text-white leading-tight">
                    {isRtl ? "حلول تخصصية لنقل الاسمنت السائب والمعدات الثقيلة" : "Specialized Bulk Cement & Heavy Transport Solutions"}
                  </h2>
                  <p className="text-base text-white/70 leading-relaxed font-medium">
                    {isRtl ? "نمتلك محطات توزيع وتعبئة متكاملة تضمن استقرار سلاسل التوريد لشركائنا في قطاع الإنشاءات وبناء البنية التحتية للمملكة." : "We operate integrated distribution stations ensuring supply chain stability for our partners in the construction and infrastructure sector of the Kingdom."}
                  </p>
                  <div className="flex items-center gap-4 pt-4">
                     <div className="p-3 bg-white/10 rounded-xl flex items-center gap-3">
                        <Microscope className="text-accent" size={20} />
                        <span className="text-white font-bold text-xs tracking-widest uppercase">Precision Standards</span>
                     </div>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4 relative">
                  <div className="aspect-[3/4] bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-sm overflow-hidden relative">
                     <Image src="/truck1.png" alt="Specialized Truck" fill className="object-cover opacity-60 hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="aspect-[3/4] bg-accent/20 rounded-[2rem] translate-y-8 shadow-2xl overflow-hidden relative border-2 border-accent/20">
                     <Image src="/truck2.png" alt="Heavy Equipment" fill className="object-cover hover:scale-105 transition-transform" />
                  </div>
               </div>
            </div>
         </div>
      </section>
    </main>
  );
}
