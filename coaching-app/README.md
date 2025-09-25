## Coaching App (Expo + TypeScript + Supabase)

### Setup

1. Create a Supabase project and set `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` in `.env`.
2. Apply SQL in `supabase/schema.sql` and seed `supabase/seed.sql`.
3. Install deps: `npm install`.
4. Start: `npx expo start`.

### Environment

Create `.env` in project root:

```
EXPO_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=ey...
```

### Scripts

- `npm run typecheck`
- `npm run lint`
- `npm start`

### Notes

- Replace mocked sections iteratively.
