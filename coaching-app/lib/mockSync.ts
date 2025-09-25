import { supabase } from './supabase';

export async function mockSync(platform: 'tiktok' | 'instagram') {
  // Generate 7 days of snapshots with realistic deltas
  const baseFollowers = Math.floor(1000 + Math.random() * 4000);
  const rows = Array.from({ length: 7 }).map((_, i) => ({
    platform,
    followers: baseFollowers + i * Math.floor(20 + Math.random() * 50),
    views: 2000 + i * Math.floor(200 + Math.random() * 500),
    likes: 200 + i * Math.floor(20 + Math.random() * 60),
    comments: 30 + i * Math.floor(5 + Math.random() * 20),
    captured_at: new Date(Date.now() - (6 - i) * 24 * 3600 * 1000).toISOString(),
  }));

  const { error } = await supabase.from('metrics_snapshots').insert(rows);
  if (error) throw error;
}
