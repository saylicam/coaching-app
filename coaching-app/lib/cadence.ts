import dayjs from 'dayjs';

export type Cadence = '1-2_sem' | '3-4_sem' | 'quotidien';

export function computeNextDueDates(
  cadence: Cadence,
  timezone: string,
  startDate: string,
  count: number
): string[] {
  const start = dayjs(startDate);
  const dates: string[] = [];

  if (cadence === 'quotidien') {
    for (let i = 0; i < count; i++) {
      dates.push(start.add(i, 'day').hour(18).minute(0).second(0).toISOString());
    }
    return dates;
  }

  // For weekly cadences: Tue & Fri for 1-2/week; Mon, Wed, Fri, Sun for 3-4/week
  const daysOfWeek = cadence === '1-2_sem' ? [2, 5] : [1, 3, 5, 0]; // 0=Sun ... 6=Sat
  let current = start.startOf('day');
  while (dates.length < count) {
    if (daysOfWeek.includes(current.day())) {
      dates.push(current.hour(18).minute(0).second(0).toISOString());
    }
    current = current.add(1, 'day');
  }
  return dates;
}

export function projectGrowth(weeklyPercent: number, weeks: number, startingFollowers: number): number[] {
  const series: number[] = [];
  let current = startingFollowers;
  for (let i = 0; i < weeks; i++) {
    current = Math.round(current * (1 + weeklyPercent / 100));
    series.push(current);
  }
  return series;
}
