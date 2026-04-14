import { cookies } from "next/headers";
import {
  ensureWorkspaceForUser,
  getSessionByToken,
  getUserById,
  getWorkspaceById,
  getWorkspaceForUser,
  getWorkspaceRole,
} from "./store";
import { WorkspaceRole } from "./types";

export type AuthContext = {
  userId: string;
  userName: string;
  userEmail: string;
  workspaceId: string;
  workspaceName: string;
  role: WorkspaceRole;
};

export async function getAuthContext(): Promise<AuthContext | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("vvhs_session")?.value;
  if (!sessionToken) {
    return null;
  }

  const session = await getSessionByToken(sessionToken);
  if (!session) {
    return null;
  }

  const user = await getUserById(session.userId);
  if (!user) {
    return null;
  }

  const workspace = await getWorkspaceForUser(user.id);
  if (!workspace) {
    return null;
  }

  const role = await getWorkspaceRole(user.id, workspace.id);
  if (!role) {
    return null;
  }

  return {
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    workspaceId: workspace.id,
    workspaceName: workspace.name,
    role,
  };
}

export async function requireAuthContext() {
  const context = await getAuthContext();
  if (!context) {
    throw new Error("Unauthorized");
  }
  return context;
}

export async function requireWorkspaceRole(
  workspaceId: string,
  allowed: WorkspaceRole[]
) {
  const context = await requireAuthContext();
  if (context.workspaceId !== workspaceId) {
    throw new Error("Workspace mismatch");
  }
  if (!allowed.includes(context.role)) {
    throw new Error("Forbidden");
  }
  return context;
}

export async function ensureWorkspaceContext(userId: string, name: string) {
  const workspace = await ensureWorkspaceForUser(userId, name);
  return getWorkspaceById(workspace.id);
}
