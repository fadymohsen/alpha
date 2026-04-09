import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "سياسة الخصوصية | شركة ألفا للنقل المحدودة" : "Privacy Policy | ALFA TRANS, CO.LTD",
    description: isAr
      ? "سياسة الخصوصية لشركة ألفا للنقل المحدودة - كيف نجمع ونستخدم ونحمي بياناتك الشخصية"
      : "Privacy Policy for ALFA TRANS, CO.LTD - How we collect, use, and protect your personal data",
  };
}

export default async function PrivacyPage({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const isRtl = locale === "ar";

  const sections = isRtl
    ? [
        {
          title: "١. المقدمة",
          content:
            "تلتزم شركة ألفا للنقل المحدودة (سجل تجاري رقم: 2511010026) بحماية خصوصية عملائها وشركائها وزوار موقعها الإلكتروني. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية المعلومات الشخصية التي نحصل عليها، وذلك وفقاً لنظام حماية البيانات الشخصية الصادر بالمرسوم الملكي رقم (م/19) في المملكة العربية السعودية.",
        },
        {
          title: "٢. المعلومات التي نجمعها",
          content:
            "نقوم بجمع المعلومات التالية عند تعاملكم معنا: الاسم الكامل ومعلومات الاتصال (رقم الهاتف والبريد الإلكتروني والعنوان)، وبيانات الشركة أو المؤسسة التجارية، وتفاصيل الشحنات والطلبات اللوجستية، وبيانات الدفع والفوترة، والمعلومات التقنية مثل عنوان IP ونوع المتصفح عند زيارة موقعنا الإلكتروني.",
        },
        {
          title: "٣. كيفية استخدام المعلومات",
          content:
            "نستخدم المعلومات التي نجمعها للأغراض التالية: تقديم خدمات النقل البري وتوزيع الأسمنت السائب والخدمات اللوجستية، ومعالجة الطلبات والعقود، والتواصل معكم بشأن خدماتنا وتحديثات الشحنات، والامتثال للمتطلبات القانونية والتنظيمية في المملكة العربية السعودية، وتحسين جودة خدماتنا وتجربة المستخدم.",
        },
        {
          title: "٤. حماية المعلومات",
          content:
            "نطبق إجراءات أمنية وتقنية وإدارية مناسبة لحماية معلوماتكم الشخصية من الوصول غير المصرح به أو الإفصاح أو التعديل أو الإتلاف. يتم تخزين البيانات في أنظمة آمنة ولا يصل إليها إلا الموظفون المصرح لهم فقط.",
        },
        {
          title: "٥. مشاركة المعلومات مع أطراف ثالثة",
          content:
            "لا نبيع أو نؤجر معلوماتكم الشخصية لأي طرف ثالث. قد نشارك المعلومات مع: الجهات الحكومية والتنظيمية في المملكة العربية السعودية عند الاقتضاء القانوني، ومقدمي الخدمات الذين يساعدوننا في تنفيذ عملياتنا اللوجستية (بموجب اتفاقيات سرية)، والشركاء التجاريين المشاركين في سلسلة التوريد لتنفيذ خدمات النقل.",
        },
        {
          title: "٦. حقوقكم",
          content:
            "وفقاً لنظام حماية البيانات الشخصية في المملكة العربية السعودية، يحق لكم: الوصول إلى بياناتكم الشخصية المحفوظة لدينا، وطلب تصحيح أو تحديث بياناتكم، وطلب حذف بياناتكم (مع مراعاة المتطلبات القانونية للاحتفاظ بالسجلات)، والاعتراض على معالجة بياناتكم في حالات معينة.",
        },
        {
          title: "٧. ملفات تعريف الارتباط (الكوكيز)",
          content:
            "يستخدم موقعنا الإلكتروني ملفات تعريف الارتباط لتحسين تجربة التصفح وتحليل حركة المرور على الموقع. يمكنكم التحكم في إعدادات ملفات تعريف الارتباط من خلال متصفحكم، علماً بأن تعطيلها قد يؤثر على بعض وظائف الموقع.",
        },
        {
          title: "٨. التواصل معنا",
          content:
            "لأي استفسارات تتعلق بسياسة الخصوصية أو لممارسة حقوقكم المتعلقة بالبيانات الشخصية، يرجى التواصل معنا عبر البريد الإلكتروني: alfa.ex@hotmail.com أو الهاتف: 0114152675. العنوان: الرياض، المملكة العربية السعودية.",
        },
      ]
    : [
        {
          title: "1. Introduction",
          content:
            "ALFA TRANS, CO.LTD (CR: 2511010026) is committed to protecting the privacy of our clients, partners, and website visitors. This Privacy Policy explains how we collect, use, and protect the personal information we obtain, in accordance with the Personal Data Protection Law (Royal Decree No. M/19) of the Kingdom of Saudi Arabia.",
        },
        {
          title: "2. Information We Collect",
          content:
            "We collect the following information when you interact with us: full name and contact details (phone number, email address, and physical address), company or business entity information, shipment and logistics order details, payment and billing data, and technical information such as IP address and browser type when visiting our website.",
        },
        {
          title: "3. How We Use Your Information",
          content:
            "We use the information we collect for the following purposes: providing land transport, bulk cement distribution, and logistics services; processing orders and contracts; communicating with you regarding our services and shipment updates; complying with legal and regulatory requirements in the Kingdom of Saudi Arabia; and improving the quality of our services and user experience.",
        },
        {
          title: "4. Data Protection",
          content:
            "We implement appropriate technical, security, and administrative measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. Data is stored in secure systems and is accessible only to authorized personnel.",
        },
        {
          title: "5. Third-Party Sharing",
          content:
            "We do not sell or rent your personal information to any third party. We may share information with: government and regulatory authorities in the Kingdom of Saudi Arabia as required by law, service providers who assist us in executing our logistics operations (under confidentiality agreements), and business partners involved in the supply chain for the fulfillment of transport services.",
        },
        {
          title: "6. Your Rights",
          content:
            "Under the Personal Data Protection Law of the Kingdom of Saudi Arabia, you have the right to: access your personal data held by us, request correction or updating of your data, request deletion of your data (subject to legal record-keeping requirements), and object to the processing of your data in certain circumstances.",
        },
        {
          title: "7. Cookies",
          content:
            "Our website uses cookies to enhance the browsing experience and analyze website traffic. You can control cookie settings through your browser, although disabling cookies may affect certain website functionalities.",
        },
        {
          title: "8. Contact Us",
          content:
            "For any inquiries regarding this Privacy Policy or to exercise your data rights, please contact us at email: alfa.ex@hotmail.com or phone: 0114152675. Address: Riyadh, Kingdom of Saudi Arabia.",
        },
      ];

  return (
    <main dir={isRtl ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="bg-primary py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {isRtl ? "سياسة الخصوصية" : "Privacy Policy"}
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
