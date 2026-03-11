-- ==============================================
-- BlockGrain Supabase Schema
-- Run this in the Supabase SQL Editor
-- ==============================================

-- Locations table (godowns, warehouses, city-hubs, fps)
CREATE TABLE IF NOT EXISTS locations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  state TEXT DEFAULT '',
  city TEXT DEFAULT '',
  stock JSONB DEFAULT '{}'::jsonb,
  demand JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Beneficiaries table
CREATE TABLE IF NOT EXISTS beneficiaries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  ration_card_id TEXT NOT NULL UNIQUE,
  fps_id TEXT REFERENCES locations(id),
  entitlement JSONB DEFAULT '{}'::jsonb
);

-- Grains table
CREATE TABLE IF NOT EXISTS grains (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hash TEXT,
  timestamp TEXT,
  from_entity TEXT,
  to_entity TEXT,
  items JSONB,
  type TEXT
);

-- Index for ordering transactions by timestamp
CREATE INDEX IF NOT EXISTS idx_transactions_timestamp ON transactions (timestamp DESC);

-- ==============================================
-- Row Level Security (RLS) - Disabled for server-side access
-- Enable these if you want fine-grained access control
-- ==============================================
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE beneficiaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE grains ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Allow full access with service_role key (server-side)
CREATE POLICY "Allow all for service role" ON locations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for service role" ON beneficiaries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for service role" ON grains FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for service role" ON transactions FOR ALL USING (true) WITH CHECK (true);
