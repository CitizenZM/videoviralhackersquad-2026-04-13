import { getSupabaseServerClient } from "./supabase/server";
import {
  addContentAssets,
  addExportJob,
  addPreviewAsset,
  createJob,
  createProject,
  getWorkspaceById,
  listApiKeys,
  listContentAssets,
  listCreativeVariants,
  listExportJobs,
  listInsights,
  listJobs,
  listPreviewAssets,
  listProjects,
  listScripts,
  listStoryboards,
  updateJobStatus,
  upsertApiKey,
} from "./store";
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
  Storyboard,
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

const isSupabaseEnabled = () => Boolean(getSupabaseServerClient());

type Row = Record<string, unknown>;

const toString = (value: unknown, fallback = "") =>
  typeof value === "string" ? value : value ? String(value) : fallback;
const toOptionalString = (value: unknown) =>
  typeof value === "string" ? value : value ? String(value) : undefined;
const toNumber = (value: unknown) =>
  typeof value === "number" ? value : undefined;
const toStringArray = (value: unknown) =>
  Array.isArray(value) ? value.map((entry) => String(entry)) : undefined;

const mapProjectRow = (row: Row): Project => ({
  id: toString(row.id),
  workspaceId: toString(row.workspace_id),
  name: toString(row.name),
  brandName: toString(row.brand_name),
  websiteUrl: toString(row.website_url),
  category: toString(row.category),
  market: toString(row.market),
  goal: toString(row.goal),
  status: toString(row.status) as Project["status"],
  createdAt: toString(row.created_at),
  updatedAt: toString(row.updated_at),
});

const mapContentAssetRow = (row: Row): ContentAsset => ({
  id: toString(row.id),
  projectId: toOptionalString(row.project_id),
  sourcePlatform: toString(row.source_platform) as ContentAsset["sourcePlatform"],
  sourceType: toString(row.source_type) as ContentAsset["sourceType"],
  url: toString(row.url),
  title: toString(row.title),
  creatorName: toOptionalString(row.creator_name),
  thumbnailUrl: toOptionalString(row.thumbnail_url),
  publishDate: toOptionalString(row.publish_date),
  views: toNumber(row.views),
  engagement: toNumber(row.engagement),
  hookText: toOptionalString(row.hook_text),
  ctaText: toOptionalString(row.cta_text),
  narrativeType: toOptionalString(row.narrative_type) as ContentAsset["narrativeType"],
  sellingPoints: toStringArray(row.selling_points),
  sentimentSummary: toOptionalString(row.sentiment_summary),
  aiQualityScore: toNumber(row.ai_quality_score),
  adSuitabilityScore: toNumber(row.ad_suitability_score),
});

const mapInsightRow = (row: Row): Insight => ({
  id: toString(row.id),
  projectId: toOptionalString(row.project_id),
  title: toString(row.title),
  summary: toString(row.summary),
  sourceType: toString(row.source_type) as Insight["sourceType"],
  createdAt: toString(row.created_at),
});

const mapScriptRow = (row: Row): Script => ({
  id: toString(row.id),
  projectId: toOptionalString(row.project_id),
  title: toString(row.title),
  durationSeconds: toNumber(row.duration_seconds) ?? 0,
  scriptText: toString(row.script_text),
  ctaOptions: toStringArray(row.cta_options) ?? [],
});

const mapStoryboardRow = (row: Row): Storyboard => ({
  id: toString(row.id),
  projectId: toOptionalString(row.project_id),
  title: toString(row.title),
  frames: toNumber(row.frames) ?? 0,
  summary: toString(row.summary),
});

const mapCreativeVariantRow = (row: Row): CreativeVariant => ({
  id: toString(row.id),
  projectId: toOptionalString(row.project_id),
  hookType: toString(row.hook_type),
  narrativeType: toString(row.narrative_type),
  ctaType: toString(row.cta_type),
  platformFit: toString(row.platform_fit),
});

const mapPreviewAssetRow = (row: Row): PreviewAsset => ({
  id: toString(row.id),
  projectId: toOptionalString(row.project_id),
  type: toString(row.type) as PreviewAsset["type"],
  url: toString(row.url),
  status: toString(row.status) as PreviewAsset["status"],
});

const mapExportJobRow = (row: Row): ExportJob => ({
  id: toString(row.id),
  projectId: toOptionalString(row.project_id),
  format: toString(row.format) as ExportJob["format"],
  status: toString(row.status) as ExportJob["status"],
  createdAt: toString(row.created_at),
});

