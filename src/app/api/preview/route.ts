import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { generateFrameboard } from "@/lib/ai/google";
import { generatePreviewClip } from "@/lib/ai/runway";
import {
  addPreviewAssetRepo,
  createJobRepo,
  getLatestProjectRepo,
  listApiKeysRepo,
  listPreviewAssetsRepo,
  updateJobStatusRepo,
} from "@/lib/repository";

export async function GET() {
  const context = await getAuthContext();
  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const project = await getLatestProjectRepo(context.workspaceId);
  const items = project
    ? await listPreviewAssetsRepo(context.workspaceId, project.id)
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
    type: "preview",
    payload,
  });

  await updateJobStatusRepo(job.id, "running", { step: "generate" });

  const keys = await listApiKeysRepo(context.workspaceId);
  const googleKey = keys.find((key) => key.provider === "google_ai_studio")?.value;
  const runwayKey = keys.find((key) => key.provider === "runway")?.value;

  const frames = await generateFrameboard({
    prompt: payload.prompt ?? "Skincare routine hero shot",
    apiKey: googleKey,
    count: 3,
  });

  const previewUrl = await generatePreviewClip({
    prompt: payload.prompt ?? "UGC glow routine",
    apiKey: runwayKey,
    durationSeconds: payload.durationSeconds ?? 8,
    aspectRatio: payload.aspectRatio ?? "9:16",
  });

  const previewAssets = project
    ? await Promise.all([
        ...frames.map((url) =>
          addPreviewAssetRepo({
            workspaceId: context.workspaceId,
            projectId: project.id,
            type: "frameboard",
            url,
            status: "complete",
          })
        ),
        addPreviewAssetRepo({
          workspaceId: context.workspaceId,
          projectId: project.id,
          type: "video_preview",
          url: previewUrl,
          status: "complete",
        }),
      ])
    : [];

  await updateJobStatusRepo(job.id, "complete", { assets: previewAssets.length });

  return NextResponse.json({
    jobId: job.id,
    status: "complete",
    assets: previewAssets,
  });
}
