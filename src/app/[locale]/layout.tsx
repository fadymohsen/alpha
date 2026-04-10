import { Tajawal, Cairo } from "next/font/google";
import { locales, rtlLocales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { DictionaryProvider } from "@/i18n/dictionary-provider";
import { SiteShell } from "@/components/site-shell";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/gtm";
import type { Metadata } from "next";
import "@/app/globals.css";

const tajawal = Tajawal({ subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-tajawal" });
const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-cairo" });

export async function generateStaticParams() { return locales.map((locale) => ({ locale })); }

const siteUrl = "https://alpha-transportation.vercel.app";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const isAr = locale === "ar";

  const title = isAr
    ? "شركة ألفا للنقل المحدودة | حلول لوجستية متكاملة"
    : "ALFA TRANS, CO.LTD | Integrated Logistics Solutions";
  const description = isAr
    ? "شركة ألفا للنقل المحدودة رائدة في النقل البري وتوزيع الاسمنت السائب في المملكة العربية السعودية. حلول لوجستية متكاملة تدعم رؤية 2030."
    : "ALFA TRANS is a pioneer in land transport and bulk cement distribution in Saudi Arabia. Integrated logistics solutions supporting Vision 2030.";

  return {
    title: {
      default: title,
      template: isAr ? "%s | شركة ألفا للنقل" : "%s | ALFA TRANS",
    },
    description,
    metadataBase: new URL(siteUrl),
    icons: {
      icon: "/logo-transperent.png",
      apple: "/logo-transperent.png",
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}`,
      siteName: isAr ? "شركة ألفا للنقل المحدودة" : "ALFA TRANS, CO.LTD",
      images: [
        {
          url: "/logo.jpeg",
          width: 800,
          height: 800,
          alt: isAr ? "شركة ألفا للنقل" : "ALFA TRANS",
        },
      ],
      locale: isAr ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo.jpeg"],
    },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        ar: `${siteUrl}/ar`,
        en: `${siteUrl}/en`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const { locale } = params;
  const isRtl = rtlLocales.includes(locale as any);
  const dict = await getDictionary(locale as any);
  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"} className={`${tajawal.variable} ${cairo.variable}`}>
      <head>
        <GoogleTagManager />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <GoogleTagManagerNoscript />
        <DictionaryProvider dictionary={dict}>
           <SiteShell locale={locale}>
             {children}
           </SiteShell>
        </DictionaryProvider>
      </body>
    </html>
  );
}