const mapApiKeyRow = (row: Row): ApiKey => ({
  id: toString(row.id),
  workspaceId: toString(row.workspace_id),
  provider: toString(row.provider) as ApiProvider,
  value: toString(row.value),
  createdAt: toString(row.created_at),
  updatedAt: toString(row.updated_at),
});

async function ensureWorkspaceRow(workspaceId: string) {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return;
  }
  const workspace = await getWorkspaceById(workspaceId);
  if (!workspace) {
    return;
  }
  await supabase
    .from("workspaces")
    .upsert({ id: workspace.id, name: workspace.name })
    .select("id")
    .single();
}

async function seedSupabaseProject(
  workspaceId: string,
  projectId: string
) {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return;
  }

  await supabase.from("content_assets").insert(
    sampleContent.map((item) => ({
      workspace_id: workspaceId,
      project_id: projectId,
      source_platform: item.sourcePlatform,
      source_type: item.sourceType,
      url: item.url,
      title: item.title,
      creator_name: item.creatorName,
      thumbnail_url: item.thumbnailUrl,
      publish_date: item.publishDate,
      views: item.views,
      engagement: item.engagement,
      hook_text: item.hookText,
      cta_text: item.ctaText,
      narrative_type: item.narrativeType,
      selling_points: item.sellingPoints,
      sentiment_summary: item.sentimentSummary,
      ai_quality_score: item.aiQualityScore,
      ad_suitability_score: item.adSuitabilityScore,
    }))
  );

  await supabase.from("insights").insert(
    sampleInsights.map((item) => ({
      workspace_id: workspaceId,
      project_id: projectId,
      title: item.title,
      summary: item.summary,
      source_type: item.sourceType,
      created_at: item.createdAt,
    }))
  );

  await supabase.from("scripts").insert(
    sampleScripts.map((item) => ({
      workspace_id: workspaceId,
      project_id: projectId,
      title: item.title,
      duration_seconds: item.durationSeconds,
      script_text: item.scriptText,
      cta_options: item.ctaOptions,
    }))
  );

  await supabase.from("storyboards").insert(
    sampleStoryboards.map((item) => ({
      workspace_id: workspaceId,
      project_id: projectId,
      title: item.title,
      frames: item.frames,
      summary: item.summary,
    }))
  );

  await supabase.from("creative_variants").insert(
    sampleVariants.map((item) => ({
      workspace_id: workspaceId,
      project_id: projectId,
      hook_type: item.hookType,
      narrative_type: item.narrativeType,
      cta_type: item.ctaType,
      platform_fit: item.platformFit,
    }))
  );

  await supabase.from("preview_assets").insert(
    samplePreviews.map((item) => ({
      workspace_id: workspaceId,
      project_id: projectId,
      type: item.type,
      url: item.url,
      status: item.status,
    }))
  );

  await supabase.from("export_jobs").insert(
    sampleExports.map((item) => ({
      workspace_id: workspaceId,
      project_id: projectId,
      format: item.format,
      status: item.status,
      created_at: item.createdAt,
    }))
  );
}

export async function listProjectsRepo(workspaceId: string): Promise<Project[]> {
  if (!isSupabaseEnabled()) {
    return listProjects(workspaceId);
  }
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return listProjects(workspaceId);
  }
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("workspace_id", workspaceId);
  return (data ?? []).map(mapProjectRow);
}

export async function getLatestProjectRepo(workspaceId: string) {
  const projects = await listProjectsRepo(workspaceId);
  return projects.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];
}

export async function createProjectRepo(params: {
  workspaceId: string;
  name: string;
  brandName: string;
  websiteUrl: string;
  category: string;
  market: string;
  goal: string;
}): Promise<Project> {
  if (!isSupabaseEnabled()) {
    return createProject(params);
  }
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return createProject(params);
  }
  await ensureWorkspaceRow(params.workspaceId);
  const { data, error } = await supabase
    .from("projects")
    .insert({
      workspace_id: params.workspaceId,
      name: params.name,
      brand_name: params.brandName,
      website_url: params.websiteUrl,
      category: params.category,
      market: params.market,
      goal: params.goal,
      status: "active",
    })
    .select("*")
    .single();

  if (error || !data) {
    return createProject(params);
  }

  await seedSupabaseProject(params.workspaceId, data.id);

  return mapProjectRow(data);
}

