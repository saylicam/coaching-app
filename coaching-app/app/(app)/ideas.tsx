import { useQuery } from '@tanstack/react-query';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useFilters } from '../../store/useFilters';

export default function Ideas() {
  const { filters } = useFilters();
  const { data, refetch, isFetching } = useQuery({
    queryKey: ['ideas', filters],
    queryFn: async () => {
      let query = supabase.from('post_ideas').select('*');
      if (filters.niche) query = query.eq('niche', filters.niche);
      if (filters.difficulty) query = query.eq('difficulty', filters.difficulty);
      if (filters.format) query = query.eq('format', filters.format);
      const { data, error } = await query.limit(50);
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View className="mb-3 rounded border border-gray-200 p-3">
            <Text className="font-medium">{item.title}</Text>
            {item.prompt ? <Text className="text-sm text-gray-600">{item.prompt}</Text> : null}
            <Text className="text-xs text-gray-500">{item.niche} • {item.difficulty} • {item.format}</Text>
          </View>
        )}
      />
    </View>
  );
}
