import { getDictionary } from "@/i18n/get-dictionary";
import { Target, Eye, Star, Award, Users, MapPin, Globe2 } from "lucide-react";
import Image from "next/image";

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as any);
  const isRtl = locale === "ar";

  return (
    <main className="flex-grow pt-32">
      <section className="bg-primary py-32 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent rounded-full blur-[100px]" />
           <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-white rounded-full blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-8">
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none whitespace-pre-line">{dict.nav.about}</h1>
          <p className="text-xl text-[#C1922C] font-bold uppercase tracking-[0.3em]">{dict.hero.title1}</p>
          <p className="text-xl text-[#C1922C]/80 max-w-2xl mx-auto leading-relaxed font-medium">{dict.about.description}</p>
        </div>
      </section>

      {/* World Map Section - NEW */}
      <section className="py-32 bg-[#fafafa] relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 order-2 lg:order-1">
               <div className="space-y-6">
                  <h2 className="text-5xl font-black text-primary leading-tight">{isRtl ? "حضورنا العالمي والمحلي" : "Our Global and Local Presence"}</h2>
                  <p className="text-xl text-gray-500 font-medium leading-relaxed">
                    {isRtl ? "نحن نربط المملكة العربية السعودية بالعالم عبر أسطولنا المتطور وشبكتنا اللوجستية الواسعة. نغطي كافة مناطق المملكة ونمتد إلى دول الخليج والشرق الأوسط، مع رؤية للتوسع العالمي." : "We connect the Kingdom of Saudi Arabia to the world through our advanced fleet and wide logistics network. We cover all regions of the Kingdom and extend to the Gulf and Middle East countries, with a vision for global expansion."}
                  </p>
               </div>
               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <span className="text-4xl font-black text-accent">١٠٠%</span>
                     <p className="text-sm font-bold text-primary uppercase tracking-widest">{isRtl ? "تغطية محلية" : "Local Coverage"}</p>
                  </div>
                  <div className="space-y-4">
                     <span className="text-4xl font-black text-secondary">{isRtl ? "دولي" : "International"}</span>
                     <p className="text-sm font-bold text-primary uppercase tracking-widest">{isRtl ? "درب الحرير" : "Global Corridors"}</p>
                  </div>
               </div>
            </div>
            <div className="lg:col-span-1 order-1 lg:order-2">
               <div className="relative aspect-square bg-white rounded-[5rem] shadow-2xl overflow-hidden border-8 border-white p-12">
                  <div className="absolute inset-x-0 bottom-0 top-0 opacity-[0.05] pointer-events-none">
                     <Globe2 size={500} className="absolute -right-20 -bottom-20 rotate-12" />
                  </div>
                  <a href="https://maps.google.com/?q=24.706114,46.749271" target="_blank" rel="noopener noreferrer" className="relative z-10 w-full h-full rounded-[4rem] flex items-center justify-center group overflow-hidden cursor-pointer">
                     <iframe
                       src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3626.5!2d46.749271!3d24.706114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ssa!4v1700000000000"
                       className="absolute inset-0 w-full h-full rounded-[4rem] pointer-events-none"
                       style={{ border: 0 }}
                       allowFullScreen
                       loading="lazy"
                       referrerPolicy="no-referrer-when-downgrade"
                     />
                  </a>
               </div>
            </div>
         </div>
      </section>

      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="p-12 rounded-[3.5rem] bg-white border border-primary/5 shadow-2xl space-y-8 group hover:bg-primary transition-all duration-700">
            <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center text-white group-hover:bg-accent group-hover:text-primary transition-all shadow-[0_20px_40px_-10px_rgba(33,59,99,0.3)]"><Target size={40} /></div>
            <h3 className="text-3xl font-black text-primary group-hover:text-white transition-colors">{dict.vision_mission.mission.title}</h3>
            <p className="text-gray-500 font-medium leading-relaxed group-hover:text-white/70 transition-all">{dict.vision_mission.mission.desc}</p>
          </div>
          <div className="p-12 rounded-[3.5rem] bg-white border border-primary/5 shadow-2xl space-y-8 group hover:bg-secondary transition-all duration-700">
            <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center text-white group-hover:bg-white group-hover:text-secondary transition-all shadow-[0_20px_40px_-10px_rgba(122,54,59,0.3)]"><Eye size={40} /></div>
            <h3 className="text-3xl font-black text-primary group-hover:text-white transition-colors">{dict.vision_mission.vision.title}</h3>
            <p className="text-gray-500 font-medium leading-relaxed group-hover:text-white/70 transition-all">{dict.vision_mission.vision.desc}</p>
          </div>
          <div className="p-12 rounded-[3.5rem] bg-white border border-primary/5 shadow-2xl space-y-8 group hover:bg-accent transition-all duration-700">
            <div className="w-20 h-20 rounded-3xl bg-accent flex items-center justify-center text-primary group-hover:bg-white transition-all shadow-[0_20px_40px_-10px_rgba(122,54,59,0.3)]"><Star size={40} /></div>
            <h3 className="text-3xl font-black text-primary group-hover:text-primary transition-colors">{dict.about.goals.title}</h3>
            <ul className="space-y-4 text-gray-500 group-hover:text-primary transition-all">
               <li className="flex items-center gap-3 font-bold">• {dict.about.goals.desc1}</li>
               <li className="flex items-center gap-3 font-bold">• {dict.about.goals.desc2}</li>
               <li className="flex items-center gap-3 font-bold">• {dict.about.goals.desc3}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-32 bg-primary">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
               <div className="space-y-4">
                  <h2 className="text-5xl font-black text-white leading-tight">{isRtl ? "شريككم اللوجستي الموثوق في المملكة" : "Your Trusted Logistics Partner in the Kingdom"}</h2>
                  <p className="text-lg text-white/80 font-medium leading-relaxed">{isRtl ? "منذ تأسيسنا، ونحن نضع رضا العملاء هدفاً أسمى، والالتزام سراً لنجاحنا. نمتلك اليوم أسطولاً مجهزاً بأحدث التقنيات لنقل كافة أنواع المنقولات بكفاءة واحترافية." : "Since our founding, we have put customer satisfaction as a supreme goal, and commitment as the secret of our success. Today, we have a fleet equipped with the latest technologies to transport all types of cargo efficiently and professionally."}</p>
               </div>
               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <Award size={32} className="text-accent" />
                     <h4 className="font-black text-white">{isRtl ? "الموثوقية" : "Reliability"}</h4>
                     <p className="text-base text-white/80">{isRtl ? "نلتزم بأعلى معايير الأمان الدولية في كافة عملياتنا." : "We adhere to the highest international safety standards in all our operations."}</p>
                  </div>
                  <div className="space-y-2">
                     <Users size={32} className="text-accent" />
                     <h4 className="font-black text-white">{isRtl ? "الاحترافية" : "Professionalism"}</h4>
                     <p className="text-base text-white/80">{isRtl ? "فريق عمل مدرب وخبير في إدارة سلاسل الإمداد." : "A trained and experienced team in supply chain management."}</p>
                  </div>
               </div>
            </div>
            <div className="relative aspect-video bg-white/5 rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white/10 p-4">
               <div className="absolute inset-0 bg-primary/20" />
               <div className="w-full h-full relative rounded-[3rem] overflow-hidden">
                  <Image src="/truck1.png" alt="Operations" fill className="object-cover" />
               </div>
            </div>
         </div>
      </section>
    </main>
  );
}
