import { View, Text, ViewProps } from 'react-native';
import clsx from 'clsx';

type Props = ViewProps & { title?: string };

export default function Card({ title, className, children, ...rest }: Props) {
  return (
    <View className={clsx('w-full border rounded-xl p-4 bg-white shadow-sm', className)} {...rest}>
      {title ? <Text className="text-lg font-semibold mb-2">{title}</Text> : null}
      {children}
    </View>
  );
}
