import { create } from 'zustand';

export type Filters = {
  niche?: string;
  difficulty?: 'facile' | 'moyen' | 'avance';
  format?: 'short' | 'carousel' | 'live' | 'photo';
};

type State = {
  filters: Filters;
};

type Actions = {
  setFilters: (partial: Partial<Filters>) => void;
  reset: () => void;
};

export const useFilters = create<State & Actions>((set) => ({
  filters: {},
  setFilters: (partial) => set((s) => ({ filters: { ...s.filters, ...partial } })),
  reset: () => set({ filters: {} }),
}));
