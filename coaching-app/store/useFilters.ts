import { create } from 'zustand';

type FiltersStore = {
  niche: string | null;
  difficulty: string | null;
  format: string | null;
  setFilters: (f: Partial<Omit<FiltersStore, 'setFilters'>>) => void;
};

export const useFilters = create<FiltersStore>((set) => ({
  niche: null,
  difficulty: null,
  format: null,
  setFilters: (f) => set(f),
}));
