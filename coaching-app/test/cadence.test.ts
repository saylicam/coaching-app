import { describe, it, expect } from 'vitest';
import { computeNextDueDates, projectGrowth } from '../lib/cadence';

describe('cadence', () => {
  it('computes 1-2/week on Tue & Fri', () => {
    const dates = computeNextDueDates('1-2_sem', 'Europe/Brussels', '2025-01-05T00:00:00.000Z', 4);
    expect(dates.length).toBe(4);
  });

  it('projects growth', () => {
    const series = projectGrowth(5, 4, 1000);
    expect(series[series.length - 1]).toBeGreaterThan(1000);
  });
});
