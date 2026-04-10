import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const services = await prisma.service.findMany({ orderBy: { updatedAt: "desc" } });
    return NextResponse.json(services);
  } catch (e) {
    console.error("GET /api/services error:", e);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const service = await prisma.service.create({
    data: {
      title_ar: body.title_ar,
      title_en: body.title_en,
      desc_ar: body.desc_ar,
      desc_en: body.desc_en,
    },
  });
  return NextResponse.json(service, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const service = await prisma.service.update({
    where: { id: body.id },
    data: {
      title_ar: body.title_ar,
      title_en: body.title_en,
      desc_ar: body.desc_ar,
      desc_en: body.desc_en,
    },
  });
  return NextResponse.json(service);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.service.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
