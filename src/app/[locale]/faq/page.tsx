import { getDictionary } from "@/i18n/get-dictionary";

export default async function FAQPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const dict = await getDictionary(locale as any);
  const isRtl = locale === "ar";
  
  return (
    <main className="flex-grow pt-32 pb-24">
      <section className="bg-slate-50 py-32 text-center mb-16 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -skew-y-6 transform translate-y-12" />
         <h1 className="text-5xl md:text-8xl font-black text-primary mb-6 relative z-10">{dict.nav.faq}</h1>
      </section>
      <div className="max-w-4xl mx-auto px-6 space-y-6">
        {dict.faq.list.map((item: any, i: number) => (
          <div key={i} className="p-10 rounded-[3rem] bg-white border border-primary/5 shadow-xl transition-all hover:border-accent">
            <h3 className="text-2xl font-black text-primary mb-6 flex gap-6 items-center">
               <span className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-primary text-sm font-black shadow-lg flex-shrink-0">
                 {isRtl ? "س" : "Q"}
               </span>
               {item.q}
            </h3>
            <div className="border-e-4 border-slate-100 pe-10">
               <p className="text-gray-500 font-medium leading-relaxed italic">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
