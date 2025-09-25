import { computeNextDueDates, projectedWeeklyGrowthPercent } from '../lib/cadence';

test('daily cadence produces consecutive days', () => {
  const start = new Date('2024-01-01T00:00:00Z');
  const items = computeNextDueDates('quotidien', start, 3, 18);
  expect(items).toHaveLength(3);
  expect(new Date(items[1].dueAt).getDate()).toBe(new Date(items[0].dueAt).getDate() + 1);
});

test('growth percentages', () => {
  expect(projectedWeeklyGrowthPercent('quotidien')).toBe(8);
  expect(projectedWeeklyGrowthPercent('3-4_sem')).toBe(5);
  expect(projectedWeeklyGrowthPercent('1-2_sem')).toBe(2);
});
