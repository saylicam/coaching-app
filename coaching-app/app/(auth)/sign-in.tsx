import { Link, router } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useSession } from '../../store/useSession';

export default function SignInScreen() {
  const { signInWithPassword, isLoading, session } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (session) {
    router.replace('/(app)/home');
  }

  return (
    <View className="flex-1 items-center justify-center px-6 bg-white">
      <Text className="text-2xl font-semibold mb-6">Sign in</Text>
      <TextInput
        className="w-full border rounded-md px-4 py-3 mb-3"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="w-full border rounded-md px-4 py-3 mb-4"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Pressable
        className="w-full bg-black rounded-md py-3 mb-3"
        onPress={() => signInWithPassword({ email, password })}
        disabled={isLoading}
      >
        <Text className="text-center text-white font-medium">
          {isLoading ? 'Signing in…' : 'Sign in'}
        </Text>
      </Pressable>
      <Link href="/(auth)/magic-link" className="text-brand-accent mb-6">Use magic link</Link>
      <View className="flex-row">
        <Text>New here? </Text>
        <Link href="/(auth)/sign-up" className="text-brand-accent">Create an account</Link>
      </View>
    </View>
  );
}
