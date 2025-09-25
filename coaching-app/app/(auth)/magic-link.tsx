import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function MagicLink() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSend = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setError(error.message);
    else setSent(true);
  };

  return (
    <View className="flex-1 items-center justify-center p-6 gap-4 bg-white">
      <Text className="text-2xl font-semibold">Magic Link</Text>
      <TextInput
        className="w-full border rounded p-3"
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {error ? <Text className="text-red-600">{error}</Text> : null}
      <Pressable className="w-full bg-black p-3 rounded" onPress={onSend}>
        <Text className="text-white text-center">Send magic link</Text>
      </Pressable>
      {sent && <Text>Check your email for the link.</Text>}
      <Link href="/(auth)/sign-in" className="text-blue-600">Back to sign in</Link>
    </View>
  );
}
