import { NextResponse } from "next/server";
import { creativeTestMatrix } from "@/lib/sample-data";
import { getAuthContext } from "@/lib/auth";

export async function GET() {
  const context = await getAuthContext();
  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({
    items: creativeTestMatrix,
    total: creativeTestMatrix.length,
    note: "Predictive creative scoring, not actual media performance.",
  });
}
