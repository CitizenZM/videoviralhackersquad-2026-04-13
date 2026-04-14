create extension if not exists "uuid-ossp";

create table if not exists workspaces (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  created_at timestamptz default now()
);

create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  name text,
  email text unique,
  created_at timestamptz default now()
);

create table if not exists workspace_members (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  role text default 'member',
  created_at timestamptz default now()
);

create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  name text,
  brand_name text,
  website_url text,
  category text,
  market text,
  goal text,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists jobs (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  project_id uuid references projects(id) on delete set null,
  type text,
  status text,
  payload jsonb,
  result jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists content_assets (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  source_platform text,
  source_type text,
  url text,
  title text,
  creator_name text,
  thumbnail_url text,
  publish_date text,
  views integer,
  engagement integer,
  hook_text text,
  cta_text text,
  narrative_type text,
  selling_points text[],
  sentiment_summary text,
  ai_quality_score numeric,
  ad_suitability_score numeric
);

create table if not exists insights (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  title text,
  summary text,
  source_type text,
  created_at timestamptz default now()
);

create table if not exists scripts (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  title text,
  duration_seconds integer,
  script_text text,
  cta_options text[]
);

create table if not exists storyboards (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  title text,
  frames integer,
  summary text
);

create table if not exists creative_variants (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  hook_type text,
  narrative_type text,
  cta_type text,
  platform_fit text
);

create table if not exists preview_assets (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  type text,
  url text,
  status text
);

create table if not exists export_jobs (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  format text,
  status text,
  created_at timestamptz default now()
);

create table if not exists api_keys (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  provider text,
  value text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_projects_workspace on projects(workspace_id);
create index if not exists idx_jobs_workspace on jobs(workspace_id);
create index if not exists idx_assets_project on content_assets(project_id);
create index if not exists idx_insights_project on insights(project_id);
create index if not exists idx_scripts_project on scripts(project_id);
create index if not exists idx_storyboards_project on storyboards(project_id);
create index if not exists idx_variants_project on creative_variants(project_id);
create index if not exists idx_preview_project on preview_assets(project_id);
create index if not exists idx_exports_project on export_jobs(project_id);
create index if not exists idx_keys_workspace on api_keys(workspace_id);
