import { NextRequest, NextResponse } from "next/server";

// ── Services ──
const SERVICES = [
  { ar: "توزيع الإسمنت السائب", en: "Liquid Cement Distribution" },
  { ar: "النقل البري المتخصص", en: "Specialized Land Transport" },
  { ar: "حلول النقل الدولي", en: "International Shipping Solutions" },
  { ar: "فحص وسلامة الشحنات", en: "Cargo Safety & Inspection" },
];

// ── Conversation State ──
type Step = "menu" | "ask_name" | "ask_location" | "ask_details" | "confirm";
interface ConversationState {
  step: Step;
  service?: number;
  name?: string;
  location?: string;
  details?: string;
  lastActivity: number;
}

const conversations = new Map<string, ConversationState>();
const STATE_TTL = 30 * 60 * 1000; // 30 min

function getState(phone: string): ConversationState {
  // Cleanup stale conversations
  const now = Date.now();
  for (const [key, val] of conversations) {
    if (now - val.lastActivity > STATE_TTL) conversations.delete(key);
  }
  return conversations.get(phone) || { step: "menu", lastActivity: now };
}

function setState(phone: string, state: Partial<ConversationState>) {
  const current = conversations.get(phone) || { step: "menu" as Step, lastActivity: Date.now() };
  conversations.set(phone, { ...current, ...state, lastActivity: Date.now() });
}

function clearState(phone: string) {
  conversations.delete(phone);
}

// ── WhatsApp Cloud API ──
async function sendMessage(to: string, text: string) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  if (!phoneNumberId || !token) {
    console.error("WhatsApp env vars missing");
    return;
  }
  try {
    await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: text },
      }),
    });
  } catch (e) {
    console.error("Failed to send WhatsApp message:", e);
  }
}

// ── Menu Text ──
const WELCOME_MENU = `مرحباً بك في ألفا للنقل! 🚛
Welcome to ALFA TRANS!

اختر الخدمة | Choose a service:

1️⃣ توزيع الإسمنت السائب | Liquid Cement
2️⃣ النقل البري المتخصص | Land Transport
3️⃣ حلول النقل الدولي | International Shipping
4️⃣ فحص وسلامة الشحنات | Cargo Safety`;

// ── Webhook Verification (GET) ──
export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get("hub.mode");
  const token = req.nextUrl.searchParams.get("hub.verify_token");
  const challenge = req.nextUrl.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// ── Incoming Messages (POST) ──
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!message || message.type !== "text") {
      return NextResponse.json({ status: "ok" });
    }

    const from = message.from; // sender phone
    const text = message.text.body.trim();
    const state = getState(from);

    switch (state.step) {
      case "menu": {
        const choice = parseInt(text);
        if (choice >= 1 && choice <= 4) {
          setState(from, { step: "ask_name", service: choice });
          await sendMessage(from, "ما اسمك الكريم؟\nWhat is your name?");
        } else {
          setState(from, { step: "menu" });
          await sendMessage(from, WELCOME_MENU);
        }
        break;
      }

      case "ask_name": {
        setState(from, { step: "ask_location", name: text });
        await sendMessage(from, "ما هو موقعك / مدينتك؟\nWhat is your location / city?");
        break;
      }

      case "ask_location": {
        setState(from, { step: "ask_details", location: text });
        const s = state.service;
        const prompt =
          s === 1 || s === 2
            ? "ما الكمية المطلوبة؟\nWhat quantity do you need?"
            : "ما تفاصيل الشحنة / المسار؟\nWhat are the shipment / route details?";
        await sendMessage(from, prompt);
        break;
      }

      case "ask_details": {
        const updated = { ...getState(from), step: "confirm" as Step, details: text };
        setState(from, updated);
        const svc = SERVICES[(updated.service || 1) - 1];
        const summary = `📋 ملخص طلبك | Your request summary:

🔹 الخدمة | Service: ${svc.ar} | ${svc.en}
🔹 الاسم | Name: ${updated.name}
🔹 الموقع | Location: ${updated.location}
🔹 التفاصيل | Details: ${text}

✅ للتأكيد أرسل "نعم" أو "yes"
❌ للتعديل أرسل "لا" أو "no"`;
        await sendMessage(from, summary);
        break;
      }

      case "confirm": {
        const lower = text.toLowerCase();
        if (lower === "نعم" || lower === "yes" || lower === "1") {
          const s = getState(from);
          const svc = SERVICES[(s.service || 1) - 1];

          // Forward to sales agent
          const agentNumber = process.env.WHATSAPP_SALES_AGENT_NUMBER;
          if (agentNumber) {
            const agentMsg = `🔔 طلب جديد | New Request

📞 العميل | Customer: ${from}
🔹 الخدمة | Service: ${svc.ar} | ${svc.en}
🔹 الاسم | Name: ${s.name}
🔹 الموقع | Location: ${s.location}
🔹 التفاصيل | Details: ${s.details}`;
            await sendMessage(agentNumber, agentMsg);
          }

          await sendMessage(
            from,
            "✅ شكراً لك! تم إرسال طلبك لفريق المبيعات وسيتم التواصل معك قريباً.\n\nThank you! Your request has been sent to our sales team. We will contact you soon."
          );
          clearState(from);
        } else if (lower === "لا" || lower === "no" || lower === "2") {
          clearState(from);
          setState(from, { step: "menu" });
          await sendMessage(from, "تم إلغاء الطلب. لنبدأ من جديد!\nRequest cancelled. Let's start over!\n\n" + WELCOME_MENU);
        } else {
          await sendMessage(from, '✅ أرسل "نعم" أو "yes" للتأكيد\n❌ أرسل "لا" أو "no" للإلغاء');
        }
        break;
      }
    }
  } catch (e) {
    console.error("WhatsApp webhook error:", e);
  }

  // Always return 200 to prevent retries
  return NextResponse.json({ status: "ok" });
}
