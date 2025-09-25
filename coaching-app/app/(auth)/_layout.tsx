import { Stack, router } from 'expo-router';
import { useEffect } from 'react';
import { useSession } from '../../store/useSession';

export default function AuthLayout() {
  const { session } = useSession();
  useEffect(() => {
    if (session) router.replace('/(app)/home');
  }, [session]);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="magic-link" />
    </Stack>
  );
}
