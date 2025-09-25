import { View, Text } from 'react-native';

export default function TrendListItem({ title, platform, velocity }: { title: string; platform: string; velocity: number; }) {
  return (
    <View className="flex-row items-center justify-between py-2 border-b border-gray-100">
      <View>
        <Text className="text-base font-medium">{title}</Text>
        <Text className="text-xs text-gray-500">{platform}</Text>
      </View>
      <Text className="text-sm text-brand-accent">{velocity}</Text>
    </View>
  );
}
