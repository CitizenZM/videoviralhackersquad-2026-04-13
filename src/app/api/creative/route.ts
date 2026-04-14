import { NextResponse } from "next/server";
import { creativeTestMatrix } from "@/lib/sample-data";
import { getAuthContext } from "@/lib/auth";
import { getLatestProjectRepo } from "@/lib/repository";
import {
  createJobRepo,
  listCreativeVariantsRepo,
  listScriptsRepo,
  listStoryboardsRepo,
  updateJobStatusRepo,
} from "@/lib/repository";

export async function GET() {
  const context = await getAuthContext();
  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const project = await getLatestProjectRepo(context.workspaceId);
  const scripts = project
    ? await listScriptsRepo(context.workspaceId, project.id)
    : [];
  const storyboards = project
    ? await listStoryboardsRepo(context.workspaceId, project.id)
    : [];
  const variants = project
    ? await listCreativeVariantsRepo(context.workspaceId, project.id)
    : [];

  return NextResponse.json({
    scripts,
    storyboards,
    variants,
    matrix: creativeTestMatrix,
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
    type: "creative",
    payload,
  });

  await updateJobStatusRepo(job.id, "running", { step: "generate" });
  await updateJobStatusRepo(job.id, "complete", { message: "Creative ready" });

  const scripts = project
    ? await listScriptsRepo(context.workspaceId, project.id)
    : [];
  const storyboards = project
    ? await listStoryboardsRepo(context.workspaceId, project.id)
    : [];
  const variants = project
    ? await listCreativeVariantsRepo(context.workspaceId, project.id)
    : [];

  return NextResponse.json({
    status: "generated",
    jobId: job.id,
    payload,
    scripts,
    storyboards,
    variants,
    matrix: creativeTestMatrix,
  });
}
