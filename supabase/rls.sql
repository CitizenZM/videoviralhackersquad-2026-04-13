alter table workspaces enable row level security;
alter table users enable row level security;
alter table workspace_members enable row level security;
alter table projects enable row level security;
alter table jobs enable row level security;
alter table content_assets enable row level security;
alter table insights enable row level security;
alter table scripts enable row level security;
alter table storyboards enable row level security;
alter table creative_variants enable row level security;
alter table preview_assets enable row level security;
alter table export_jobs enable row level security;
alter table api_keys enable row level security;

create policy "workspace_members_select" on workspace_members
  for select using (user_id = auth.uid());

create policy "workspace_members_insert" on workspace_members
  for insert with check (user_id = auth.uid());

create policy "workspaces_select" on workspaces
  for select using (
    exists (
      select 1 from workspace_members
      where workspace_members.workspace_id = workspaces.id
        and workspace_members.user_id = auth.uid()
    )
  );

create policy "projects_select" on projects
  for select using (
    exists (
      select 1 from workspace_members
      where workspace_members.workspace_id = projects.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  );

create policy "jobs_select" on jobs
  for select using (
    exists (
      select 1 from workspace_members
      where workspace_members.workspace_id = jobs.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  );

create policy "content_assets_select" on content_assets
  for select using (
    exists (
      select 1 from workspace_members
      where workspace_members.workspace_id = content_assets.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  );

create policy "insights_select" on insights
  for select using (
    exists (
      select 1 from workspace_members
      where workspace_members.workspace_id = insights.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  );

create policy "scripts_select" on scripts
  for select using (
    exists (
      select 1 from workspace_members
      where workspace_members.workspace_id = scripts.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  );

create policy "storyboards_select" on storyboards
  for select using (
    exists (
      select 1 from workspace_members
      where workspace_members.workspace_id = storyboards.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  );

create policy "creative_variants_select" on creative_variants
  for select using (
    exists (
      select 1 from workspace_members
      where workspace_members.workspace_id = creative_variants.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  );

create policy "preview_assets_select" on preview_assets
  for select using (
    exists (
      select 1 from workspace_members
      where workspace_members.workspace_id = preview_assets.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  );

create policy "export_jobs_select" on export_jobs
  for select using (
    exists (
      select 1 from workspace_members
      where workspace_members.workspace_id = export_jobs.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  );

create policy "api_keys_select" on api_keys
  for select using (
    exists (
      select 1 from workspace_members
      where workspace_members.workspace_id = api_keys.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  );

create policy "api_keys_write" on api_keys
  for all using (
    exists (
      select 1 from workspace_members
      where workspace_members.workspace_id = api_keys.workspace_id
        and workspace_members.user_id = auth.uid()
        and workspace_members.role in ('owner', 'admin')
    )
  ) with check (
    exists (
      select 1 from workspace_members
      where workspace_members.workspace_id = api_keys.workspace_id
        and workspace_members.user_id = auth.uid()
        and workspace_members.role in ('owner', 'admin')
    )
  );
