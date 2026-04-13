import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { listJobsRepo } from "@/lib/repository";
import { JobType } from "@/lib/types";

export async function GET(request: Request) {
  const context = await getAuthContext();
  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const typeParam = searchParams.get("type") ?? undefined;
  const allowedTypes: JobType[] = ["ingest", "preview", "export", "creative"];
  const type = allowedTypes.includes(typeParam as JobType)
    ? (typeParam as JobType)
    : undefined;
  const jobs = await listJobsRepo(context.workspaceId, type);
  return NextResponse.json({ items: jobs });
}
