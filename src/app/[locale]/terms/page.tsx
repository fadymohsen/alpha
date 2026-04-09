import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "الشروط والأحكام | شركة ألفا للنقل المحدودة" : "Terms & Conditions | ALFA TRANS, CO.LTD",
    description: isAr
      ? "الشروط والأحكام لخدمات النقل واللوجستيات المقدمة من شركة ألفا للنقل المحدودة"
      : "Terms and Conditions for transport and logistics services provided by ALFA TRANS, CO.LTD",
  };
}

export default async function TermsPage({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const isRtl = locale === "ar";

  const sections = isRtl
    ? [
        {
          title: "١. القبول بالشروط",
          content:
            "باستخدامكم لخدمات شركة ألفا للنقل المحدودة (سجل تجاري رقم: 2511010026) أو موقعها الإلكتروني، فإنكم توافقون على الالتزام بهذه الشروط والأحكام. تسري هذه الشروط على جميع خدمات النقل البري وتوزيع الأسمنت السائب والخدمات اللوجستية المقدمة من الشركة. في حال عدم الموافقة على هذه الشروط، يرجى عدم استخدام خدماتنا.",
        },
        {
          title: "٢. نطاق الخدمات",
          content:
            "تقدم شركة ألفا للنقل المحدودة خدمات النقل البري للبضائع والمواد، وتوزيع الأسمنت السائب، والحلول اللوجستية المتكاملة داخل المملكة العربية السعودية. تخضع جميع الخدمات لنظام النقل العام ولائحته التنفيذية الصادرة عن هيئة النقل العام (الهيئة العامة للنقل) في المملكة العربية السعودية.",
        },
        {
          title: "٣. التزامات العميل",
          content:
            "يلتزم العميل بتقديم معلومات دقيقة وكاملة عن البضائع المراد نقلها بما في ذلك الوزن والطبيعة والقيمة. كما يلتزم بضمان أن البضائع لا تتضمن مواد محظورة أو مخالفة للأنظمة السعودية. يتحمل العميل مسؤولية التغليف المناسب للبضائع وفقاً لمتطلبات النقل، ويلتزم بسداد المستحقات المالية وفقاً للشروط المتفق عليها.",
        },
        {
          title: "٤. المسؤولية والتعويض",
          content:
            "تلتزم شركة ألفا للنقل المحدودة ببذل العناية اللازمة في نقل البضائع. تكون مسؤولية الشركة محدودة وفقاً لنظام النقل العام في المملكة العربية السعودية. لا تتحمل الشركة المسؤولية عن الأضرار الناتجة عن القوة القاهرة أو الظروف الخارجة عن سيطرتها أو عيوب في البضائع ذاتها أو تقصير العميل في التغليف أو تقديم المعلومات. يجب تقديم أي مطالبة بالتعويض خلال ثلاثين (30) يوماً من تاريخ التسليم.",
        },
        {
          title: "٥. الأسعار والدفع",
          content:
            "تحدد أسعار الخدمات بناءً على عروض الأسعار المقدمة أو العقود المبرمة. جميع الأسعار بالريال السعودي وتشمل أو تستثني ضريبة القيمة المضافة حسب ما هو موضح في الفاتورة. يلتزم العميل بالسداد وفقاً لشروط الدفع المتفق عليها. قد يترتب على التأخر في السداد رسوم تأخير وفقاً للأنظمة المعمول بها.",
        },
        {
          title: "٦. القوة القاهرة",
          content:
            "لا تتحمل الشركة المسؤولية عن أي تأخير أو إخفاق في تنفيذ التزاماتها نتيجة ظروف القوة القاهرة، بما في ذلك على سبيل المثال لا الحصر: الكوارث الطبيعية، والأوبئة، والقرارات الحكومية، والإضرابات، وإغلاق الطرق، والظروف الجوية القاسية.",
        },
        {
          title: "٧. القانون الواجب التطبيق وحل النزاعات",
          content:
            "تخضع هذه الشروط والأحكام لأنظمة المملكة العربية السعودية. في حال نشوء أي نزاع يتعلق بهذه الشروط أو الخدمات المقدمة، يسعى الطرفان إلى حله ودياً. وفي حال تعذر ذلك، يُحال النزاع إلى الجهات القضائية المختصة في مدينة الرياض، المملكة العربية السعودية.",
        },
        {
          title: "٨. تعديل الشروط والأحكام",
          content:
            "تحتفظ شركة ألفا للنقل المحدودة بحق تعديل هذه الشروط والأحكام في أي وقت. سيتم نشر أي تعديلات على موقعنا الإلكتروني، ويعتبر استمراركم في استخدام خدماتنا بعد النشر موافقة على الشروط المعدلة. للتواصل: البريد الإلكتروني: alfa.ex@hotmail.com | الهاتف: 0114152675.",
        },
      ]
    : [
        {
          title: "1. Acceptance of Terms",
          content:
            "By using the services of ALFA TRANS, CO.LTD (CR: 2511010026) or its website, you agree to be bound by these Terms and Conditions. These terms apply to all land transport, bulk cement distribution, and logistics services provided by the company. If you do not agree to these terms, please refrain from using our services.",
        },
        {
          title: "2. Scope of Services",
          content:
            "ALFA TRANS, CO.LTD provides land freight transport services, bulk cement distribution, and integrated logistics solutions within the Kingdom of Saudi Arabia. All services are subject to the General Transport Law and its implementing regulations issued by the Transport General Authority (TGA) of the Kingdom of Saudi Arabia.",
        },
        {
          title: "3. Client Obligations",
          content:
            "The client is obligated to provide accurate and complete information about the goods to be transported, including weight, nature, and value. The client must ensure that goods do not include prohibited materials or items in violation of Saudi regulations. The client bears responsibility for appropriate packaging of goods according to transport requirements and is committed to settling financial obligations in accordance with the agreed terms.",
        },
        {
          title: "4. Liability and Compensation",
          content:
            "ALFA TRANS, CO.LTD undertakes to exercise due care in transporting goods. The company's liability is limited in accordance with the General Transport Law of the Kingdom of Saudi Arabia. The company shall not be liable for damages resulting from force majeure, circumstances beyond its control, defects in the goods themselves, or the client's failure in packaging or providing information. Any compensation claim must be submitted within thirty (30) days from the delivery date.",
        },
        {
          title: "5. Pricing and Payment",
          content:
            "Service prices are determined based on provided quotations or executed contracts. All prices are in Saudi Riyals (SAR) and include or exclude Value Added Tax (VAT) as indicated on the invoice. The client is committed to payment in accordance with the agreed payment terms. Late payment may result in delay charges in accordance with applicable regulations.",
        },
        {
          title: "6. Force Majeure",
          content:
            "The company shall not be held liable for any delay or failure in fulfilling its obligations as a result of force majeure circumstances, including but not limited to: natural disasters, pandemics, government orders, strikes, road closures, and severe weather conditions.",
        },
        {
          title: "7. Governing Law and Dispute Resolution",
          content:
            "These Terms and Conditions are governed by the laws of the Kingdom of Saudi Arabia. In the event of any dispute arising from these terms or the services provided, both parties shall seek amicable resolution. If this is not possible, the dispute shall be referred to the competent judicial authorities in Riyadh, Kingdom of Saudi Arabia.",
        },
        {
          title: "8. Amendments",
          content:
            "ALFA TRANS, CO.LTD reserves the right to modify these Terms and Conditions at any time. Any amendments will be published on our website, and your continued use of our services after publication constitutes acceptance of the modified terms. Contact: Email: alfa.ex@hotmail.com | Phone: 0114152675.",
        },
      ];

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="pt-32">
      {/* Hero Section */}
      <section className="bg-primary py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {isRtl ? "الشروط والأحكام" : "Terms & Conditions"}
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            {isRtl
              ? "آخر تحديث: يناير 2025"
              : "Last Updated: January 2025"}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-10">
            {sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-gray-400 text-xs text-center">
              {isRtl
                ? "شركة ألفا للنقل المحدودة | سجل تجاري: 2511010026 | الرياض، المملكة العربية السعودية"
                : "ALFA TRANS, CO.LTD | CR: 2511010026 | Riyadh, Kingdom of Saudi Arabia"}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
