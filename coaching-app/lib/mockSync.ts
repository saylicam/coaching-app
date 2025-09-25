import { subDays } from 'date-fns';
import { supabase } from './supabase';

export async function mockSync(platform: 'tiktok' | 'instagram', userId: string) {
  // Insert 30 days of metrics with plausible deltas
  const rows = Array.from({ length: 30 }).map((_, i) => {
    const day = subDays(new Date(), 29 - i);
    const base = 1000 + i * 20;
    const followers = base + Math.round(Math.random() * 30);
    const views = 500 + Math.round(Math.random() * 2000);
    const likes = 50 + Math.round(Math.random() * 200);
    const comments = 5 + Math.round(Math.random() * 40);
    return {
      user_id: userId,
      platform,
      captured_at: day.toISOString(),
      followers,
      views,
      likes,
      comments,
    };
  });
  const { error } = await supabase.from('metrics_snapshots').insert(rows);
  if (error) throw error;
}
