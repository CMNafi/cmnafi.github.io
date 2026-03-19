import { NextRequest, NextResponse } from "next/server";

import { searchEntities } from "@/lib/sec-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (query.length < 2) {
    return NextResponse.json({ results: [] }, { headers: { "Cache-Control": "no-store" } });
  }

  try {
    const results = await searchEntities(query);
    return NextResponse.json({ results }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Entity search failed.";
    return NextResponse.json({ message }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}

