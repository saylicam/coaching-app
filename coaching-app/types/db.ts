export type Profile = {
  id: string;
  username: string | null;
  niche: 'musculation' | 'humour' | 'bien-etre' | 'lifestyle' | 'gaming' | 'autre';
  cadence: '1-2_sem' | '3-4_sem' | 'quotidien';
  timezone: string;
  created_at: string;
};

export type PostIdea = {
  id: string;
  niche: string;
  title: string;
  prompt?: string | null;
  difficulty: 'facile' | 'moyen' | 'avance';
  format: 'short' | 'carousel' | 'live' | 'photo';
};

export type ContentSchedule = {
  id: string;
  user_id: string;
  due_at: string;
  niche?: string | null;
  idea_id?: string | null;
  status: 'planned' | 'posted' | 'skipped';
  note?: string | null;
};

export type TrendingSound = {
  id: string;
  platform: 'tiktok' | 'instagram';
  title: string;
  url?: string | null;
  niche?: string | null;
  velocity: number;
  region: string;
  created_at: string;
};

export type MetricsSnapshot = {
  id: string;
  user_id: string;
  platform: 'tiktok' | 'instagram';
  captured_at: string;
  followers?: number | null;
  views?: number | null;
  likes?: number | null;
  comments?: number | null;
};

export type SocialAccount = {
  id: string;
  user_id: string;
  platform: 'tiktok' | 'instagram';
  handle?: string | null;
  connected: boolean;
};
