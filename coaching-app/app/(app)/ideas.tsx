import { View, Text, FlatList, RefreshControl, Pressable } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import IdeaItem from '../../components/IdeaItem';
import { useFilters } from '../../store/useFilters';
import { useSession } from '../../store/useSession';
import { computeNextDueDates } from '../../lib/cadence';

export default function IdeasScreen() {
  const { niche, difficulty, format, setFilters } = useFilters();
  const { profile, session } = useSession();
  const { data, refetch, isRefetching } = useQuery({
    queryKey: ['post_ideas', niche, difficulty, format],
    queryFn: async () => {
      let query = supabase.from('post_ideas').select('*').limit(50);
      if (niche) query = query.eq('niche', niche);
      if (difficulty) query = query.eq('difficulty', difficulty);
      if (format) query = query.eq('format', format);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  async function generateFive() {
    const userId = session?.user.id;
    if (!userId) return;
    const userNiche = profile?.niche || 'autre';
    const tz = profile?.timezone || 'Europe/Brussels';
    const cadence = profile?.cadence || '1-2_sem';
    // Fetch 5 random ideas for niche
    const { data: all } = await supabase.from('post_ideas').select('*').eq('niche', userNiche).limit(50);
    const picks = (all || []).sort(() => 0.5 - Math.random()).slice(0, 5);
    const dates = computeNextDueDates(cadence as any, tz, new Date().toISOString(), 20);
    const upcoming = dates.slice(0, 5);
    const rows = picks.map((p, idx) => ({ user_id: userId, idea_id: p.id, niche: userNiche, due_at: upcoming[idx], status: 'planned' }));
    await supabase.from('content_schedule').insert(rows);
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        renderItem={({ item }) => (
          <IdeaItem title={item.title} prompt={item.prompt} difficulty={item.difficulty} format={item.format} />
        )}
        ListHeaderComponent={
          <View className="p-4">
            <Text className="text-xl font-semibold mb-2">Ideas</Text>
            <Pressable className="bg-black rounded-md px-4 py-3 w-48" onPress={generateFive}>
              <Text className="text-white text-center">Generate 5</Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
}
