import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { NICHES } from '../../constants/niches';
import { useSession } from '../../store/useSession';
import { supabase } from '../../lib/supabase';
import { computeNextDueDates, Cadence } from '../../lib/cadence';
import { schedulePostNotifications } from '../../lib/notifications';
import { router } from 'expo-router';

const CADENCES: { key: Cadence; label: string }[] = [
  { key: '1-2_sem', label: '1–2 / semaine' },
  { key: '3-4_sem', label: '3–4 / semaine' },
  { key: 'quotidien', label: 'Quotidien' },
];

export default function Onboarding() {
  const { session, profile, setProfile } = useSession();
  const [niche, setNiche] = useState<string>(profile?.niche ?? 'autre');
  const [cadence, setCadence] = useState<Cadence>(profile?.cadence ?? '1-2_sem');
  const [saving, setSaving] = useState(false);

  const userId = session?.user.id as string;

  async function save() {
    if (!userId) return;
    setSaving(true);
    const tz = profile?.timezone ?? 'Europe/Brussels';
    await supabase.from('profiles').upsert({ id: userId, niche, cadence, timezone: tz });
    const dates = computeNextDueDates(cadence, tz, new Date().toISOString(), 14);
    const rows = dates.map((d) => ({ user_id: userId, due_at: d, niche, status: 'planned' }));
    await supabase.from('content_schedule').insert(rows);
    for (const r of rows) {
      await schedulePostNotifications(r.due_at, 'Planified post');
    }
    setProfile({ id: userId, username: profile?.username ?? null, niche, cadence, timezone: tz });
    setSaving(false);
    router.replace('/(app)/home');
  }

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-2xl font-semibold mb-4">Onboarding</Text>
      <Text className="text-base mb-2">Choisis ta niche</Text>
      <View className="flex-row flex-wrap gap-2">
        {NICHES.map((n) => (
          <Pressable
            key={n}
            className={`px-3 py-2 rounded-md border ${niche === n ? 'bg-black' : ''}`}
            onPress={() => setNiche(n)}
          >
            <Text className={niche === n ? 'text-white' : ''}>{n}</Text>
          </Pressable>
        ))}
      </View>
      <Text className="text-base mt-6 mb-2">Cadence de publication</Text>
      <View className="flex-row flex-wrap gap-2">
        {CADENCES.map((c) => (
          <Pressable
            key={c.key}
            className={`px-3 py-2 rounded-md border ${cadence === c.key ? 'bg-black' : ''}`}
            onPress={() => setCadence(c.key)}
          >
            <Text className={cadence === c.key ? 'text-white' : ''}>{c.label}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable
        className="mt-8 bg-black rounded-md py-3"
        onPress={save}
        disabled={saving}
      >
        <Text className="text-white text-center font-medium">{saving ? 'Enregistrement…' : 'Continuer'}</Text>
      </Pressable>
    </View>
  );
}
