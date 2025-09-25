import { Link } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useSession } from '../../store/useSession';

export default function MagicLinkScreen() {
  const { signInWithMagicLink, isLoading } = useSession();
  const [email, setEmail] = useState('');

  return (
    <View className="flex-1 items-center justify-center px-6 bg-white">
      <Text className="text-2xl font-semibold mb-6">Magic link</Text>
      <TextInput
        className="w-full border rounded-md px-4 py-3 mb-3"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <Pressable
        className="w-full bg-black rounded-md py-3 mb-3"
        onPress={() => signInWithMagicLink({ email })}
        disabled={isLoading}
      >
        <Text className="text-center text-white font-medium">
          {isLoading ? 'Sending…' : 'Send magic link'}
        </Text>
      </Pressable>
      <Link href="/(auth)/sign-in" className="text-brand-accent">Back to sign in</Link>
    </View>
  );
}
