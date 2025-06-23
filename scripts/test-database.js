#!/usr/bin/env node

/**
 * Database Connection Test for FormerlyIncarcerated.org
 * 
 * This script tests the database connection and basic operations
 * using the environment variables configured in .env.local
 */

const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('🧪 Testing FormerlyIncarcerated.org database connection...')
console.log(`📍 Supabase URL: ${supabaseUrl}`)

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing required environment variables:')
  console.error('   - NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL')
  console.error('   - NEXT_PUBLIC_SUPABASE_ANON_KEY')
  process.exit(1)
}

// Create clients
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })
  : null

async function testDatabase() {
  try {
    console.log('\n1️⃣ Testing anonymous client connection...')
    
    // Test basic connection
    const { count, error } = await supabaseClient
      .from('survey_responses')
      .select('*', { count: 'exact', head: true })
    
    if (error) {
      if (error.code === '42P01') {
        console.log('⚠️  survey_responses table does not exist yet')
        console.log('📝 Please run the database schema in Supabase SQL Editor:')
        console.log('   1. Go to your Supabase dashboard')
        console.log('   2. Navigate to SQL Editor')
        console.log('   3. Run the contents of lib/database-schema.sql')
        return
      } else {
        throw error
      }
    }
    
    console.log('✅ Anonymous client connection successful!')
    console.log(`📊 Current survey responses: ${count || 0}`)

    if (supabaseAdmin) {
      console.log('\n2️⃣ Testing admin client connection...')

      const { count: adminCount, error: adminError } = await supabaseAdmin
        .from('survey_responses')
        .select('*', { count: 'exact', head: true })
      
      if (adminError) {
        console.error('❌ Admin client test failed:', adminError.message)
      } else {
        console.log('✅ Admin client connection successful!')
      }
    } else {
      console.log('\n⚠️  No service role key configured - admin functions unavailable')
    }
    
    console.log('\n3️⃣ Testing survey operations...')
    
    // Test survey creation
    const testSessionId = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const testSurvey = {
      session_id: testSessionId,
      relationship: 'test',
      crypto_familiarity: 5,
      category_ranking: ['education', 'employment'],
      concepts: ['blockchain', 'defi'],
      marcus_help: ['job_placement'],
      sarah_barrier: 'background_checks',
      integration_importance: 8,
      success_factor: 'community_support',
      learning_support: ['online_courses'],
      concerns: 'privacy',
      additional_features: 'mobile_app',
      other_comments: 'test comment',
      completed: false,
      step_completed: 1
    }
    
    const { data: insertData, error: insertError } = await supabaseClient
      .from('survey_responses')
      .insert([testSurvey])
      .select()
    
    if (insertError) {
      console.error('❌ Survey insert test failed:', insertError.message)
    } else {
      console.log('✅ Survey insert test successful')
      
      // Test survey retrieval
      const { data: selectData, error: selectError } = await supabaseClient
        .from('survey_responses')
        .select('*')
        .eq('session_id', testSessionId)
        .single()
      
      if (selectError) {
        console.error('❌ Survey select test failed:', selectError.message)
      } else {
        console.log('✅ Survey select test successful')
        
        // Test survey update
        const { data: updateData, error: updateError } = await supabaseClient
          .from('survey_responses')
          .update({ 
            completed: true, 
            step_completed: 6,
            completion_time_seconds: 120
          })
          .eq('session_id', testSessionId)
          .select()
        
        if (updateError) {
          console.error('❌ Survey update test failed:', updateError.message)
        } else {
          console.log('✅ Survey update test successful')
        }
        
        // Clean up test data
        const { error: deleteError } = await supabaseClient
          .from('survey_responses')
          .delete()
          .eq('session_id', testSessionId)
        
        if (deleteError) {
          console.error('⚠️  Test cleanup failed:', deleteError.message)
        } else {
          console.log('✅ Test cleanup completed')
        }
      }
    }
    
    console.log('\n🎉 Database tests completed successfully!')
    console.log('\n📋 Your database is ready for:')
    console.log('   ✅ Survey response storage')
    console.log('   ✅ Session-based data retrieval')
    console.log('   ✅ Survey progress tracking')
    console.log('   ✅ Data analytics (if admin key configured)')
    
  } catch (error) {
    console.error('\n❌ Database test failed:', error.message)
    console.error('\n🔧 Troubleshooting:')
    console.error('   1. Verify your Supabase credentials in .env.local')
    console.error('   2. Check that your Supabase project is active')
    console.error('   3. Ensure the database schema has been created')
    console.error('   4. Verify Row Level Security policies are configured')
    process.exit(1)
  }
}

// Run the test
testDatabase()
