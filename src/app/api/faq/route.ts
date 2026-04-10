import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const faqs = await prisma.faq.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(faqs);
  } catch (e) {
    console.error("GET /api/faq error:", e);
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const maxOrder = await prisma.faq.aggregate({ _max: { order: true } });
  const faq = await prisma.faq.create({
    data: {
      question_ar: body.question_ar,
      question_en: body.question_en,
      answer_ar: body.answer_ar,
      answer_en: body.answer_en,
      order: (maxOrder._max.order ?? -1) + 1,
    },
  });
  return NextResponse.json(faq, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const faq = await prisma.faq.update({
    where: { id: body.id },
    data: {
      question_ar: body.question_ar,
      question_en: body.question_en,
      answer_ar: body.answer_ar,
      answer_en: body.answer_en,
      order: body.order,
    },
  });
  return NextResponse.json(faq);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.faq.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
