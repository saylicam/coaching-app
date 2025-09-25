import { Redirect } from 'expo-router';
import { useSession } from '../store/useSession';

export default function Index() {
  const { session, profile } = useSession();
  if (!session) return <Redirect href="/(auth)/sign-in" />;
  // If profile missing or default values, go to onboarding
  if (!profile || profile.niche === 'autre') {
    return <Redirect href="/(app)/onboarding" />;
  }
  return <Redirect href="/(app)/home" />;
}
