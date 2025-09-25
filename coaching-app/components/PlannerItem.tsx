import { View, Text, Pressable } from 'react-native';

type Item = {
  id: string;
  due_at: string;
  status: 'planned' | 'posted' | 'skipped';
  post_ideas?: { title?: string | null } | null;
};

export default function PlannerItem({ item, onMarkPosted }: { item: Item; onMarkPosted: (id: string) => void }) {
  return (
    <View className="mb-3 rounded border border-gray-200 p-3">
      <Text className="font-medium">{item.post_ideas?.title ?? 'Planned post'}</Text>
      <Text className="text-xs text-gray-500">Due: {new Date(item.due_at).toLocaleString()}</Text>
      <Text className="text-xs">Status: {item.status}</Text>
      {item.status !== 'posted' && (
        <Pressable className="mt-2 rounded bg-black p-2" onPress={() => onMarkPosted(item.id)}>
          <Text className="text-center text-white">Mark posted</Text>
        </Pressable>
      )}
    </View>
  );
}
