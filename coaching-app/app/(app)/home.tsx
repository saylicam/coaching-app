import { View, Text, ScrollView } from 'react-native';
import Card from '../../components/Card';
import TrendListItem from '../../components/TrendListItem';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { useSession } from '../../store/useSession';
import dayjs from 'dayjs';

export default function HomeScreen() {
  const { profile } = useSession();
  const { data: sounds } = useQuery({
    queryKey: ['trending_sounds', profile?.niche],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trending_sounds')
        .select('*')
        .order('velocity', { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    },
  });

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 16 }}>
      <Text className="text-2xl font-semibold mb-4">Bienvenue 👋</Text>
      <Card title="Your plan">
        <Text>Cadence: {profile?.cadence ?? '—'}</Text>
        <Text>Next post: {dayjs().add(1, 'day').format('ddd HH:mm')}</Text>
        <Text>Streak: 0</Text>
        <Text>Projected growth (4w): +5%</Text>
      </Card>
      <Card title="Today's idea" className="mt-4">
        <Text>Make a quick tip about your niche.</Text>
      </Card>
      <Card title="Trending sounds" className="mt-4">
        {sounds?.map((s: any) => (
          <TrendListItem key={s.id} title={s.title} platform={s.platform} velocity={s.velocity} />
        ))}
      </Card>
    </ScrollView>
  );
}
