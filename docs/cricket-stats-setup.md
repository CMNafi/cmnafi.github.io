# Cricket Stats Setup

## 1. Supabase project

Open the SQL editor in your Supabase project and run these files in order:

1. [supabase/cricket_games.sql](C:\Users\nafic\Desktop\cmnafi.com\cmnafi.github.io\supabase\cricket_games.sql)
2. [supabase/cricket_games_seed.sql](C:\Users\nafic\Desktop\cmnafi.com\cmnafi.github.io\supabase\cricket_games_seed.sql)

The first file creates the table, RLS, trigger, and indexes.
The second file seeds the live table with the same starter matches currently used by the fallback archive.

## 2. Auth

- Create the admin user in Supabase Auth with the email you want to use.
- Update the email inside `cricket_games_admin_write` in [supabase/cricket_games.sql](C:\Users\nafic\Desktop\cmnafi.com\cmnafi.github.io\supabase\cricket_games.sql) if it is not `nafi@cmnafi.com`.
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
- `distance_driven_miles` supports the fun road-trip stat layer

## 5. Suggested first entries to enrich

Once the seed file is loaded, the fastest improvements will be:

- add `distance_driven_miles` to past games
- attach `story_slug` where a blog post exists
- fill in missing venues and scorecard URLs
- replace placeholder opponents and partial records with full match lines

## 6. Fallback behavior

If Supabase env vars are missing or the table is not reachable yet, the page falls back to the current seeded static cricket archive so the route still loads.
