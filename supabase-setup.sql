-- Supabase Table Setup SQL
-- Paste and run this in the Supabase Dashboard -> SQL Editor

-- 1. Create 'essays' table
CREATE TABLE essays (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  date text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create 'photos' table
CREATE TABLE photos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  url text NOT NULL,
  title text,
  caption text,
  content text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create 'guestbook' table
CREATE TABLE guestbook (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  message text NOT NULL,
  color text,
  date text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create 'music' table
CREATE TABLE music (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  artist text NOT NULL,
  "videoId" text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Enable Row Level Security (RLS) but set to public read/write for now
-- Note: For a production app, you'd want stricter RLS policies.
-- Leaving it fully open mimics the default Firebase behavior used previously.

ALTER TABLE essays ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;
ALTER TABLE music ENABLE ROW LEVEL SECURITY;

-- Allow all READ access (Public can view)
CREATE POLICY "Public read essays" ON essays FOR SELECT USING (true);
CREATE POLICY "Public read photos" ON photos FOR SELECT USING (true);
CREATE POLICY "Public read guestbook" ON guestbook FOR SELECT USING (true);
CREATE POLICY "Public read music" ON music FOR SELECT USING (true);

-- Allow all WRITE/UPDATE/DELETE access (Currently admin is client-side only without robust auth checks to DB)
-- Anyone can theoretically write, similar to early Firebase without rules.
CREATE POLICY "Public insert essays" ON essays FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update essays" ON essays FOR UPDATE USING (true);
CREATE POLICY "Public delete essays" ON essays FOR DELETE USING (true);

CREATE POLICY "Public insert photos" ON photos FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update photos" ON photos FOR UPDATE USING (true);
CREATE POLICY "Public delete photos" ON photos FOR DELETE USING (true);

CREATE POLICY "Public insert guestbook" ON guestbook FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update guestbook" ON guestbook FOR UPDATE USING (true);
CREATE POLICY "Public delete guestbook" ON guestbook FOR DELETE USING (true);

CREATE POLICY "Public insert music" ON music FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update music" ON music FOR UPDATE USING (true);
CREATE POLICY "Public delete music" ON music FOR DELETE USING (true);
