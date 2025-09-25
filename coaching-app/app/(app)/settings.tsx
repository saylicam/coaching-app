import { View, Text, ScrollView, Pressable, Switch } from 'react-native';
import { useSession } from '../../store/useSession';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function SettingsScreen() {
  const { profile, setProfile } = useSession();
  const [notifications, setNotifications] = useState(true);

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 16 }}>
      <Text className="text-2xl font-semibold mb-4">Settings</Text>
      <View className="flex-row items-center justify-between py-3">
        <Text className="text-base">Notifications</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>
      <Pressable className="bg-black rounded-md px-4 py-3 mt-6" onPress={() => supabase.auth.signOut()}>
        <Text className="text-white text-center">Sign out</Text>
      </Pressable>
    </ScrollView>
  );
}
