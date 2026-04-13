import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import {
  ApiKey,
  ApiProvider,
  ContentAsset,
  CreativeVariant,
  ExportJob,
  Insight,
  Job,
  JobStatus,
  JobType,
  PreviewAsset,
  Project,
  Script,
  Session,
  Storyboard,
  User,
  Workspace,
  WorkspaceMember,
  WorkspaceRole,
} from "./types";
import {
  contentAssets as sampleContent,
  insights as sampleInsights,
  scripts as sampleScripts,
  storyboards as sampleStoryboards,
  creativeVariants as sampleVariants,
  previewAssets as samplePreviews,
  exportJobs as sampleExports,
} from "./sample-data";

type Store = {
  users: User[];
  workspaces: Workspace[];
  members: WorkspaceMember[];
  sessions: Session[];
  projects: Project[];
  jobs: Job[];
  contentAssets: ContentAsset[];
  insights: Insight[];
  scripts: Script[];
  storyboards: Storyboard[];
  creativeVariants: CreativeVariant[];
  previewAssets: PreviewAsset[];
  exportJobs: ExportJob[];
  apiKeys: ApiKey[];
};

const storePath = path.join(process.cwd(), ".data", "store.json");
let storeCache: Store | null = null;

const emptyStore: Store = {
  users: [],
  workspaces: [],
  members: [],
  sessions: [],
  projects: [],
  jobs: [],
  contentAssets: [],
  insights: [],
  scripts: [],
  storyboards: [],
  creativeVariants: [],
  previewAssets: [],
  exportJobs: [],
  apiKeys: [],
};

async function ensureStoreDir() {
  await fs.mkdir(path.dirname(storePath), { recursive: true });
}

async function loadStore(): Promise<Store> {
  if (storeCache) {
    return storeCache;
  }

  try {
    const data = await fs.readFile(storePath, "utf-8");
    storeCache = JSON.parse(data) as Store;
  } catch {
    storeCache = { ...emptyStore };
  }

  return storeCache;
}

async function saveStore(store: Store) {
  storeCache = store;
  await ensureStoreDir();
  await fs.writeFile(storePath, JSON.stringify(store, null, 2), "utf-8");
}

function createId(prefix: string) {
  return `${prefix}-${randomUUID()}`;
}

function nowIso() {
  return new Date().toISOString();
}

function seedProjectData(store: Store, projectId: string) {
  const addProjectId = <T extends { id: string }>(items: T[], prefix: string) =>
    items.map((item) => ({
      ...item,
      id: createId(prefix),
      projectId,
    }));

  store.contentAssets.push(
    ...addProjectId(sampleContent, "asset")
  );
  store.insights.push(...addProjectId(sampleInsights, "insight"));
  store.scripts.push(...addProjectId(sampleScripts, "script"));
  store.storyboards.push(...addProjectId(sampleStoryboards, "storyboard"));
  store.creativeVariants.push(...addProjectId(sampleVariants, "variant"));
  store.previewAssets.push(...addProjectId(samplePreviews, "preview"));
  store.exportJobs.push(...addProjectId(sampleExports, "export"));
}

export async function createUser({
  email,
  name,
}: {
  email: string;
  name: string;
}) {
  const store = await loadStore();
  const existing = store.users.find((user) => user.email === email);
  if (existing) {
    return existing;
  }

  const user: User = {
    id: createId("user"),
    email,
    name,
    createdAt: nowIso(),
  };

  store.users.push(user);
  await saveStore(store);
  return user;
}

export async function createWorkspace({ name }: { name: string }) {
  const store = await loadStore();
  const workspace: Workspace = {
    id: createId("workspace"),
    name,
    createdAt: nowIso(),
  };
  store.workspaces.push(workspace);
  await saveStore(store);
  return workspace;
}

export async function addMember({
  workspaceId,
  userId,
  role,
}: {
  workspaceId: string;
  userId: string;
  role: WorkspaceRole;
}) {
  const store = await loadStore();
  const membership: WorkspaceMember = {
    id: createId("member"),
    workspaceId,
    userId,
    role,
    createdAt: nowIso(),
  };
  store.members.push(membership);
  await saveStore(store);
  return membership;
}

export async function getWorkspaceForUser(userId: string) {
  const store = await loadStore();
  const membership = store.members.find((member) => member.userId === userId);
  if (!membership) {
    return null;
  }
  const workspace = store.workspaces.find(
    (entry) => entry.id === membership.workspaceId
  );
  return workspace ?? null;
}

export async function getWorkspaceRole(userId: string, workspaceId: string) {
  const store = await loadStore();
  return (
    store.members.find(
      (member) =>
        member.userId === userId && member.workspaceId === workspaceId
    )?.role ?? null
  );
}

