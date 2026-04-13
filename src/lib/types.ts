export type SourceType =
  | "official_api"
  | "public_web"
  | "user_connected"
  | "ai_inferred";

export type ContentPlatform =
  | "youtube"
  | "website"
  | "review"
  | "news"
  | "social";

export type NarrativeType =
  | "before_after"
  | "founder_authority"
  | "product_demo"
  | "problem_agitation"
  | "lifestyle_aspiration"
  | "ugc_testimonial";

export interface Brand {
  id: string;
  name: string;
  url: string;
  category: string;
  market: string;
}

export interface Competitor {
  id: string;
  name: string;
  url?: string;
}

export interface ContentAsset {
  id: string;
  projectId?: string;
  sourcePlatform: ContentPlatform;
  sourceType: SourceType;
  url: string;
  title: string;
  creatorName?: string;
  thumbnailUrl?: string;
  publishDate?: string;
  views?: number;
  engagement?: number;
  hookText?: string;
  ctaText?: string;
  narrativeType?: NarrativeType;
  sellingPoints?: string[];
  sentimentSummary?: string;
  aiQualityScore?: number;
  adSuitabilityScore?: number;
}

export interface Insight {
  id: string;
  projectId?: string;
  title: string;
  summary: string;
  sourceType: SourceType;
  createdAt: string;
}

export interface Script {
  id: string;
  projectId?: string;
  title: string;
  durationSeconds: number;
  scriptText: string;
  ctaOptions: string[];
}

export interface Storyboard {
  id: string;
  projectId?: string;
  title: string;
  frames: number;
  summary: string;
}

export interface CreativeVariant {
  id: string;
  projectId?: string;
  hookType: string;
  narrativeType: string;
  ctaType: string;
  platformFit: string;
}

export interface CreativeTestVariant {
  id: string;
  hook: string;
  narrative: string;
  cta: string;
  structure: string;
  platformFit: string;
  funnelStage: string;
  predictedCtr: number;
  predictedHoldRate: number;
  predictedIntent: number;
}

export type WorkspaceRole = "owner" | "admin" | "member" | "viewer";
export type JobType = "ingest" | "preview" | "export" | "creative";
export type JobStatus = "queued" | "running" | "complete" | "failed";
export type ApiProvider = "google_ai_studio" | "runway";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  createdAt: string;
}

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string;
  role: WorkspaceRole;
  createdAt: string;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  createdAt: string;
}

export interface Project {
  id: string;
  workspaceId: string;
  name: string;
  brandName: string;
  websiteUrl: string;
  category: string;
  market: string;
  goal: string;
  status: "draft" | "active" | "paused" | "complete";
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  workspaceId: string;
  projectId?: string;
  type: JobType;
  status: JobStatus;
  payload: Record<string, unknown>;
  result?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ApiKey {
  id: string;
  workspaceId: string;
  provider: ApiProvider;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export interface PreviewAsset {
  id: string;
  projectId?: string;
  type: "frameboard" | "video_preview";
  url: string;
  status: "queued" | "running" | "complete" | "failed";
}

export interface ExportJob {
  id: string;
  projectId?: string;
  format: "pdf" | "slides" | "csv" | "notion";
  status: "queued" | "running" | "ready" | "failed";
  createdAt: string;
}
