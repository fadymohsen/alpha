import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "سياسة الاسترجاع | شركة ألفا للنقل المحدودة" : "Refund Policy | ALFA TRANS, CO.LTD",
    description: isAr
      ? "سياسة الاسترجاع والإلغاء لخدمات النقل واللوجستيات من شركة ألفا للنقل المحدودة"
      : "Refund and cancellation policy for transport and logistics services by ALFA TRANS, CO.LTD",
  };
}

export default async function RefundPage({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const isRtl = locale === "ar";

  const sections = isRtl
    ? [
        {
          title: "١. نطاق السياسة",
          content:
            "تحدد سياسة الاسترجاع هذه الشروط والإجراءات المتعلقة باسترداد المبالغ المدفوعة وإلغاء الخدمات لدى شركة ألفا للنقل المحدودة (سجل تجاري رقم: 2511010026). تنطبق هذه السياسة على جميع خدمات النقل البري وتوزيع الأسمنت السائب والخدمات اللوجستية، وذلك وفقاً لنظام التجارة الإلكترونية ونظام حماية المستهلك في المملكة العربية السعودية.",
        },
        {
          title: "٢. إلغاء الخدمة قبل التنفيذ",
          content:
            "يحق للعميل إلغاء طلب الخدمة قبل بدء التنفيذ والحصول على استرداد كامل للمبلغ المدفوع. يجب تقديم طلب الإلغاء كتابياً عبر البريد الإلكتروني أو القنوات الرسمية المعتمدة. في حال تم الإلغاء بعد تخصيص المركبات أو البدء في الترتيبات اللوجستية، قد يتم خصم رسوم إدارية لا تتجاوز 15% من قيمة الخدمة لتغطية التكاليف التشغيلية المتكبدة.",
        },
        {
          title: "٣. إلغاء الخدمة بعد بدء التنفيذ",
          content:
            "في حال طلب العميل إلغاء الخدمة بعد بدء تنفيذها (مثل تحميل البضائع أو انطلاق المركبة)، يتم احتساب التكاليف الفعلية المتكبدة وخصمها من المبلغ المسترد. تشمل هذه التكاليف: أجور النقل المقطوعة، ورسوم التحميل والتفريغ، والتكاليف الإدارية. سيتم إبلاغ العميل بتفصيل التكاليف المحتسبة قبل إتمام عملية الاسترداد.",
        },
        {
          title: "٤. حالات الاسترداد الكامل",
          content:
            "يحق للعميل الحصول على استرداد كامل في الحالات التالية: عدم تقديم الخدمة من جانب الشركة دون مبرر مقبول، أو وجود خطأ جوهري في تنفيذ الخدمة يعود لتقصير الشركة، أو الإلغاء من جانب الشركة لأسباب تشغيلية داخلية. يتم معالجة طلبات الاسترداد الكامل خلال خمسة عشر (15) يوم عمل من تاريخ الموافقة.",
        },
        {
          title: "٥. حالات عدم الأهلية للاسترداد",
          content:
            "لا يحق الاسترداد في الحالات التالية: التأخير الناتج عن ظروف القوة القاهرة (كوارث طبيعية، إغلاق طرق، قرارات حكومية)، أو الأضرار الناتجة عن عيوب في التغليف من جانب العميل، أو تقديم معلومات غير صحيحة عن البضائع من قبل العميل، أو الخدمات التي تم تنفيذها بالكامل وفقاً للاتفاق.",
        },
        {
          title: "٦. إجراءات تقديم طلب الاسترداد",
          content:
            "لتقديم طلب استرداد، يجب على العميل التواصل مع الشركة عبر البريد الإلكتروني: alfa.ex@hotmail.com أو الهاتف: 0114152675 مع توضيح رقم الطلب وسبب الاسترداد. سيتم مراجعة الطلب خلال خمسة (5) أيام عمل وإبلاغ العميل بالقرار. يجب تقديم طلب الاسترداد خلال أربعة عشر (14) يوماً من تاريخ تقديم الخدمة أو التاريخ المقرر لها.",
        },
        {
          title: "٧. طريقة الاسترداد",
          content:
            "يتم استرداد المبالغ بنفس طريقة الدفع الأصلية. في حال الدفع عبر التحويل البنكي، يتم الاسترداد إلى نفس الحساب المصرفي. قد تستغرق عملية الاسترداد من سبعة (7) إلى واحد وعشرين (21) يوم عمل حسب الجهة المصرفية. يتم إصدار إشعار خصم ضريبي وفقاً لمتطلبات هيئة الزكاة والضريبة والجمارك.",
        },
        {
          title: "٨. التواصل والشكاوى",
          content:
            "في حال عدم الرضا عن قرار الاسترداد، يحق للعميل تقديم شكوى رسمية عبر قنوات التواصل المعتمدة. تلتزم الشركة بمراجعة الشكاوى والرد عليها خلال عشرة (10) أيام عمل. كما يحق للعميل التقدم بشكوى لدى وزارة التجارة أو الجهات المختصة في المملكة العربية السعودية. للتواصل: البريد الإلكتروني: alfa.ex@hotmail.com | الهاتف: 0114152675 | العنوان: الرياض، المملكة العربية السعودية.",
        },
      ]
    : [
        {
          title: "1. Scope of Policy",
          content:
            "This Refund Policy outlines the terms and procedures relating to refunds and cancellation of services at ALFA TRANS, CO.LTD (CR: 2511010026). This policy applies to all land transport, bulk cement distribution, and logistics services, in accordance with the E-Commerce Law and Consumer Protection Law of the Kingdom of Saudi Arabia.",
        },
        {
          title: "2. Cancellation Before Service Execution",
          content:
            "The client has the right to cancel a service order before execution commences and receive a full refund of the amount paid. The cancellation request must be submitted in writing via email or through official approved channels. If cancellation occurs after vehicles have been allocated or logistics arrangements have begun, an administrative fee not exceeding 15% of the service value may be deducted to cover incurred operational costs.",
        },
        {
          title: "3. Cancellation After Service Commencement",
          content:
            "If the client requests cancellation after service execution has begun (such as loading of goods or vehicle departure), the actual costs incurred will be calculated and deducted from the refunded amount. These costs include: transport charges for distance covered, loading and unloading fees, and administrative costs. The client will be informed of the itemized costs before the refund is processed.",
        },
        {
          title: "4. Full Refund Eligibility",
          content:
            "The client is entitled to a full refund in the following cases: failure to provide the service by the company without acceptable justification, a material error in service execution attributable to the company, or cancellation by the company due to internal operational reasons. Full refund requests are processed within fifteen (15) business days from the date of approval.",
        },
        {
          title: "5. Non-Refundable Cases",
          content:
            "Refunds are not applicable in the following situations: delays caused by force majeure circumstances (natural disasters, road closures, government orders), damages resulting from inadequate packaging by the client, provision of inaccurate information about goods by the client, or services that have been fully executed in accordance with the agreement.",
        },
        {
          title: "6. Refund Request Procedure",
          content:
            "To submit a refund request, the client must contact the company via email at alfa.ex@hotmail.com or phone at 0114152675, specifying the order number and reason for the refund. The request will be reviewed within five (5) business days and the client will be notified of the decision. Refund requests must be submitted within fourteen (14) days from the service date or its scheduled date.",
        },
        {
          title: "7. Refund Method",
          content:
            "Refunds are issued using the same original payment method. For bank transfer payments, the refund is returned to the same bank account. The refund process may take seven (7) to twenty-one (21) business days depending on the banking institution. A tax credit note will be issued in accordance with the requirements of the Zakat, Tax and Customs Authority (ZATCA).",
        },
        {
          title: "8. Communication and Complaints",
          content:
            "If the client is not satisfied with the refund decision, they have the right to file a formal complaint through the approved communication channels. The company is committed to reviewing and responding to complaints within ten (10) business days. The client also has the right to file a complaint with the Ministry of Commerce or relevant authorities in the Kingdom of Saudi Arabia. Contact: Email: alfa.ex@hotmail.com | Phone: 0114152675 | Address: Riyadh, Kingdom of Saudi Arabia.",
        },
      ];

  return (
    <main dir={isRtl ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="bg-primary py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {isRtl ? "سياسة الاسترجاع" : "Refund Policy"}
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
