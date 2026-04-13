import { Tajawal, Cairo } from "next/font/google";
import { locales, rtlLocales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { DictionaryProvider } from "@/i18n/dictionary-provider";
import { SiteShell } from "@/components/site-shell";
import { SettingsProvider } from "@/lib/settings-context";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/gtm";
import type { Metadata } from "next";
import "@/app/globals.css";

const tajawal = Tajawal({ subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-tajawal" });
const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-cairo" });

export async function generateStaticParams() { return locales.map((locale) => ({ locale })); }

const siteUrl = "https://alfatransport.sa";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const isAr = locale === "ar";

  const title = isAr
    ? "شركة الفا للنقل المحدودة | شركه الفا للنقل | ألفا للنقل | حلول لوجستية متكاملة"
    : "ALFA TRANS, CO.LTD | Alfa Transport | Integrated Logistics Solutions";
  const description = isAr
    ? "شركة الفا للنقل المحدودة (شركه الفا للنقل - ألفا للنقل) - رائدة في النقل البري وتوزيع الاسمنت السائب والنقل الدولي في المملكة العربية السعودية. أكثر من 17 عاماً من الخبرة في حلول النقل واللوجستيات المتكاملة. خدمات نقل بري متخصص، فحص وسلامة الشحنات، ونقل دولي لدول الخليج."
    : "ALFA TRANS (Alfa Transport) - A pioneer in land transport, bulk cement distribution, and international shipping in Saudi Arabia. Over 17 years of experience in integrated transport and logistics solutions. Specialized land transport, cargo safety inspection, and Gulf countries shipping.";

  const keywords = isAr
    ? ["الفا للنقل", "ألفا للنقل", "شركة الفا للنقل", "شركه الفا للنقل", "شركة ألفا للنقل المحدودة", "شركه الفا للنقل المحدودة", "الفا للنقل المحدودة", "نقل بري", "نقل بري السعودية", "توزيع اسمنت سائب", "شركة نقل", "شركة نقل بري", "لوجستيات السعودية", "نقل دولي", "فحص الشحنات", "نقل بضائع", "شركة شحن"]
    : ["alfa trans", "alfa transport", "alfa transport saudi", "land transport saudi arabia", "bulk cement distribution", "logistics company saudi", "cargo safety", "international shipping ksa", "freight transport"];

  return {
    title: {
      default: title,
      template: isAr ? "%s | شركة الفا للنقل" : "%s | ALFA TRANS",
    },
    description,
    keywords,
    metadataBase: new URL(siteUrl),
    icons: {
      icon: "/logo-transperent.png",
      apple: "/logo-transperent.png",
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}`,
      siteName: isAr ? "شركة الفا للنقل المحدودة" : "ALFA TRANS, CO.LTD",
      images: [
        {
          url: "/logo.jpeg",
          width: 800,
          height: 800,
          alt: isAr ? "شركة الفا للنقل - ألفا للنقل المحدودة" : "ALFA TRANS - Alfa Transport Company",
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
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TransportCompany",
              name: "شركة الفا للنقل المحدودة - ALFA TRANS",
              alternateName: ["الفا للنقل", "ألفا للنقل", "شركه الفا للنقل", "شركة الفا للنقل", "Alfa Transport", "ALFA TRANS CO LTD"],
              url: "https://alfatransport.sa",
              logo: "https://alfatransport.sa/logo.jpeg",
              description: "شركة الفا للنقل المحدودة - رائدة في النقل البري وتوزيع الاسمنت السائب والنقل الدولي في المملكة العربية السعودية",
              foundingDate: "2007",
              address: {
                "@type": "PostalAddress",
                streetAddress: "طريق مكة المكرمة، حي الربوة",
                addressLocality: "الرياض",
                addressRegion: "الرياض",
                postalCode: "12821",
                addressCountry: "SA",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 24.706114,
                longitude: 46.749271,
              },
              telephone: "+966557746126",
              email: "Info@alfatransport.sa",
              areaServed: [
                { "@type": "Country", name: "Saudi Arabia" },
                { "@type": "Place", name: "Gulf Countries" },
              ],
              serviceType: [
                "النقل البري المتخصص",
                "توزيع الاسمنت السائب",
                "حلول النقل الدولي",
                "فحص وسلامة الشحنات",
              ],
              numberOfEmployees: { "@type": "QuantitativeValue", value: 200 },
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <GoogleTagManagerNoscript />
        <DictionaryProvider dictionary={dict}>
          <SettingsProvider>
           <SiteShell locale={locale}>
             {children}
           </SiteShell>
          </SettingsProvider>
        </DictionaryProvider>
      </body>
    </html>
  );
}
