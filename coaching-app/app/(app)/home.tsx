import { View, Text, ScrollView } from 'react-native';
import Card from '../../components/Card';
import TrendListItem from '../../components/TrendListItem';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';

export default function Home() {
  const { data: trends } = useQuery({
    queryKey: ['trending_sounds'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trending_sounds')
        .select('*')
        .order('velocity', { ascending: false })
        .limit(10);
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Card title="Your plan">
        <Text>Cadence: TBD</Text>
        <Text>Next post due: TBD</Text>
        <Text>Streak: 0</Text>
        <Text>Projected growth: +0%</Text>
      </Card>
      <Card title="Today's idea">
        <Text>Idea based on your niche will appear here.</Text>
      </Card>
      <Card title="Trending sounds">
        {trends?.map((t) => (
          <TrendListItem key={t.id} item={t} />
        ))}
      </Card>
    </ScrollView>
  );
}
