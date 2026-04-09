import { Tajawal, Cairo } from "next/font/google";
import { locales, rtlLocales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { DictionaryProvider } from "@/i18n/dictionary-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "@/app/globals.css";

const tajawal = Tajawal({ subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-tajawal" });
const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-cairo" });

export async function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export const metadata = {
  icons: {
    icon: "/logo-transperent.png",
    apple: "/logo-transperent.png",
  },
};

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const { locale } = params;
  const isRtl = rtlLocales.includes(locale as any);
  const dict = await getDictionary(locale as any);
  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"} className={`${tajawal.variable} ${cairo.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <DictionaryProvider dictionary={dict}>
           <Navbar locale={locale} />
           {children}
           <Footer />
        </DictionaryProvider>
      </body>
    </html>
  );
}
