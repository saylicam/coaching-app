import { PropsWithChildren } from 'react';
import { View, Text } from 'react-native';

type Props = PropsWithChildren<{ title?: string }>;

export default function Card({ title, children }: Props) {
  return (
    <View className="mb-4 rounded-xl border border-gray-200 bg-white shadow-sm">
      {title ? <Text className="px-4 pt-4 text-lg font-semibold">{title}</Text> : null}
      <View className="p-4">{children}</View>
    </View>
  );
}
