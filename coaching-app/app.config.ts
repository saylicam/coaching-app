import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Coaching App',
  slug: 'coaching-app',
  scheme: 'coachingapp',
  orientation: 'portrait',
  newArchEnabled: true,
  userInterfaceStyle: 'light',
  plugins: [
    'expo-router',
    [
      'expo-notifications',
      {
        icon: './assets/icon.png',
        color: '#000000',
        sounds: [],
      },
    ],
  ],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    permissions: ['POST_NOTIFICATIONS'],
  },
  web: {
    bundler: 'metro',
    favicon: './assets/favicon.png',
  },
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  },
  experiments: {
    typedRoutes: true,
  },
};

export default config;
