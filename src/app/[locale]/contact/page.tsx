import { getDictionary } from "@/i18n/get-dictionary";
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";

export default async function ContactPage({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as any);
  const isRtl = locale === "ar";
  
  return (
    <main className="flex-grow pt-32 pb-24">
      <section className="bg-primary py-24 text-center relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
         </div>
         <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-4">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">{dict.contact.title}</h1>
            <p className="text-lg text-white/50 font-medium leading-relaxed max-w-2xl mx-auto">{dict.footer.slogan}</p>
         </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-6 text-start">
          <div className="p-8 bg-white rounded-[2.5rem] shadow-2xl border border-primary/5 space-y-8">
             <div className="space-y-6">
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-primary flex-shrink-0 shadow-lg"><MapPin size={24} /></div>
                   <div className="space-y-0.5">
                      <p className="font-black text-lg text-primary">{dict.contact.info.hq}</p>
                      <p className="text-gray-500 font-medium text-sm leading-relaxed">{dict.contact.info.address}</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0 shadow-lg"><Phone size={24} /></div>
                   <div className="space-y-0.5">
                      <p className="font-black text-lg text-primary">{dict.contact.info.call}</p>
                      <p className="text-gray-500 font-medium text-sm leading-relaxed" dir="ltr">{dict.contact.info.phones}</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary flex-shrink-0 shadow-lg"><Mail size={24} /></div>
                   <div className="space-y-0.5">
                      <p className="font-black text-lg text-primary">{dict.contact.info.email_us}</p>
                      <p className="text-gray-500 font-medium text-sm leading-relaxed">{dict.contact.info.email}</p>
                   </div>
                </div>
             </div>
             <div className="pt-6 border-t border-primary/5">
                <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[10px]">
                   <Clock size={14} className="text-accent" />
                   <span>{dict.contact.info.working_hours}</span>
                </div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <form className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-primary/5 space-y-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 text-primary opacity-[0.03] pointer-events-none transform -rotate-12 translate-x-10 -translate-y-10 font-black text-7xl">ALFA</div>
             <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-primary/50 px-2">{dict.contact.form.name}</label>
                   <input type="text" className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-4 ring-primary/5 transition-all text-sm font-medium" placeholder={dict.contact.form.name_placeholder} />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-primary/50 px-2">{dict.contact.form.email}</label>
                   <input type="email" className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-4 ring-primary/5 transition-all text-sm font-medium text-start" placeholder={dict.contact.form.email_placeholder} />
                </div>
             </div>
             <div className="relative z-10 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary/50 px-2">{dict.contact.form.message}</label>
                <textarea rows={5} className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-4 ring-primary/5 transition-all text-sm font-medium resize-none" placeholder={dict.contact.form.message_placeholder}></textarea>
             </div>
             <button className="relative z-10 w-full group overflow-hidden bg-primary text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl flex items-center justify-center gap-4">
                <div className="absolute inset-0 bg-accent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-3"><Send size={18} className={isRtl ? "rotate-180" : ""} /> {dict.contact.form.submit}</span>
             </button>
          </form>
        </div>
      </div>
    </main>
  );
}
