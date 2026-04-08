// This script can be run to populate the Neon DB
// Usage: node seed.js (with DATABASE_URL in env)

const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log("🌱 Seeding ALFA TRANS Database...");

  try {
    // Seed Services
    await sql`
      INSERT INTO services (id, title_ar, title_en, desc_ar, desc_en)
      VALUES 
      ('1', 'النقل البري للبضائع', 'General Cargo', 'خدمات نقل البضائع العامة والطرود والشحنات التجارية عبر أسطولنا المنتشر في كافة أنحاء المملكة.', 'We provide general cargo, parcel, and commercial shipment transport services across our fleet throughout the Kingdom.'),
      ('2', 'نقل المعدات الثقيلة', 'Heavy Equipment', 'متخصصون في نقل الآلات والمعدات الإنشائية والصناعية الضخمة باستخدام شاحنات مخصصة للأوزان الثقيلة.', 'Specialists in transporting large construction and industrial machinery using trucks designated for heavy weights.')
      ON CONFLICT (id) DO NOTHING;
    `;

    // Seed Careers
    await sql`
      INSERT INTO careers (id, title_ar, title_en, location_ar, location_en, req_ar, req_en)
      VALUES 
      ('1', 'سائق نقل ثقيل', 'Heavy Transport Driver', 'الرياض، المملكة العربية السعودية', 'Riyadh, KSA', 'رخصة قيادة نقل ثقيل سارية المفعول، خبرة لا تقل عن 3 سنوات.', 'Valid heavy transport license, minimum 3 years experience.'),
      ('2', 'منسق عمليات لوجستية', 'Logistics Coordinator', 'الرياض، المنطقة الصناعية', 'Riyadh, Industrial Area', 'درجة جامعية في التخصصات الإدارية، إجادة استخدام أنظمة التتبع.', 'University degree, proficiency in tracking systems.')
      ON CONFLICT (id) DO NOTHING;
    `;

    console.log("✅ Seeding completed! Professional Arabic content is live.");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
}

seed();
