# Thoughtful List - Supabase Setup

This project uses Supabase for data storage. Follow these steps to set up your own database.

## 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and create a new project.
2. Once your project is created, navigate to **Project Settings** > **API**.
3. Copy your **Project URL** and **anon public key**.

## 2. Set up Environment Variables

1. Rename the `.env.example` file to `.env` (or create a `.env` file in the root of the project).
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## 3. Create the Database Table

1. Go to the **SQL Editor** in your Supabase dashboard.
2. Click **New Query** and paste the following SQL commands to create the `thoughts` table and set up permissions.

```sql
-- Create the table
CREATE TABLE thoughts (
  id UUID PRIMARY KEY,
  text TEXT NOT NULL,
  author TEXT,
  likes INTEGER DEFAULT 0,
  created_at BIGINT NOT NULL,
  paper_color TEXT NOT NULL,
  tape TEXT NOT NULL,
  texture TEXT,
  rotation REAL NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE thoughts ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to read thoughts
CREATE POLICY "Allow public read access" ON thoughts
  FOR SELECT USING (true);

-- Create a policy to allow anyone to insert thoughts (for public access)
CREATE POLICY "Allow public insert access" ON thoughts
  FOR INSERT WITH CHECK (true);

-- Create a policy to allow anyone to update likes
CREATE POLICY "Allow public update access" ON thoughts
  FOR UPDATE USING (true);
```

3. Click **Run** to execute the query.

Your backend is now set up and connected!
