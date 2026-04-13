import { NextResponse } from "next/server";
import { createSession, createUser, ensureWorkspaceForUser } from "@/lib/store";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  const email = payload.email ?? "demo@videoviralhackersquad.com";
  const name = payload.name ?? "Demo User";

  const user = await createUser({ email, name });
  await ensureWorkspaceForUser(user.id, "VVHS Workspace");
  const session = await createSession(user.id);

  const response = NextResponse.json({
    status: "authenticated",
    user: { id: user.id, name: user.name, email: user.email },
  });

  response.cookies.set("vvhs_session", session.token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
