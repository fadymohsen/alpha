import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
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

export const dynamic = "force-dynamic";

const fallbackJobs = {
  ar: [
    { title: "سائق نقل ثقيل", type: "دوام كامل", location: "الرياض" },
    { title: "مشرف لوجستي", type: "دوام كامل", location: "جدة" },
    { title: "منسق سلاسل إمداد", type: "دوام كامل", location: "الدمام" },
  ],
  en: [
    { title: "Heavy Truck Driver", type: "Full Time", location: "Riyadh" },
    { title: "Logistics Supervisor", type: "Full Time", location: "Jeddah" },
    { title: "Supply Chain Coordinator", type: "Full Time", location: "Dammam" },
  ],
};

export default async function CareersPage({ params: { locale } }: { params: { locale: string } }) {
  const isRtl = locale === "ar";
  const careers = await prisma.career.findMany({ orderBy: { createdAt: "desc" } });

  const jobs = careers.length > 0
    ? careers.map((c) => ({
        title: isRtl ? c.title_ar : c.title_en,
        type: isRtl ? "دوام كامل" : "Full Time",
        location: isRtl ? c.location_ar : c.location_en,
      }))
    : fallbackJobs[isRtl ? "ar" : "en"];

  return <CareersContent locale={locale} jobs={jobs} />;
}
