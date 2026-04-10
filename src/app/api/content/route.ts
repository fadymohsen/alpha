import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const prefix = req.nextUrl.searchParams.get("prefix");
    let contents;
    if (prefix) {
      const prefixes = prefix.split(",").filter(Boolean);
      contents = await prisma.siteContent.findMany({
        where: { OR: prefixes.map((p) => ({ key: { startsWith: p } })) },
      });
    } else {
      contents = await prisma.siteContent.findMany();
    }
    return NextResponse.json(contents);
  } catch (e) {
    console.error("GET /api/content error:", e);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const items: { key: string; value_ar: string; value_en: string }[] = body.items;
  const results = await Promise.all(
    items.map((item) =>
      prisma.siteContent.upsert({
        where: { key: item.key },
        update: { value_ar: item.value_ar, value_en: item.value_en },
        create: { key: item.key, value_ar: item.value_ar, value_en: item.value_en },
      })
    )
  );
  return NextResponse.json(results);
}
