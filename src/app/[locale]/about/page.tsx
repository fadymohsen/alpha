import { getDictionary } from "@/i18n/get-dictionary";
import { Target, Eye, Star, Award, Users, MapPin, Globe2 } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";
import { FleetGallery } from "@/components/fleet-gallery";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "من نحن" : "About Us",
    description: isAr
      ? "تعرّف على شركة ألفا للنقل المحدودة، رائدة النقل البري في المملكة العربية السعودية منذ أكثر من 15 عاماً."
      : "Learn about ALFA TRANS, a pioneer in land transport in Saudi Arabia for over 15 years.",
  };
}

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
          <h1 className="text-3xl md:text-8xl font-black text-white tracking-tighter leading-none whitespace-pre-line">{dict.nav.about}</h1>
          <p className="text-xl text-[#C1922C] font-bold uppercase tracking-[0.3em]">{dict.hero.title1}</p>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-medium">{dict.about.description}</p>
        </div>
      </section>

      {/* World Map Section - NEW */}
      <section className="py-32 bg-[#fafafa] relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 order-2 lg:order-1">
               <div className="space-y-6">
                  <h2 className="text-2xl md:text-5xl font-black text-primary leading-tight">{isRtl ? "حضورنا العالمي والمحلي" : "Our Global and Local Presence"}</h2>
                  <p className="text-xl text-gray-500 font-medium leading-relaxed">
                    {isRtl ? "نحن نربط المملكة العربية السعودية بالعالم عبر أسطولنا المتطور وشبكتنا اللوجستية الواسعة. نغطي كافة مناطق المملكة ونمتد إلى دول الخليج والشرق الأوسط، مع رؤية للتوسع العالمي." : "We connect the Kingdom of Saudi Arabia to the world through our advanced fleet and wide logistics network. We cover all regions of the Kingdom and extend to the Gulf and Middle East countries, with a vision for global expansion."}
                  </p>
               </div>
               <div className="grid grid-cols-2 gap-8 overflow-hidden">
                  <div className="space-y-4 min-w-0">
                     <span className="text-4xl font-black text-accent">{isRtl ? "١٠٠%" : "100%"}</span>
                     <p className="text-sm font-bold text-primary uppercase tracking-widest">{isRtl ? "تغطية محلية" : "Local Coverage"}</p>
                  </div>
                  <div className="space-y-4 min-w-0">
                     <span className="text-2xl md:text-4xl font-black text-secondary">{isRtl ? "دولي" : "International"}</span>
                     <p className="text-sm font-bold text-primary uppercase tracking-widest">{isRtl ? "درب الحرير" : "Global Corridors"}</p>
                  </div>
               </div>
            </div>
            <div className="lg:col-span-1 order-1 lg:order-2">
               <div className="relative aspect-square bg-white rounded-3xl shadow-2xl overflow-hidden">
                  <a href="https://maps.google.com/?q=24.706114,46.749271" target="_blank" rel="noopener noreferrer" className="absolute inset-0 cursor-pointer">
                     <iframe
                       src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3626.5!2d46.749271!3d24.706114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ssa!4v1700000000000"
                       className="absolute inset-0 w-full h-full pointer-events-none"
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
          <div className="p-12 rounded-[3.5rem] bg-white border border-primary/5 shadow-2xl space-y-8 group hover:bg-secondary transition-all duration-700">
            <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center text-white group-hover:bg-white group-hover:text-secondary transition-all shadow-[0_20px_40px_-10px_rgba(122,54,59,0.3)]"><Target size={40} /></div>
            <h3 className="text-3xl font-black text-primary group-hover:text-white transition-colors">{dict.vision_mission.mission.title}</h3>
            <p className="text-gray-500 font-medium leading-relaxed group-hover:text-white/70 transition-all">{dict.vision_mission.mission.desc}</p>
          </div>
          <div className="p-12 rounded-[3.5rem] bg-white border border-primary/5 shadow-2xl space-y-8 group hover:bg-secondary transition-all duration-700">
            <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center text-white group-hover:bg-white group-hover:text-secondary transition-all shadow-[0_20px_40px_-10px_rgba(122,54,59,0.3)]"><Eye size={40} /></div>
            <h3 className="text-3xl font-black text-primary group-hover:text-white transition-colors">{dict.vision_mission.vision.title}</h3>
            <p className="text-gray-500 font-medium leading-relaxed group-hover:text-white/70 transition-all">{dict.vision_mission.vision.desc}</p>
          </div>
          <div className="p-12 rounded-[3.5rem] bg-white border border-primary/5 shadow-2xl space-y-8 group hover:bg-secondary transition-all duration-700">
            <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center text-white group-hover:bg-white group-hover:text-secondary transition-all shadow-[0_20px_40px_-10px_rgba(122,54,59,0.3)]"><Star size={40} /></div>
            <h3 className="text-3xl font-black text-primary group-hover:text-white transition-colors">{dict.about.goals.title}</h3>
            <ul className="space-y-4 text-gray-500 group-hover:text-white/70 transition-all">
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
                  <h2 className="text-2xl md:text-5xl font-black text-white leading-tight">{isRtl ? "شريككم اللوجستي الموثوق في المملكة" : "Your Trusted Logistics Partner in the Kingdom"}</h2>
                  <p className="text-lg text-white/80 font-medium leading-relaxed">{isRtl ? "منذ تأسيسنا، ونحن نضع رضا العملاء هدفاً أسمى، والالتزام سراً لنجاحنا. نمتلك اليوم أسطولاً مجهزاً بأحدث التقنيات لنقل كافة أنواع المنقولات بكفاءة واحترافية." : "Since our founding, we have put customer satisfaction as a supreme goal, and commitment as the secret of our success. Today, we have a fleet equipped with the latest technologies to transport all types of cargo efficiently and professionally."}</p>
               </div>
               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <Award size={32} className="text-[#C1922C]" />
                     <h4 className="font-black text-white">{isRtl ? "الموثوقية" : "Reliability"}</h4>
                     <p className="text-base text-white/80">{isRtl ? "نلتزم بأعلى معايير الأمان الدولية في كافة عملياتنا." : "We adhere to the highest international safety standards in all our operations."}</p>
                  </div>
                  <div className="space-y-2">
                     <Users size={32} className="text-[#C1922C]" />
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
      {/* Fleet Gallery - uncomment when photos are added to /public/fleet/
      <FleetGallery isRtl={isRtl} />
      */}

      {/* Partners */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14 space-y-4">
            <h2 className="text-2xl md:text-5xl font-black text-primary tracking-tighter leading-none">{isRtl ? "شركاؤنا" : "Our Partners"}</h2>
            <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">{isRtl ? "نفتخر بشراكاتنا الاستراتيجية مع كبرى الشركات الرائدة" : "Proud of our strategic partnerships with leading companies"}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
            {[
              { name: "Saudi Al-Terais", src: "/partners/al-terais.jpeg" },
              { name: "JAL Development", src: "/partners/jal.jpeg" },
            ].map((partner) => (
              <div key={partner.name} className="h-32 rounded-2xl flex items-center justify-center p-5">
                <div className="relative w-full h-full">
                  <Image src={partner.src} alt={partner.name} fill className="object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14 space-y-4">
            <h2 className="text-2xl md:text-5xl font-black text-primary tracking-tighter leading-none">{dict.clients.title}</h2>
            <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">{dict.clients.subtitle}</p>
          </div>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {[
              { name: "SABIC", src: "/clients/sabic.jpeg" },
              { name: "SAPAC", src: "/clients/sapac.jpeg" },
              { name: "T. Nagadi", src: "/clients/nagadi.jpeg" },
              { name: "Tawuniya", src: "/clients/tawuniya.jpeg" },
              { name: "Qassim Cement", src: "/clients/qassim-cement.jpeg" },
              { name: "Saudi HEPCO", src: "/clients/hepco.jpeg" },
              { name: "Energya Steel", src: "/clients/energya.jpeg" },
              { name: "Al-Ittefaq Steel", src: "/clients/al-ittefaq.jpeg" },
            ].map((client) => (
              <div key={client.name} className="w-40 h-24 rounded-2xl flex items-center justify-center p-4">
                <div className="relative w-full h-full">
                  <Image src={client.src} alt={client.name} fill className="object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
