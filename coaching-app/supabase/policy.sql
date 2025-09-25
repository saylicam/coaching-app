-- RLS policies (adjust as needed)
alter table public.profiles enable row level security;
alter table public.content_schedule enable row level security;
alter table public.metrics_snapshots enable row level security;
alter table public.social_accounts enable row level security;

create policy "profiles are viewable by owner" on public.profiles for select using (auth.uid() = id);
create policy "profiles are updatable by owner" on public.profiles for update using (auth.uid() = id);
create policy "profiles can be inserted by owner" on public.profiles for insert with check (auth.uid() = id);

create policy "content_schedule by owner" on public.content_schedule
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "metrics by owner" on public.metrics_snapshots
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "social by owner" on public.social_accounts
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- trending_sounds is public read-only
alter table public.trending_sounds enable row level security;
create policy "trending sounds readable" on public.trending_sounds for select using (true);
