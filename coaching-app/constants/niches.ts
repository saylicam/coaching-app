export const NICHES = [
  'musculation',
  'humour',
  'bien-etre',
  'lifestyle',
  'gaming',
  'autre',
] as const;

export type Niche = typeof NICHES[number];
