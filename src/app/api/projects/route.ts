import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { createProjectRepo, listProjectsRepo } from "@/lib/repository";

export async function GET() {
  const context = await getAuthContext();
  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const projects = await listProjectsRepo(context.workspaceId);
  return NextResponse.json({
    items: projects,
  });
}

export async function POST(request: Request) {
  const context = await getAuthContext();
  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = await request.json().catch(() => ({}));

  const project = await createProjectRepo({
    workspaceId: context.workspaceId,
    name: payload.name ?? payload.brandName ?? "New project",
    brandName: payload.brandName ?? "Brand",
    websiteUrl: payload.websiteUrl ?? "https://example.com",
    category: payload.category ?? "Category",
    market: payload.market ?? "United States",
    goal: payload.goal ?? "Launch",
  });

  return NextResponse.json({
    status: "created",
    project,
  });
}
