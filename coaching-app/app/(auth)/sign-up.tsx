import { Link, router } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useSession } from '../../store/useSession';

export default function SignUpScreen() {
  const { signUpWithPassword, isLoading, session } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (session) {
    router.replace('/(app)/home');
  }

  return (
    <View className="flex-1 items-center justify-center px-6 bg-white">
      <Text className="text-2xl font-semibold mb-6">Create account</Text>
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
        onPress={() => signUpWithPassword({ email, password })}
        disabled={isLoading}
      >
        <Text className="text-center text-white font-medium">
          {isLoading ? 'Creating…' : 'Create account'}
        </Text>
      </Pressable>
      <View className="flex-row">
        <Text>Have an account? </Text>
        <Link href="/(auth)/sign-in" className="text-brand-accent">Sign in</Link>
      </View>
    </View>
  );
}
