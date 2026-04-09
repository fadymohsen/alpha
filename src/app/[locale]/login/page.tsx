"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, User, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage({ params: { locale } }: { params: { locale: string } }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isRtl = locale === "ar";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple logic for admin demo (as per previous context alfa2026/admin)
    if (username === "admin" && password === "alfa2026") {
      document.cookie = `is_admin=true; path=/; max-age=86400`;
      router.push(`/${locale}/admin`);
    } else {
      setError(isRtl ? "بيانات الدخول غير صحيحة" : "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 bg-white p-12 rounded-[4rem] shadow-2xl border border-primary/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 text-primary opacity-[0.03] pointer-events-none transform -rotate-12 translate-x-10 -translate-y-10 font-black text-9xl">ALFA</div>
        
        <div className="text-center space-y-6 relative z-10">
          <div className="relative w-24 h-24 mx-auto overflow-hidden rounded-3xl bg-white shadow-xl p-1 border border-primary/5">
             <Image src="/logo-transperent.png" alt="ALFA TRANS" fill className="object-contain" />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-primary tracking-tighter">{isRtl ? "دخول المشرفين" : "Admin Login"}</h2>
            <p className="text-gray-500 font-medium">{isRtl ? "يرجى إدخال بيانات الوصول الآمن" : "Please enter secure access credentials"}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10 pt-6">
          {error && <div className="p-4 bg-secondary/10 text-secondary text-sm font-bold rounded-2xl border border-secondary/20 text-center">{error}</div>}
          
          <div className="space-y-4">
            <div className="relative group">
               <User className="absolute top-1/2 -translate-y-1/2 left-6 text-gray-400 group-focus-within:text-accent transition-colors" size={20} />
               <input 
                 type="text" 
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                 className="w-full pl-16 pr-8 py-5 bg-slate-50 rounded-3xl outline-none focus:ring-4 ring-primary/5 transition-all font-medium" 
                 placeholder={isRtl ? "اسم المستخدم" : "Username"} 
               />
            </div>
            <div className="relative group">
               <Lock className="absolute top-1/2 -translate-y-1/2 left-6 text-gray-400 group-focus-within:text-accent transition-colors" size={20} />
               <input 
                 type="password" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full pl-16 pr-8 py-5 bg-slate-50 rounded-3xl outline-none focus:ring-4 ring-primary/5 transition-all font-medium" 
                 placeholder={isRtl ? "كلمة المرور" : "Password"} 
               />
            </div>
          </div>

          <button type="submit" className="w-full group relative overflow-hidden bg-primary text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.3em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl flex items-center justify-center gap-4">
            <div className="absolute inset-0 bg-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
            <span className="relative z-10 flex items-center gap-3">{isRtl ? "الدخول الآن" : "Login Now"} <ArrowRight size={20} className={isRtl ? "rotate-180" : ""} /></span>
          </button>
        </form>

        <div className="pt-10 flex items-center justify-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] opacity-20">
           <ShieldCheck size={16} />
           <span>Secure Corporate Access</span>
        </div>
      </div>
    </div>
  );
}
