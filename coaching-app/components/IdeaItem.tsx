import { View, Text } from 'react-native';

export default function IdeaItem({ title, prompt, difficulty, format }: { title: string; prompt?: string; difficulty: string; format: string; }) {
  return (
    <View className="px-4 py-3 border-b border-gray-100">
      <Text className="text-base font-medium">{title}</Text>
      {prompt ? <Text className="text-sm text-gray-600 mt-1">{prompt}</Text> : null}
      <Text className="text-xs text-gray-500 mt-1">{difficulty} • {format}</Text>
    </View>
  );
}
