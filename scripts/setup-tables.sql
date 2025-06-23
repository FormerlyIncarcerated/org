-- FormerlyIncarcerated.org Database Setup
-- Copy and paste this entire script into your Supabase SQL Editor

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

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_survey_responses_updated_at
    BEFORE UPDATE ON survey_responses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