export async function listJobsRepo(
  workspaceId: string,
  type?: JobType
): Promise<Job[]> {
  if (!isSupabaseEnabled()) {
    return listJobs(workspaceId, type);
  }
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return listJobs(workspaceId, type);
  }
  let queryBuilder = supabase.from("jobs").select("*").eq("workspace_id", workspaceId);
  if (type) {
    queryBuilder = queryBuilder.eq("type", type);
  }
  const { data } = await queryBuilder;
  return (data ?? []).map((job) => ({
    id: job.id,
    workspaceId: job.workspace_id,
    projectId: job.project_id ?? undefined,
    type: job.type,
    status: job.status,
    payload: job.payload ?? {},
    result: job.result ?? undefined,
    createdAt: job.created_at,
    updatedAt: job.updated_at,
  }));
}

export async function createJobRepo(params: {
  workspaceId: string;
  projectId?: string;
  type: JobType;
  payload: Record<string, unknown>;
}): Promise<Job> {
  if (!isSupabaseEnabled()) {
    return createJob(params);
  }
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return createJob(params);
  }
  await ensureWorkspaceRow(params.workspaceId);
  const { data, error } = await supabase
    .from("jobs")
    .insert({
      workspace_id: params.workspaceId,
      project_id: params.projectId ?? null,
      type: params.type,
      status: "queued",
      payload: params.payload,
    })
    .select("*")
    .single();

  if (error || !data) {
    return createJob(params);
  }

  return {
    id: data.id,
    workspaceId: data.workspace_id,
    projectId: data.project_id ?? undefined,
    type: data.type,
    status: data.status,
    payload: data.payload ?? {},
    result: data.result ?? undefined,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

export async function updateJobStatusRepo(
  jobId: string,
  status: JobStatus,
  result?: Record<string, unknown>
): Promise<Job | null> {
  if (!isSupabaseEnabled()) {
    return updateJobStatus(jobId, status, result);
  }
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return updateJobStatus(jobId, status, result);
  }
  const { data, error } = await supabase
    .from("jobs")
    .update({ status, result })
    .eq("id", jobId)
    .select("*")
    .single();

  if (error || !data) {
    return updateJobStatus(jobId, status, result);
  }

  return {
    id: data.id,
    workspaceId: data.workspace_id,
    projectId: data.project_id ?? undefined,
    type: data.type,
    status: data.status,
    payload: data.payload ?? {},
    result: data.result ?? undefined,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

export async function listContentAssetsRepo(
  workspaceId: string,
  projectId: string
): Promise<ContentAsset[]> {
  if (!isSupabaseEnabled()) {
    return listContentAssets(projectId);
  }
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return listContentAssets(projectId);
  }
  const { data } = await supabase
    .from("content_assets")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("project_id", projectId);
  return (data ?? []).map(mapContentAssetRow);
}

export async function listInsightsRepo(
  workspaceId: string,
  projectId: string
): Promise<Insight[]> {
  if (!isSupabaseEnabled()) {
    return listInsights(projectId);
  }
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return listInsights(projectId);
  }
  const { data } = await supabase
    .from("insights")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("project_id", projectId);
  return (data ?? []).map(mapInsightRow);
}

export async function listScriptsRepo(
  workspaceId: string,
  projectId: string
): Promise<Script[]> {
  if (!isSupabaseEnabled()) {
    return listScripts(projectId);
  }
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return listScripts(projectId);
  }
  const { data } = await supabase
    .from("scripts")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("project_id", projectId);
  return (data ?? []).map(mapScriptRow);
}

export async function listStoryboardsRepo(
  workspaceId: string,
  projectId: string
): Promise<Storyboard[]> {
  if (!isSupabaseEnabled()) {
    return listStoryboards(projectId);
  }
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return listStoryboards(projectId);
  }
  const { data } = await supabase
    .from("storyboards")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("project_id", projectId);
  return (data ?? []).map(mapStoryboardRow);
}

export async function listCreativeVariantsRepo(
  workspaceId: string,
  projectId: string
): Promise<CreativeVariant[]> {
  if (!isSupabaseEnabled()) {
    return listCreativeVariants(projectId);
  }
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return listCreativeVariants(projectId);
  }
  const { data } = await supabase
    .from("creative_variants")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("project_id", projectId);
  return (data ?? []).map(mapCreativeVariantRow);
}

export async function listPreviewAssetsRepo(
  workspaceId: string,
  projectId: string
): Promise<PreviewAsset[]> {
  if (!isSupabaseEnabled()) {
    return listPreviewAssets(projectId);
  }
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return listPreviewAssets(projectId);
  }
  const { data } = await supabase
    .from("preview_assets")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("project_id", projectId);
  return (data ?? []).map(mapPreviewAssetRow);
}

