-- Mavvri production catalog schema (PostgreSQL 15+)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE source_key AS ENUM ('mercadolivre', 'amazon', 'americanas', 'shopee', 'magalu', 'shein', 'olx');
CREATE TYPE availability_status AS ENUM ('in_stock', 'out_of_stock', 'unknown');
CREATE TYPE offer_status AS ENUM ('active', 'paused', 'expired');

CREATE TABLE sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key source_key UNIQUE NOT NULL,
  display_name text NOT NULL,
  enabled boolean NOT NULL DEFAULT false,
  affiliate_disclosure text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  parent_id uuid REFERENCES categories(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  canonical_key text UNIQUE NOT NULL,
  title text NOT NULL,
  brand text,
  category_id uuid REFERENCES categories(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid NOT NULL REFERENCES sources(id),
  product_id uuid REFERENCES products(id),
  source_offer_id text NOT NULL,
  title text NOT NULL,
  product_url text NOT NULL,
  affiliate_url text NOT NULL,
  image_url text,
  currency char(3) NOT NULL DEFAULT 'BRL',
  price numeric(12,2) NOT NULL CHECK (price >= 0),
  original_price numeric(12,2),
  discount_percent numeric(5,2),
  availability availability_status NOT NULL DEFAULT 'unknown',
  status offer_status NOT NULL DEFAULT 'active',
  fetched_at timestamptz NOT NULL,
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (source_id, source_offer_id)
);

CREATE INDEX offers_active_search_idx ON offers (status, availability, price);
CREATE INDEX offers_source_fetched_idx ON offers (source_id, fetched_at DESC);
CREATE INDEX offers_product_idx ON offers (product_id);

CREATE TABLE price_snapshots (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  offer_id uuid NOT NULL REFERENCES offers(id) ON DELETE CASCADE,
  price numeric(12,2) NOT NULL CHECK (price >= 0),
  original_price numeric(12,2),
  availability availability_status NOT NULL,
  captured_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX price_snapshots_offer_time_idx ON price_snapshots (offer_id, captured_at DESC);

CREATE TABLE offer_clicks (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  offer_id uuid NOT NULL REFERENCES offers(id) ON DELETE CASCADE,
  session_hash text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX offer_clicks_offer_time_idx ON offer_clicks (offer_id, created_at DESC);

CREATE TABLE price_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  product_query text NOT NULL,
  target_price numeric(12,2) NOT NULL CHECK (target_price > 0),
  active boolean NOT NULL DEFAULT true,
  consent_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO sources (key, display_name) VALUES
  ('mercadolivre', 'Mercado Livre'),
  ('amazon', 'Amazon'),
  ('americanas', 'Americanas'),
  ('shopee', 'Shopee'),
  ('magalu', 'Magazine Luiza'),
  ('shein', 'Shein'),
  ('olx', 'OLX')
ON CONFLICT (key) DO NOTHING;
