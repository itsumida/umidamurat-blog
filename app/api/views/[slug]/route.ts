import { incrementViews } from "@/lib/views";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const views = incrementViews(slug);
  return NextResponse.json({ views });
}
