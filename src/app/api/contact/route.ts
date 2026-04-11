import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = "info@alfatransport.sa";

export async function POST(req: Request) {
  try {
    const { name, email, message, type, jobTitle, phone, about } = await req.json();

    if (type === "career") {
      // Career application — notify admin
      await resend.emails.send({
        from: "ALFA TRANS <noreply@alfatransport.sa>",
        to: ADMIN_EMAIL,
        subject: `طلب توظيف جديد - ${jobTitle}`,
        html: `
          <div dir="rtl" style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
            <h2 style="color:#213B63;">طلب توظيف جديد</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px;font-weight:bold;color:#213B63;">الوظيفة:</td><td style="padding:8px;">${jobTitle}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#213B63;">الاسم:</td><td style="padding:8px;">${name}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#213B63;">الجوال:</td><td style="padding:8px;" dir="ltr">${phone}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#213B63;">البريد:</td><td style="padding:8px;" dir="ltr">${email}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#213B63;">نبذة:</td><td style="padding:8px;">${about}</td></tr>
            </table>
          </div>
        `,
      });

      // Confirmation to applicant
      await resend.emails.send({
        from: "ALFA TRANS <noreply@alfatransport.sa>",
        to: email,
        subject: "تم استلام طلبك - ALFA TRANS",
        html: `
          <div dir="rtl" style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
            <h2 style="color:#213B63;">شكراً لتقديمك، ${name}</h2>
            <p style="color:#555;line-height:1.8;">تم استلام طلب التوظيف الخاص بك لوظيفة <strong>${jobTitle}</strong> بنجاح. سيقوم فريقنا بمراجعة طلبك والتواصل معك في أقرب وقت.</p>
            <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
            <p style="color:#999;font-size:12px;">شركة ألفا للنقل المحدودة | ALFA TRANS, CO.LTD</p>
          </div>
        `,
      });
    } else {
      // Contact form — notify admin
      await resend.emails.send({
        from: "ALFA TRANS <noreply@alfatransport.sa>",
        to: ADMIN_EMAIL,
        subject: `رسالة جديدة من ${name}`,
        html: `
          <div dir="rtl" style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
            <h2 style="color:#213B63;">رسالة جديدة من نموذج التواصل</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px;font-weight:bold;color:#213B63;">الاسم:</td><td style="padding:8px;">${name}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#213B63;">البريد:</td><td style="padding:8px;" dir="ltr">${email}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#213B63;">الرسالة:</td><td style="padding:8px;">${message}</td></tr>
            </table>
          </div>
        `,
      });

      // Confirmation to sender
      await resend.emails.send({
        from: "ALFA TRANS <noreply@alfatransport.sa>",
        to: email,
        subject: "تم استلام رسالتك - ALFA TRANS",
        html: `
          <div dir="rtl" style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
            <h2 style="color:#213B63;">شكراً لتواصلك، ${name}</h2>
            <p style="color:#555;line-height:1.8;">تم استلام رسالتك بنجاح. سيقوم فريقنا بالرد عليك في أقرب وقت ممكن.</p>
            <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
            <p style="color:#999;font-size:12px;">شركة ألفا للنقل المحدودة | ALFA TRANS, CO.LTD</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email error:", error);
    return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 });
  }
}
