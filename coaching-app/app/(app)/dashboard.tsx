import { View, Text, ScrollView, Pressable } from 'react-native';
import { VictoryAxis, VictoryLine, VictoryChart, VictoryTheme } from 'victory-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { mockSync } from '../../lib/mockSync';

export default function DashboardScreen() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ['metrics_snapshots'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('metrics_snapshots')
        .select('*')
        .order('captured_at', { ascending: true })
        .gte('captured_at', new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString());
      if (error) throw error;
      return data;
    },
  });

  const sync = useMutation({
    mutationFn: async (platform: 'tiktok' | 'instagram') => {
      await mockSync(platform);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['metrics_snapshots'] }),
  });

  const followersData = data?.map((d: any, i: number) => ({ x: i + 1, y: d.followers ?? 0 })) ?? [];

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 16 }}>
      <Text className="text-2xl font-semibold mb-4">Dashboard</Text>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryAxis />
        <VictoryAxis dependentAxis tickFormat={(t) => `${t}`} />
        <VictoryLine data={followersData} />
      </VictoryChart>
      <View className="flex-row gap-3 mt-4">
        <Pressable className="bg-black rounded-md px-4 py-3" onPress={() => sync.mutate('tiktok')}>
          <Text className="text-white">Mock Sync TikTok</Text>
        </Pressable>
        <Pressable className="bg-black rounded-md px-4 py-3" onPress={() => sync.mutate('instagram')}>
          <Text className="text-white">Mock Sync IG</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
