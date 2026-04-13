import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { addContentAssetsRepo, createJobRepo, updateJobStatusRepo } from "@/lib/repository";
import { contentAssets as sampleContent } from "@/lib/sample-data";

export async function POST(request: Request) {
  const context = await getAuthContext();
  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json().catch(() => ({}));
  const projectId = payload.projectId;
  if (!projectId) {
    return NextResponse.json({ error: "Missing projectId" }, { status: 400 });
  }

  const job = await createJobRepo({
    workspaceId: context.workspaceId,
    projectId,
    type: "ingest",
    payload: { source: "youtube", ...payload },
  });

  await updateJobStatusRepo(job.id, "running", { step: "youtube" });

  const assets = await addContentAssetsRepo({
    workspaceId: context.workspaceId,
    projectId,
    assets: sampleContent.map((asset) => ({
      ...asset,
      sourcePlatform: "youtube",
      sourceType: "official_api",
    })),
  });

  await updateJobStatusRepo(job.id, "complete", { assets: assets.length });

  return NextResponse.json({
    jobId: job.id,
    status: "complete",
    assets,
  });
}
