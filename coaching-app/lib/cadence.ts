import { addDays, setHours, setMinutes, nextTuesday, nextFriday, nextMonday, nextWednesday, nextThursday, nextSaturday, nextSunday } from 'date-fns';

export type Cadence = '1-2_sem' | '3-4_sem' | 'quotidien';

export type PlannedItem = {
  dueAt: Date;
};

export function computeNextDueDates(cadence: Cadence, start: Date, count = 14, hour = 18): PlannedItem[] {
  const results: PlannedItem[] = [];

  function atHour(d: Date) {
    const withHour = setHours(d, hour);
    return setMinutes(withHour, 0);
  }

  if (cadence === 'quotidien') {
    for (let i = 0; i < count; i++) {
      results.push({ dueAt: atHour(addDays(start, i)) });
    }
    return results;
  }

  if (cadence === '1-2_sem') {
    // Next Tue and Fri for 7 weeks (~14 items)
    let current = start;
    for (let i = 0; i < count; i++) {
      const isEven = i % 2 === 0;
      const next = isEven ? nextTuesday(current) : nextFriday(current);
      results.push({ dueAt: atHour(next) });
      current = addDays(next, 1);
    }
    return results;
  }

  // 3–4 per week: Mon, Wed, Thu, Sat pattern
  const pattern = [nextMonday, nextWednesday, nextThursday, nextSaturday];
  let current = start;
  for (let i = 0; i < count; i++) {
    const nextFn = pattern[i % pattern.length];
    const next = nextFn(current);
    results.push({ dueAt: atHour(next) });
    current = addDays(next, 1);
  }
  return results;
}

export function projectedWeeklyGrowthPercent(cadence: Cadence): number {
  switch (cadence) {
    case 'quotidien':
      return 8;
    case '3-4_sem':
      return 5;
    case '1-2_sem':
    default:
      return 2;
  }
}
