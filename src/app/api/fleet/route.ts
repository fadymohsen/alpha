import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const visibleOnly = req.nextUrl.searchParams.get("visible") === "true";
    const fleet = await prisma.fleet.findMany({
      where: visibleOnly ? { visible: true } : undefined,
      orderBy: { order: "asc" },
    });
    return NextResponse.json(fleet);
  } catch (e) {
    console.error("GET /api/fleet error:", e);
    return NextResponse.json({ error: "Failed to fetch fleet" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const maxOrder = await prisma.fleet.aggregate({ _max: { order: true } });
  const fleet = await prisma.fleet.create({
    data: {
      alt_ar: body.alt_ar,
      alt_en: body.alt_en,
      image: body.image,
      order: (maxOrder._max.order ?? -1) + 1,
    },
  });
  return NextResponse.json(fleet, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const fleet = await prisma.fleet.update({
    where: { id: body.id },
    data: {
      alt_ar: body.alt_ar,
      alt_en: body.alt_en,
      image: body.image,
    },
  });
  return NextResponse.json(fleet);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const fleet = await prisma.fleet.update({
    where: { id: body.id },
    data: { visible: body.visible },
  });
  return NextResponse.json(fleet);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.fleet.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
