import { getDictionary } from "@/i18n/get-dictionary";
import { Send, MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export default async function ContactPage({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as any);
  const isRtl = locale === "ar";

  return (
    <main className="flex-grow pt-32 pb-16">
      <section className="bg-primary py-24 text-center relative overflow-hidden">
         <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-4">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">{dict.contact.title}</h1>
            <p className="text-lg text-white/70 font-medium leading-relaxed max-w-2xl mx-auto">{dict.footer.slogan}</p>
         </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Info Card */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-primary/5 space-y-8">
          <h3 className="text-2xl font-black text-primary">{dict.contact.info.hq}</h3>
          <div className="space-y-5">
            <a href="tel:0114152675" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-secondary" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-0.5">{dict.contact.info.call}</p>
                <p className="text-primary font-bold text-sm group-hover:text-secondary transition-colors" dir="ltr">0114152675</p>
              </div>
            </a>
            <a href="https://wa.me/966555955056" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle size={20} className="text-secondary" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-0.5">WhatsApp</p>
                <p className="text-primary font-bold text-sm group-hover:text-secondary transition-colors" dir="ltr">0555955056</p>
              </div>
            </a>
            <a href="mailto:alfa.ex@hotmail.com" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-secondary" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-0.5">{dict.contact.info.email_us}</p>
                <p className="text-primary font-bold text-sm group-hover:text-secondary transition-colors">alfa.ex@hotmail.com</p>
              </div>
            </a>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-secondary" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-0.5">{dict.contact.info.hq}</p>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">{dict.contact.info.address}</p>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-primary/5">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">{dict.contact.info.working_hours}</p>
          </div>
        </div>

        {/* Contact Form Card */}
        <form className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-primary/5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-primary/50 px-2">{dict.contact.form.name}</label>
              <input type="text" className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-4 ring-primary/5 transition-all text-sm font-medium" placeholder={dict.contact.form.name_placeholder} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-primary/50 px-2">{dict.contact.form.email}</label>
              <input type="email" className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-4 ring-primary/5 transition-all text-sm font-medium text-start" placeholder={dict.contact.form.email_placeholder} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-primary/50 px-2">{dict.contact.form.message}</label>
            <textarea rows={5} className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-4 ring-primary/5 transition-all text-sm font-medium resize-none" placeholder={dict.contact.form.message_placeholder}></textarea>
          </div>
          <button className="w-full group relative overflow-hidden bg-primary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl flex items-center justify-center gap-4">
            <div className="absolute inset-0 bg-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
            <span className="relative z-10 flex items-center gap-3"><Send size={18} className={isRtl ? "rotate-180" : ""} /> {dict.contact.form.submit}</span>
          </button>
        </form>
      </div>
    </main>
  );
}
