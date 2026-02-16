/*
  # Page Views Tracking System

  1. New Tables
    - `page_views`
      - `id` (uuid, primary key) - Unique identifier
      - `page_name` (text) - Name/identifier of the page
      - `view_count` (bigint) - Total number of views
      - `last_viewed_at` (timestamptz) - Last view timestamp
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on `page_views` table
    - Add policy for anyone to read view counts (public data)
    - Add policy for authenticated users to increment views
    - Note: In production, you might want to restrict increment access or use an edge function

  3. Initial Data
    - Insert initial record for portfolio homepage
*/

-- Create page_views table
CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_name text UNIQUE NOT NULL,
  view_count bigint DEFAULT 0,
  last_viewed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read view counts (public data)
CREATE POLICY "Anyone can read view counts"
  ON page_views
  FOR SELECT
  USING (true);

-- Policy: Anyone can update view counts (for incrementing)
CREATE POLICY "Anyone can increment view counts"
  ON page_views
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Policy: Anyone can insert new page records
CREATE POLICY "Anyone can insert new pages"
  ON page_views
  FOR INSERT
  WITH CHECK (true);

-- Insert initial record for the homepage
INSERT INTO page_views (page_name, view_count)
VALUES ('portfolio_home', 0)
ON CONFLICT (page_name) DO NOTHING;