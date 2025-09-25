import { View, Text } from 'react-native';
import type { PostIdea } from '../types/db';

export default function IdeaItem({ idea }: { idea: PostIdea }) {
  return (
    <View className="mb-3 rounded border border-gray-200 p-3">
      <Text className="font-medium">{idea.title}</Text>
      {idea.prompt ? <Text className="text-sm text-gray-600">{idea.prompt}</Text> : null}
      <Text className="text-xs text-gray-500">{idea.niche} • {idea.difficulty} • {idea.format}</Text>
    </View>
  );
}
