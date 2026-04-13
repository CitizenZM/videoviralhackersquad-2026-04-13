import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { createJobRepo, updateJobStatusRepo } from "@/lib/repository";

export async function POST(request: Request) {
  const context = await getAuthContext();
  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = await request.json().catch(() => ({}));
  const job = await createJobRepo({
    workspaceId: context.workspaceId,
    projectId: payload.projectId,
    type: "ingest",
    payload,
  });

  await updateJobStatusRepo(job.id, "running", { step: "crawl" });
  await updateJobStatusRepo(job.id, "complete", { message: "Ingestion complete" });

  return NextResponse.json({
    jobId: job.id,
    status: job.status,
    payload,
  });
}
