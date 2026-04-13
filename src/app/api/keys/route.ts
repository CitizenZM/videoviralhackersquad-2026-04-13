import { NextResponse } from "next/server";
import { getAuthContext, requireWorkspaceRole } from "@/lib/auth";
import { maskApiKey } from "@/lib/store";
import { listApiKeysRepo, upsertApiKeyRepo } from "@/lib/repository";
import { ApiProvider } from "@/lib/types";

const providers: ApiProvider[] = ["google_ai_studio", "runway"];

export async function GET() {
  const context = await getAuthContext();
  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const keys = await listApiKeysRepo(context.workspaceId);

  return NextResponse.json({
    items: providers.map((provider) => {
      const key = keys.find((entry) => entry.provider === provider);
      return {
        provider,
        masked: key ? maskApiKey(key.value) : null,
        updatedAt: key?.updatedAt ?? null,
      };
    }),
  });
}

export async function POST(request: Request) {
  const context = await getAuthContext();
  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await requireWorkspaceRole(context.workspaceId, ["owner", "admin"]);
  const payload = await request.json().catch(() => ({}));

  if (!payload.provider || !payload.value) {
    return NextResponse.json({ error: "Missing provider or value" }, { status: 400 });
  }

  const key = await upsertApiKeyRepo({
    workspaceId: context.workspaceId,
    provider: payload.provider,
    value: payload.value,
  });

  return NextResponse.json({
    provider: key.provider,
    masked: maskApiKey(key.value),
    updatedAt: key.updatedAt,
  });
}
