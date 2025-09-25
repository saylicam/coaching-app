import { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Switch } from 'react-native';
import { supabase } from '../../lib/supabase';
import { requestNotificationPermissions } from '../../lib/notifications';
import { NICHES } from '../../constants/niches';

export default function Settings() {
  const [username, setUsername] = useState('');
  const [niche, setNiche] = useState<string>('autre');
  const [cadence, setCadence] = useState<'1-2_sem' | '3-4_sem' | 'quotidien'>('1-2_sem');
  const [notifications, setNotifications] = useState(false);

  useEffect(() => {
    (async () => {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
      if (data) {
        setUsername(data.username ?? '');
        setNiche(data.niche ?? 'autre');
        setCadence((data.cadence ?? '1-2_sem') as any);
      }
    })();
  }, []);

  const save = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;
    await supabase.from('profiles').upsert({ id: user.id, username, niche, cadence });
  };

  return (
    <View className="flex-1 bg-white p-4 gap-4">
      <Text className="text-xl font-semibold">Settings</Text>
      <Text>Username</Text>
      <TextInput className="border rounded p-2" value={username} onChangeText={setUsername} />
      <Text>Niche</Text>
      <View className="flex-row flex-wrap gap-2">
        {NICHES.map((n) => (
          <Pressable key={n} className={`px-3 py-2 rounded border ${n === niche ? 'bg-black' : 'bg-white'}`} onPress={() => setNiche(n)}>
            <Text className={`${n === niche ? 'text-white' : 'text-black'}`}>{n}</Text>
          </Pressable>
        ))}
      </View>
      <Text>Cadence</Text>
      <View className="flex-row gap-2">
        {(['1-2_sem', '3-4_sem', 'quotidien'] as const).map((c) => (
          <Pressable key={c} className={`px-3 py-2 rounded border ${c === cadence ? 'bg-black' : 'bg-white'}`} onPress={() => setCadence(c)}>
            <Text className={`${c === cadence ? 'text-white' : 'text-black'}`}>{c}</Text>
          </Pressable>
        ))}
      </View>
      <View className="flex-row items-center gap-2">
        <Text>Enable notifications</Text>
        <Switch value={notifications} onValueChange={async (v) => {
          setNotifications(v);
          if (v) await requestNotificationPermissions();
        }} />
      </View>
      <Pressable className="mt-2 rounded bg-black p-3" onPress={save}>
        <Text className="text-center text-white">Save</Text>
      </Pressable>
    </View>
  );
}
