# Supabase Database Setup Guide

This guide will help you set up the database for FormerlyIncarcerated.org using your Supabase project.

## Prerequisites

1. ✅ Supabase project created
2. ✅ Environment variables configured in `.env.local`
3. ✅ Database connection tested

## Step 1: Create Database Tables

Go to your Supabase dashboard and navigate to the **SQL Editor**. Run the following SQL script:

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Survey responses table
CREATE TABLE IF NOT EXISTS survey_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Session tracking
    session_id TEXT NOT NULL UNIQUE,
    ip_address INET,
    user_agent TEXT,
    
    -- Survey data
    relationship TEXT NOT NULL,
    crypto_familiarity INTEGER NOT NULL CHECK (crypto_familiarity >= 1 AND crypto_familiarity <= 10),
    category_ranking TEXT[] NOT NULL,
    concepts TEXT[] NOT NULL DEFAULT '{}',
    marcus_help TEXT[] NOT NULL DEFAULT '{}',
    sarah_barrier TEXT NOT NULL DEFAULT '',
    integration_importance INTEGER NOT NULL CHECK (integration_importance >= 1 AND integration_importance <= 10),
    success_factor TEXT NOT NULL DEFAULT '',
    learning_support TEXT[] NOT NULL DEFAULT '{}',
    concerns TEXT NOT NULL DEFAULT '',
    additional_features TEXT NOT NULL DEFAULT '',
    other_comments TEXT NOT NULL DEFAULT '',
    
    -- Metadata
    completion_time_seconds INTEGER,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    step_completed INTEGER NOT NULL DEFAULT 1 CHECK (step_completed >= 1 AND step_completed <= 6)
);

-- Survey analytics table
CREATE TABLE IF NOT EXISTS survey_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Response metrics
    total_responses INTEGER NOT NULL DEFAULT 0,
    completed_responses INTEGER NOT NULL DEFAULT 0,
    average_completion_time NUMERIC(10,2),
    
    -- Popular responses
    most_common_relationship TEXT,
    average_crypto_familiarity NUMERIC(3,2),
    most_popular_concepts TEXT[],
    most_common_success_factor TEXT,
    
    -- Demographic insights
    formerly_incarcerated_percentage NUMERIC(5,2),
    family_friend_percentage NUMERIC(5,2),
    advocate_percentage NUMERIC(5,2),
    other_percentage NUMERIC(5,2)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_survey_responses_session_id ON survey_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_survey_responses_created_at ON survey_responses(created_at);
CREATE INDEX IF NOT EXISTS idx_survey_responses_completed ON survey_responses(completed);
CREATE INDEX IF NOT EXISTS idx_survey_responses_relationship ON survey_responses(relationship);

-- Row Level Security (RLS)
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Allow anonymous users to insert their own survey responses
CREATE POLICY "Allow anonymous survey submission" ON survey_responses
    FOR INSERT 
    WITH CHECK (true);

-- Allow users to read their own survey responses by session_id
CREATE POLICY "Allow reading own survey response" ON survey_responses
    FOR SELECT 
    USING (session_id = current_setting('request.session_id', true));

-- Allow users to update their own survey responses by session_id
CREATE POLICY "Allow updating own survey response" ON survey_responses
    FOR UPDATE 
    USING (session_id = current_setting('request.session_id', true));

-- Allow reading analytics for everyone (public data)
CREATE POLICY "Allow reading survey analytics" ON survey_analytics
    FOR SELECT 
    USING (true);
```

## Step 2: Test the Setup

After running the SQL script, test your setup:

```bash
# Test database connection and operations
node scripts/test-database.js
```

## Step 3: Verify Tables

In your Supabase dashboard, go to **Table Editor** and verify that you see:

- ✅ `survey_responses` table
- ✅ `survey_analytics` table

## Step 4: Test Survey Functionality

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/survey` in your browser

3. Fill out and submit a test survey

4. Check the `survey_responses` table in Supabase to see your test data

## Environment Variables Reference

Make sure your `.env.local` file contains:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://formerlyincarcerated.org
NODE_ENV=development
```

## Troubleshooting

### Connection Issues

If you get connection errors:

1. Verify your Supabase URL and keys are correct
2. Check that your Supabase project is active
3. Ensure you're using the correct region

### Permission Issues

If you get permission errors:

1. Check that Row Level Security policies are created
2. Verify the service role key has the correct permissions
3. Make sure the anon key is configured properly

### Table Creation Issues

If tables aren't created:

1. Run the SQL script manually in Supabase SQL Editor
2. Check for any error messages in the SQL Editor
3. Verify the `uuid-ossp` extension is enabled

## Next Steps

Once your database is set up:

1. ✅ Test the survey functionality
2. ✅ Monitor survey responses in Supabase
3. ✅ Set up analytics generation (optional)
4. ✅ Configure production environment variables

## Support

If you encounter issues:

1. Check the Supabase logs in your dashboard
2. Review the browser console for client-side errors
3. Check the Next.js server logs for API errors
4. Refer to the Supabase documentation for advanced configuration
