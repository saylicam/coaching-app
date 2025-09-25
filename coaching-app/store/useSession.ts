import { create } from 'zustand';
import type { Session, User } from '@supabase/supabase-js';

type State = {
  session: Session | null;
  user: User | null;
};

type Actions = {
  setSession: (session: Session | null) => void;
};

export const useSession = create<State & Actions>((set) => ({
  session: null,
  user: null,
  setSession: (session) => set({ session, user: session?.user ?? null }),
}));
