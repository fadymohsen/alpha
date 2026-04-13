import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-grow flex items-center justify-center min-h-[90vh] bg-[#fafafa] px-6 pt-32 pb-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="text-center space-y-10 max-w-xl relative z-10">
        {/* Logo */}
        <div className="relative w-20 h-20 mx-auto opacity-10">
          <Image src="/logo-transperent.png" alt="ALFA" fill className="object-contain" />
        </div>

        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-[12rem] md:text-[16rem] font-black text-primary/5 leading-none tracking-tighter select-none">
            404
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7A363B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
                <path d="M8 11h6" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight">
              الصفحة غير موجودة
            </h2>
            <p className="text-base text-gray-400 font-medium max-w-sm mx-auto leading-relaxed">
              Page not found — the page you&apos;re looking for has been moved or doesn&apos;t exist
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 justify-center">
          <div className="w-12 h-0.5 bg-primary/10 rounded-full" />
          <div className="w-2 h-2 rounded-full bg-accent" />
          <div className="w-12 h-0.5 bg-primary/10 rounded-full" />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/ar"
            className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-all group shadow-lg shadow-primary/20"
          >
            <Home size={18} />
            الصفحة الرئيسية
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/en"
            className="flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-secondary hover:text-white transition-all group border border-primary/10 shadow-sm"
          >
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            English Home
          </Link>
        </div>
      </div>
    </main>
  );
}
