import { View, Text, FlatList, Pressable } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import PlannerItem from '../../components/PlannerItem';
import dayjs from 'dayjs';
import { CalendarList } from 'react-native-calendars';
import { useSession } from '../../store/useSession';

export default function PlannerScreen() {
  const qc = useQueryClient();
  const { session } = useSession();
  const { data } = useQuery({
    queryKey: ['content_schedule'],
    queryFn: async () => {
      const userId = session?.user.id as string;
      const { data, error } = await supabase
        .from('content_schedule')
        .select('*, post_ideas(*)')
        .eq('user_id', userId)
        .order('due_at', { ascending: true })
        .limit(100);
      if (error) throw error;
      return data;
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
      <CalendarList horizontal pagingEnabled hideArrows={false} style={{ height: 320 }} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlannerItem
            title={item.post_ideas?.title || 'Custom post'}
            dueAt={dayjs(item.due_at).format('ddd DD MMM HH:mm')}
            status={item.status}
            onMarkPosted={() => markPosted.mutate(item.id)}
          />
        )}
        ListHeaderComponent={<Text className="text-xl font-semibold p-4">Planner</Text>}
      />
      <Pressable className="absolute right-5 bottom-8 bg-black rounded-full px-5 py-3">
        <Text className="text-white font-medium">Add post</Text>
      </Pressable>
    </View>
  );
}
