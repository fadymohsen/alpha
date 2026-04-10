import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const careers = await prisma.career.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(careers);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const career = await prisma.career.create({
    data: {
      title_ar: body.title_ar,
      title_en: body.title_en,
      location_ar: body.location_ar,
      location_en: body.location_en,
      req_ar: body.req_ar,
      req_en: body.req_en,
    },
  });
  return NextResponse.json(career, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const career = await prisma.career.update({
    where: { id: body.id },
    data: {
      title_ar: body.title_ar,
      title_en: body.title_en,
      location_ar: body.location_ar,
      location_en: body.location_en,
      req_ar: body.req_ar,
      req_en: body.req_en,
    },
  });
  return NextResponse.json(career);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.career.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
