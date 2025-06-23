#!/usr/bin/env node

/**
 * Create Database Tables for FormerlyIncarcerated.org
 * 
 * This script creates the required tables using individual SQL commands
 * that work with Supabase's REST API
 */

const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
})

async function createTables() {
  console.log('🚀 Creating database tables...')
  
  try {
    // Check if tables already exist
    console.log('\n1️⃣ Checking existing tables...')
    
    const { data: existingTables, error: checkError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', ['survey_responses', 'survey_analytics'])
    
    if (checkError) {
      console.log('⚠️  Could not check existing tables, proceeding with creation...')
    } else {
      const tableNames = existingTables.map(t => t.table_name)
      if (tableNames.length > 0) {
        console.log(`📊 Found existing tables: ${tableNames.join(', ')}`)
        console.log('✅ Tables already exist! Skipping creation.')
        return
      }
    }
    
    console.log('\n2️⃣ Creating survey_responses table...')
    
    // Create survey_responses table using a simple approach
    const createSurveyTable = `
      CREATE TABLE IF NOT EXISTS survey_responses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        session_id TEXT NOT NULL UNIQUE,
        ip_address INET,
        user_agent TEXT,
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
        completion_time_seconds INTEGER,
        completed BOOLEAN NOT NULL DEFAULT FALSE,
        step_completed INTEGER NOT NULL DEFAULT 1 CHECK (step_completed >= 1 AND step_completed <= 6)
      );
    `
    
    // Execute using RPC call
    const { error: createError } = await supabase.rpc('exec_sql', { 
      sql: createSurveyTable 
    })
    
    if (createError) {
      console.error('❌ Failed to create survey_responses table:', createError.message)
    } else {
      console.log('✅ survey_responses table created successfully!')
    }
    
    console.log('\n3️⃣ Creating survey_analytics table...')
    
    const createAnalyticsTable = `
      CREATE TABLE IF NOT EXISTS survey_analytics (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        total_responses INTEGER NOT NULL DEFAULT 0,
        completed_responses INTEGER NOT NULL DEFAULT 0,
        average_completion_time NUMERIC(10,2),
        most_common_relationship TEXT,
        average_crypto_familiarity NUMERIC(3,2),
        most_popular_concepts TEXT[],
        most_common_success_factor TEXT,
        formerly_incarcerated_percentage NUMERIC(5,2),
        family_friend_percentage NUMERIC(5,2),
        advocate_percentage NUMERIC(5,2),
        other_percentage NUMERIC(5,2)
      );
    `
    
    const { error: analyticsError } = await supabase.rpc('exec_sql', { 
      sql: createAnalyticsTable 
    })
    
    if (analyticsError) {
      console.error('❌ Failed to create survey_analytics table:', analyticsError.message)
    } else {
      console.log('✅ survey_analytics table created successfully!')
    }
    
    console.log('\n4️⃣ Creating indexes...')
    
    const createIndexes = `
      CREATE INDEX IF NOT EXISTS idx_survey_responses_session_id ON survey_responses(session_id);
      CREATE INDEX IF NOT EXISTS idx_survey_responses_created_at ON survey_responses(created_at);
      CREATE INDEX IF NOT EXISTS idx_survey_responses_completed ON survey_responses(completed);
    `
    
    const { error: indexError } = await supabase.rpc('exec_sql', { 
      sql: createIndexes 
    })
    
    if (indexError) {
      console.error('❌ Failed to create indexes:', indexError.message)
    } else {
      console.log('✅ Indexes created successfully!')
    }
    
    console.log('\n5️⃣ Setting up Row Level Security...')
    
    const setupRLS = `
      ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
      ALTER TABLE survey_analytics ENABLE ROW LEVEL SECURITY;
      
      CREATE POLICY IF NOT EXISTS "Allow anonymous survey submission" ON survey_responses
        FOR INSERT WITH CHECK (true);
      
      CREATE POLICY IF NOT EXISTS "Allow reading survey analytics" ON survey_analytics
        FOR SELECT USING (true);
    `
    
    const { error: rlsError } = await supabase.rpc('exec_sql', { 
      sql: setupRLS 
    })
    
    if (rlsError) {
      console.error('❌ Failed to setup RLS:', rlsError.message)
    } else {
      console.log('✅ Row Level Security configured!')
    }
    
    console.log('\n🎉 Database setup completed successfully!')
    
  } catch (error) {
    console.error('\n❌ Database setup failed:', error.message)
    console.error('\n💡 Manual setup instructions:')
    console.error('   1. Go to your Supabase dashboard')
    console.error('   2. Navigate to SQL Editor')
    console.error('   3. Run the contents of lib/database-schema.sql')
    process.exit(1)
  }
}

// Run the setup
createTables()
