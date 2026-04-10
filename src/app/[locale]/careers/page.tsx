import type { Metadata } from "next";
import CareersContent from "./careers-content";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "الوظائف" : "Careers",
    description: isAr
      ? "انضم لفريق شركة ألفا للنقل المحدودة. فرص عمل في النقل واللوجستيات في المملكة العربية السعودية."
      : "Join the ALFA TRANS team. Career opportunities in transport and logistics across Saudi Arabia.",
  };
}

export default function CareersPage({ params: { locale } }: { params: { locale: string } }) {
  return <CareersContent locale={locale} />;
}
