import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import {
  addExportJobRepo,
  createJobRepo,
  getLatestProjectRepo,
  listExportJobsRepo,
  updateJobStatusRepo,
} from "@/lib/repository";

export async function GET() {
  const context = await getAuthContext();
  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const project = await getLatestProjectRepo(context.workspaceId);
  const items = project
    ? await listExportJobsRepo(context.workspaceId, project.id)
    : [];
  return NextResponse.json({
    items,
  });
}

export async function POST(request: Request) {
  const context = await getAuthContext();
  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = await request.json().catch(() => ({}));
  const project = await getLatestProjectRepo(context.workspaceId);
  const job = await createJobRepo({
    workspaceId: context.workspaceId,
    projectId: project?.id,
    type: "export",
    payload,
  });
  await updateJobStatusRepo(job.id, "running", { format: payload.format });
  await updateJobStatusRepo(job.id, "complete", { message: "Export ready" });

  if (project?.id && payload.format) {
    await addExportJobRepo({
      workspaceId: context.workspaceId,
      projectId: project.id,
      format: payload.format,
      status: "ready",
    });
  }

  return NextResponse.json({
    jobId: job.id,
    status: job.status,
    payload,
  });
}
