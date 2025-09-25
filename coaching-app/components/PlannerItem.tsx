import { View, Text, Pressable } from 'react-native';

export default function PlannerItem({ title, dueAt, status, onMarkPosted }: { title: string; dueAt: string; status: string; onMarkPosted: () => void; }) {
  return (
    <View className="px-4 py-3 border-b border-gray-100 flex-row items-center justify-between">
      <View>
        <Text className="text-base font-medium">{title}</Text>
        <Text className="text-xs text-gray-500 mt-1">{dueAt} • {status}</Text>
      </View>
      {status !== 'posted' && (
        <Pressable className="bg-black rounded-md px-3 py-2" onPress={onMarkPosted}>
          <Text className="text-white text-sm">Mark posted</Text>
        </Pressable>
      )}
    </View>
  );
}
