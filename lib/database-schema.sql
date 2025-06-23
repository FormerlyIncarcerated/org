-- FormerlyIncarcerated.org Survey Database Schema
-- This file contains the complete database schema for the survey system

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

-- Function to generate survey analytics
CREATE OR REPLACE FUNCTION generate_survey_analytics()
RETURNS survey_analytics AS $$
DECLARE
    analytics_record survey_analytics;
    total_count INTEGER;
    completed_count INTEGER;
    avg_completion NUMERIC;
    common_relationship TEXT;
    avg_crypto NUMERIC;
    popular_concepts TEXT[];
    common_success TEXT;
    formerly_incarcerated_pct NUMERIC;
    family_friend_pct NUMERIC;
    advocate_pct NUMERIC;
    other_pct NUMERIC;
BEGIN
    -- Get basic metrics
    SELECT COUNT(*) INTO total_count FROM survey_responses;
    SELECT COUNT(*) INTO completed_count FROM survey_responses WHERE completed = true;
    
    -- Average completion time (only for completed surveys)
    SELECT AVG(completion_time_seconds) INTO avg_completion 
    FROM survey_responses 
    WHERE completed = true AND completion_time_seconds IS NOT NULL;
    
    -- Most common relationship
    SELECT relationship INTO common_relationship
    FROM survey_responses
    GROUP BY relationship
    ORDER BY COUNT(*) DESC
    LIMIT 1;
    
    -- Average crypto familiarity
    SELECT AVG(crypto_familiarity) INTO avg_crypto FROM survey_responses;
    
    -- Most popular concepts (top 5)
    SELECT ARRAY(
        SELECT concept
        FROM (
            SELECT unnest(concepts) as concept
            FROM survey_responses
        ) concept_list
        GROUP BY concept
        ORDER BY COUNT(*) DESC
        LIMIT 5
    ) INTO popular_concepts;
    
    -- Most common success factor
    SELECT success_factor INTO common_success
    FROM survey_responses
    WHERE success_factor != ''
    GROUP BY success_factor
    ORDER BY COUNT(*) DESC
    LIMIT 1;
    
    -- Calculate demographic percentages
    IF total_count > 0 THEN
        SELECT 
            (COUNT(*) FILTER (WHERE relationship = 'formerly_incarcerated') * 100.0 / total_count),
            (COUNT(*) FILTER (WHERE relationship = 'family_friend') * 100.0 / total_count),
            (COUNT(*) FILTER (WHERE relationship = 'advocate') * 100.0 / total_count),
            (COUNT(*) FILTER (WHERE relationship NOT IN ('formerly_incarcerated', 'family_friend', 'advocate')) * 100.0 / total_count)
        INTO formerly_incarcerated_pct, family_friend_pct, advocate_pct, other_pct
        FROM survey_responses;
    ELSE
        formerly_incarcerated_pct := 0;
        family_friend_pct := 0;
        advocate_pct := 0;
        other_pct := 0;
    END IF;
    
    -- Create analytics record
    analytics_record := ROW(
        uuid_generate_v4(),
        NOW(),
        total_count,
        completed_count,
        avg_completion,
        common_relationship,
        avg_crypto,
        popular_concepts,
        common_success,
        formerly_incarcerated_pct,
        family_friend_pct,
        advocate_pct,
        other_pct
    )::survey_analytics;
    
    -- Insert the analytics record
    INSERT INTO survey_analytics VALUES (analytics_record.*);
    
    RETURN analytics_record;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

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

-- Create a view for public analytics (no sensitive data)
CREATE OR REPLACE VIEW public_survey_analytics AS
SELECT 
    total_responses,
    completed_responses,
    ROUND(average_completion_time, 0) as average_completion_time_seconds,
    most_common_relationship,
    ROUND(average_crypto_familiarity, 1) as average_crypto_familiarity,
    most_popular_concepts,
    most_common_success_factor,
    ROUND(formerly_incarcerated_percentage, 1) as formerly_incarcerated_percentage,
    ROUND(family_friend_percentage, 1) as family_friend_percentage,
    ROUND(advocate_percentage, 1) as advocate_percentage,
    ROUND(other_percentage, 1) as other_percentage,
    created_at
FROM survey_analytics
ORDER BY created_at DESC
LIMIT 1;
