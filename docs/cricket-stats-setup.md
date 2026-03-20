# Cricket Stats Setup

## 1. Supabase project

Create a Supabase project and run the SQL in [supabase/cricket_games.sql](C:\Users\nafic\Desktop\cmnafi.com\cmnafi.github.io\supabase\cricket_games.sql).

## 2. Auth

- Create the admin user in Supabase Auth with the email you want to use.
- Update the email inside the RLS policy in `supabase/cricket_games.sql` if it is not `nafi@cmnafi.com`.
- Do not enable public signup.

## 3. Environment variables

Add these values locally and in your deploy environment:

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`

You can copy the placeholders from [.env.example](C:\Users\nafic\Desktop\cmnafi.com\cmnafi.github.io\.env.example).

## 4. What the page does

- `/adventures/cricket/stats` reads the public `cricket_games` table
- public visitors can browse stats, filters, charts, and game log rows
- signed-in admin can add, edit, and archive matches
- each row can optionally link to a blog post via `story_slug`

## 5. Fallback behavior

If Supabase env vars are missing or the table is not reachable yet, the page falls back to the current seeded static cricket archive so the route still loads.
