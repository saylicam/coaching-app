import { create } from 'zustand';
import { ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

type Profile = {
  id: string;
  username: string | null;
  niche: string;
  cadence: '1-2_sem' | '3-4_sem' | 'quotidien';
  timezone: string;
};

type AuthStore = {
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  setProfile: (p: Profile | null) => void;
  signInWithPassword: (args: { email: string; password: string }) => Promise<void>;
  signUpWithPassword: (args: { email: string; password: string }) => Promise<void>;
  signInWithMagicLink: (args: { email: string }) => Promise<void>;
  loadProfile: () => Promise<void>;
};

export const useSession = create<AuthStore>((set, get) => ({
  session: null,
  profile: null,
  isLoading: false,
  setProfile: (p) => set({ profile: p }),
  async signInWithPassword({ email, password }) {
    set({ isLoading: true });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    set({ isLoading: false });
    if (error) throw error;
    set({ session: data.session ?? null });
    await get().loadProfile();
  },
  async signUpWithPassword({ email, password }) {
    set({ isLoading: true });
    const { data, error } = await supabase.auth.signUp({ email, password });
    set({ isLoading: false });
    if (error) throw error;
    set({ session: data.session ?? null });
    // Create profile row if missing
    const userId = data.user?.id;
    if (userId) {
      await supabase
        .from('profiles')
        .upsert({ id: userId }, { onConflict: 'id' });
    }
    await get().loadProfile();
  },
  async signInWithMagicLink({ email }) {
    set({ isLoading: true });
    const { error } = await supabase.auth.signInWithOtp({ email });
    set({ isLoading: false });
    if (error) throw error;
  },
  async loadProfile() {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;
    if (!userId) return set({ profile: null });
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    if (!error) set({ profile: (data as any) ?? null });
  },
}));

export function SessionProvider({ children }: { children: ReactNode }) {
  const setState = useSession.setState;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setState({ session: data.session ?? null });
      useSession.getState().loadProfile();
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({ session: session ?? null });
      useSession.getState().loadProfile();
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, [setState]);

  return children as any;
}
