import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const prefix = req.nextUrl.searchParams.get("prefix");
  const contents = prefix
    ? await prisma.siteContent.findMany({ where: { key: { startsWith: prefix } } })
    : await prisma.siteContent.findMany();
  return NextResponse.json(contents);
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
