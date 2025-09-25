import { useQuery } from '@tanstack/react-query';
import { View, Text, Pressable } from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';
import { supabase } from '../../lib/supabase';
import { mockSync } from '../../lib/mockSync';

export default function Dashboard() {
  const { data: snapshots, refetch } = useQuery({
    queryKey: ['metrics_snapshots'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('metrics_snapshots')
        .select('*')
        .order('captured_at', { ascending: true })
        .gte('captured_at', new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString());
      if (error) throw error;
      return data ?? [];
    },
  });

  const lineData = (snapshots ?? []).map((s, i) => ({ x: i + 1, y: s.followers ?? 0 }));

  const onMockSync = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;
    await mockSync('tiktok', user.id);
    await refetch();
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-semibold mb-2">Followers (last 30 days)</Text>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine data={lineData} interpolation="monotoneX" />
      </VictoryChart>
      <Pressable className="mt-4 rounded bg-black p-3" onPress={onMockSync}>
        <Text className="text-center text-white">Mock Sync</Text>
      </Pressable>
    </View>
  );
}