export async function createSession(userId: string) {
  const store = await loadStore();
  const session: Session = {
    id: createId("session"),
    userId,
    token: randomUUID(),
    createdAt: nowIso(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
  };
  store.sessions.push(session);
  await saveStore(store);
  return session;
}

export async function getSessionByToken(token: string) {
  const store = await loadStore();
  return store.sessions.find((session) => session.token === token) ?? null;
}

export async function getUserById(userId: string) {
  const store = await loadStore();
  return store.users.find((user) => user.id === userId) ?? null;
}

export async function createProject({
  workspaceId,
  name,
  brandName,
  websiteUrl,
  category,
  market,
  goal,
}: {
  workspaceId: string;
  name: string;
  brandName: string;
  websiteUrl: string;
  category: string;
  market: string;
  goal: string;
}) {
  const store = await loadStore();
  const project: Project = {
    id: createId("project"),
    workspaceId,
    name,
    brandName,
    websiteUrl,
    category,
    market,
    goal,
    status: "active",
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  store.projects.push(project);
  seedProjectData(store, project.id);
  await saveStore(store);
  return project;
}

export async function listProjects(workspaceId: string) {
  const store = await loadStore();
  return store.projects.filter((project) => project.workspaceId === workspaceId);
}

export async function getLatestProject(workspaceId: string) {
  const projects = await listProjects(workspaceId);
  return projects.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];
}

export async function createJob({
  workspaceId,
  projectId,
  type,
  payload,
}: {
  workspaceId: string;
  projectId?: string;
  type: JobType;
  payload: Record<string, unknown>;
}) {
  const store = await loadStore();
  const job: Job = {
    id: createId("job"),
    workspaceId,
    projectId,
    type,
    status: "queued",
    payload,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  store.jobs.push(job);
  await saveStore(store);
  return job;
}

export async function updateJobStatus(
  jobId: string,
  status: JobStatus,
  result?: Record<string, unknown>
) {
  const store = await loadStore();
  const job = store.jobs.find((entry) => entry.id === jobId);
  if (!job) {
    return null;
  }
  job.status = status;
  job.updatedAt = nowIso();
  job.result = result;
  await saveStore(store);
  return job;
}

export async function listJobs(workspaceId: string, type?: JobType) {
  const store = await loadStore();
  return store.jobs.filter(
    (job) => job.workspaceId === workspaceId && (!type || job.type === type)
  );
}

export async function listContentAssets(projectId: string) {
  const store = await loadStore();
  return store.contentAssets.filter((asset) => asset.projectId === projectId);
}

export async function addContentAssets(
  projectId: string,
  assets: Omit<ContentAsset, "id" | "projectId">[]
) {
  const store = await loadStore();
  const created = assets.map((asset) => ({
    ...asset,
    id: createId("asset"),
    projectId,
  }));
  store.contentAssets.push(...created);
  await saveStore(store);
  return created;
}

export async function listInsights(projectId: string) {
  const store = await loadStore();
  return store.insights.filter((insight) => insight.projectId === projectId);
}

export async function listScripts(projectId: string) {
  const store = await loadStore();
  return store.scripts.filter((script) => script.projectId === projectId);
}

export async function listStoryboards(projectId: string) {
  const store = await loadStore();
  return store.storyboards.filter((storyboard) => storyboard.projectId === projectId);
}

export async function listCreativeVariants(projectId: string) {
  const store = await loadStore();
  return store.creativeVariants.filter((variant) => variant.projectId === projectId);
}

export async function listPreviewAssets(projectId: string) {
  const store = await loadStore();
  return store.previewAssets.filter((asset) => asset.projectId === projectId);
}

export async function listExportJobs(projectId: string) {
  const store = await loadStore();
  return store.exportJobs.filter((job) => job.projectId === projectId);
}

export async function addPreviewAsset({
  projectId,
  type,
  url,
  status,
}: {
  projectId: string;
  type: PreviewAsset["type"];
  url: string;
  status: PreviewAsset["status"];
}) {
  const store = await loadStore();
  const asset: PreviewAsset = {
    id: createId("preview"),
    projectId,
    type,
    url,
    status,
  };
  store.previewAssets.push(asset);
  await saveStore(store);
  return asset;
}

export async function addExportJob({
  projectId,
  format,
  status,
}: {
  projectId: string;
  format: ExportJob["format"];
  status: ExportJob["status"];
}) {
  const store = await loadStore();
  const job: ExportJob = {
    id: createId("export"),
    projectId,
    format,
    status,
    createdAt: nowIso(),
  };
  store.exportJobs.push(job);
  await saveStore(store);
  return job;
}

export async function upsertApiKey({
  workspaceId,
  provider,
  value,
}: {
  workspaceId: string;
  provider: ApiProvider;
  value: string;
}) {
  const store = await loadStore();
  const existing = store.apiKeys.find(
    (entry) => entry.workspaceId === workspaceId && entry.provider === provider
  );
  if (existing) {
    existing.value = value;
    existing.updatedAt = nowIso();
    await saveStore(store);
    return existing;
  }
  const key: ApiKey = {
    id: createId("key"),
    workspaceId,
    provider,
    value,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  store.apiKeys.push(key);
  await saveStore(store);
  return key;
}

export async function listApiKeys(workspaceId: string) {
  const store = await loadStore();
  return store.apiKeys.filter((entry) => entry.workspaceId === workspaceId);
}

export function maskApiKey(value: string) {
  if (value.length <= 6) {
    return "••••••";
  }
  return `${value.slice(0, 3)}••••••${value.slice(-4)}`;
}

export async function ensureWorkspaceForUser(userId: string, name: string) {
  const existing = await getWorkspaceForUser(userId);
  if (existing) {
    return existing;
  }
  const workspace = await createWorkspace({ name });
  await addMember({ workspaceId: workspace.id, userId, role: "owner" });
  return workspace;
}

export async function getWorkspaceById(workspaceId: string) {
  const store = await loadStore();
  return store.workspaces.find((workspace) => workspace.id === workspaceId) ?? null;
}
