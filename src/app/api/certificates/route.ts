import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const visibleOnly = req.nextUrl.searchParams.get("visible") === "true";
    const certificates = await prisma.certificate.findMany({
      where: visibleOnly ? { visible: true } : undefined,
      orderBy: { order: "asc" },
    });
    return NextResponse.json(certificates);
  } catch (e) {
    console.error("GET /api/certificates error:", e);
    return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const maxOrder = await prisma.certificate.aggregate({ _max: { order: true } });
  const certificate = await prisma.certificate.create({
    data: {
      title_ar: body.title_ar,
      title_en: body.title_en,
      image: body.image,
      order: (maxOrder._max.order ?? -1) + 1,
    },
  });
  return NextResponse.json(certificate, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const certificate = await prisma.certificate.update({
    where: { id: body.id },
    data: {
      title_ar: body.title_ar,
      title_en: body.title_en,
      image: body.image,
    },
  });
  return NextResponse.json(certificate);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const certificate = await prisma.certificate.update({
    where: { id: body.id },
    data: { visible: body.visible },
  });
  return NextResponse.json(certificate);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.certificate.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
