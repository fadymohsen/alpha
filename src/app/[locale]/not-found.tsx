import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex-grow flex items-center justify-center min-h-[80vh] bg-white px-6 pt-32">
      <div className="text-center space-y-8 max-w-lg">
        <div className="relative w-24 h-24 mx-auto opacity-20">
          <Image src="/logo-transperent.png" alt="ALFA" fill className="object-contain" />
        </div>

        <div className="space-y-2">
          <h1 className="text-[10rem] font-black text-primary leading-none tracking-tighter">404</h1>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-black text-primary">
            Page Not Found
          </h2>
          <p className="text-gray-500 font-medium leading-relaxed">
            The page you are looking for might have been moved or doesn&apos;t exist. Let us get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/en"
            className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-primary/90 transition-all"
          >
            English Home
          </Link>
          <Link
            href="/ar"
            className="bg-secondary text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-secondary/90 transition-all"
          >
            الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </main>
  );
}