export async function addPreviewAssetRepo(params: {
  workspaceId: string;
  projectId: string;
  type: PreviewAsset["type"];
  url: string;
  status: PreviewAsset["status"];
}): Promise<PreviewAsset> {
  if (!isSupabaseEnabled()) {
    return addPreviewAsset({
      projectId: params.projectId,
      type: params.type,
      url: params.url,
      status: params.status,
    });
  }
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return addPreviewAsset({
      projectId: params.projectId,
      type: params.type,
      url: params.url,
      status: params.status,
    });
  }
  await ensureWorkspaceRow(params.workspaceId);
  const { data } = await supabase
    .from("preview_assets")
    .insert({
      workspace_id: params.workspaceId,
      project_id: params.projectId,
      type: params.type,
      url: params.url,
      status: params.status,
    })
    .select("*")
    .single();

  if (!data) {
    return addPreviewAsset({
      projectId: params.projectId,
      type: params.type,
      url: params.url,
      status: params.status,
    });
  }

  return {
    id: data.id,
    projectId: data.project_id,
    type: data.type,
    url: data.url,
    status: data.status,
  };
}

export async function listExportJobsRepo(
  workspaceId: string,
  projectId: string
): Promise<ExportJob[]> {
  if (!isSupabaseEnabled()) {
    return listExportJobs(projectId);
  }
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return listExportJobs(projectId);
  }
  const { data } = await supabase
    .from("export_jobs")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("project_id", projectId);
  return (data ?? []).map(mapExportJobRow);
}

export async function addExportJobRepo(params: {
  workspaceId: string;
  projectId: string;
  format: ExportJob["format"];
  status: ExportJob["status"];
}): Promise<ExportJob> {
  if (!isSupabaseEnabled()) {
    return addExportJob({
      projectId: params.projectId,
      format: params.format,
      status: params.status,
    });
  }
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return addExportJob({
      projectId: params.projectId,
      format: params.format,
      status: params.status,
    });
  }
  await ensureWorkspaceRow(params.workspaceId);
  const { data } = await supabase
    .from("export_jobs")
    .insert({
      workspace_id: params.workspaceId,
      project_id: params.projectId,
      format: params.format,
      status: params.status,
    })
    .select("*")
    .single();

  if (!data) {
    return addExportJob({
      projectId: params.projectId,
      format: params.format,
      status: params.status,
    });
  }

  return mapExportJobRow(data);
}

export async function listApiKeysRepo(
  workspaceId: string
): Promise<ApiKey[]> {
  if (!isSupabaseEnabled()) {
    return listApiKeys(workspaceId);
  }
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return listApiKeys(workspaceId);
  }
  const { data } = await supabase
    .from("api_keys")
    .select("*")
    .eq("workspace_id", workspaceId);
  return (data ?? []).map(mapApiKeyRow);
}

export async function upsertApiKeyRepo(params: {
  workspaceId: string;
  provider: ApiProvider;
  value: string;
}): Promise<ApiKey> {
  if (!isSupabaseEnabled()) {
    return upsertApiKey(params);
  }
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return upsertApiKey(params);
  }
  await ensureWorkspaceRow(params.workspaceId);
  const { data } = await supabase
    .from("api_keys")
    .upsert({
      workspace_id: params.workspaceId,
      provider: params.provider,
      value: params.value,
    })
    .select("*")
    .single();

  if (!data) {
    return upsertApiKey(params);
  }

  return mapApiKeyRow(data);
}

export async function addContentAssetsRepo(params: {
  workspaceId: string;
  projectId: string;
  assets: Omit<ContentAsset, "id" | "projectId">[];
}): Promise<ContentAsset[]> {
  if (!isSupabaseEnabled()) {
    return addContentAssets(params.projectId, params.assets);
  }
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return addContentAssets(params.projectId, params.assets);
  }
  await ensureWorkspaceRow(params.workspaceId);
  const { data } = await supabase.from("content_assets").insert(
    params.assets.map((asset) => ({
      workspace_id: params.workspaceId,
      project_id: params.projectId,
      source_platform: asset.sourcePlatform,
      source_type: asset.sourceType,
      url: asset.url,
      title: asset.title,
      creator_name: asset.creatorName,
      thumbnail_url: asset.thumbnailUrl,
      publish_date: asset.publishDate,
      views: asset.views,
      engagement: asset.engagement,
      hook_text: asset.hookText,
      cta_text: asset.ctaText,
      narrative_type: asset.narrativeType,
      selling_points: asset.sellingPoints,
      sentiment_summary: asset.sentimentSummary,
      ai_quality_score: asset.aiQualityScore,
      ad_suitability_score: asset.adSuitabilityScore,
    }))
  );
  return (data ?? []).map(mapContentAssetRow);
}
