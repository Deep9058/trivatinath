-- ═══════════════════════════════════════════════════════
--  Run this in Supabase → SQL Editor → New Query
--  Creates the bhakt_registrations table
-- ═══════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS bhakt_registrations (
  id            SERIAL PRIMARY KEY,
  full_name     TEXT        NOT NULL,
  phone         TEXT        NOT NULL UNIQUE,
  visit_type    TEXT        NOT NULL CHECK (visit_type IN ('yes', 'no', 'special')),
  registered_at TIMESTAMPTZ DEFAULT NOW()
);

-- Allow public read/write via anon key (needed for vercel Functions)
ALTER TABLE bhakt_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert" ON bhakt_registrations
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow select" ON bhakt_registrations
  FOR SELECT TO anon USING (true);
