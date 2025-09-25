import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { View, Text, FlatList, Pressable } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function Planner() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ['content_schedule'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content_schedule')
        .select('*, post_ideas(*)')
        .order('due_at', { ascending: true })
        .limit(50);
      if (error) throw error;
      return data ?? [];
    },
  });

  const markPosted = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('content_schedule').update({ status: 'posted' }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['content_schedule'] }),
  });

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View className="mb-3 rounded border border-gray-200 p-3">
            <Text className="font-medium">{item.post_ideas?.title ?? 'Planned post'}</Text>
            <Text className="text-xs text-gray-500">Due: {new Date(item.due_at).toLocaleString()}</Text>
            <Text className="text-xs">Status: {item.status}</Text>
            {item.status !== 'posted' && (
              <Pressable className="mt-2 rounded bg-black p-2" onPress={() => markPosted.mutate(item.id)}>
                <Text className="text-center text-white">Mark posted</Text>
              </Pressable>
            )}
          </View>
        )}
      />
    </View>
  );
}
