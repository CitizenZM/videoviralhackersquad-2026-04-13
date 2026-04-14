import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { getLatestProjectRepo, listContentAssetsRepo } from "@/lib/repository";

export async function GET() {
  const context = await getAuthContext();
  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const project = await getLatestProjectRepo(context.workspaceId);
  const items = project
    ? await listContentAssetsRepo(context.workspaceId, project.id)
    : [];
  return NextResponse.json({
    items,
    total: items.length,
  });
}
