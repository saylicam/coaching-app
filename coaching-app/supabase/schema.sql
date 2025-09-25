-- Enable pgcrypto for gen_random_uuid
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text,
  niche text check (niche in ('musculation','humour','bien-etre','lifestyle','gaming','autre')) default 'autre',
  cadence text check (cadence in ('1-2_sem','3-4_sem','quotidien')) default '1-2_sem',
  timezone text default 'Europe/Brussels',
  created_at timestamptz default now()
);

create table if not exists public.post_ideas (
  id uuid primary key default gen_random_uuid(),
  niche text not null,
  title text not null,
  prompt text,
  difficulty text check (difficulty in ('facile','moyen','avance')) default 'facile',
  format text check (format in ('short','carousel','live','photo')) default 'short'
);

create table if not exists public.content_schedule (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  due_at timestamptz not null,
  niche text,
  idea_id uuid references public.post_ideas(id),
  status text check (status in ('planned','posted','skipped')) default 'planned',
  note text
);

create table if not exists public.trending_sounds (
  id uuid primary key default gen_random_uuid(),
  platform text check (platform in ('tiktok','instagram')) not null,
  title text not null,
  url text,
  niche text,
  velocity int default 0,
  region text default 'global',
  created_at timestamptz default now()
);

create table if not exists public.metrics_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  platform text check (platform in ('tiktok','instagram')) not null,
  captured_at timestamptz default now(),
  followers int,
  views int,
  likes int,
  comments int
);

create table if not exists public.social_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  platform text check (platform in ('tiktok','instagram')) not null,
  handle text,
  connected boolean default false
);
