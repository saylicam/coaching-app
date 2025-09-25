import { View, Text, Pressable } from 'react-native';

type Trend = {
  id: string;
  platform: 'tiktok' | 'instagram';
  title: string;
  url?: string | null;
  niche?: string | null;
  velocity?: number | null;
  region?: string | null;
};

export default function TrendListItem({ item }: { item: Trend }) {
  return (
    <Pressable className="flex-row items-center justify-between py-3">
      <View>
        <Text className="font-medium">{item.title}</Text>
        <Text className="text-xs text-gray-500">{item.platform} • {item.region ?? 'global'}</Text>
      </View>
      <Text className="text-xs text-gray-700">{item.velocity ?? 0}</Text>
    </Pressable>
  );
}
