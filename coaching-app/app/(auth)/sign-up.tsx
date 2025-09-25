import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSignUp = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.replace('/(app)/home');
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-6 gap-4 bg-white">
      <Text className="text-2xl font-semibold">Sign Up</Text>
      <TextInput
        className="w-full border rounded p-3"
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="w-full border rounded p-3"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text className="text-red-600">{error}</Text> : null}
      <Pressable className="w-full bg-black p-3 rounded" onPress={onSignUp} disabled={loading}>
        <Text className="text-white text-center">{loading ? 'Creating...' : 'Create account'}</Text>
      </Pressable>
      <Link href="/(auth)/sign-in" className="text-blue-600">Already have an account? Sign in</Link>
    </View>
  );
}
