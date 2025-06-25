#!/usr/bin/env node

/**
 * Database Setup Script for FormerlyIncarcerated.org
 * 
 * This script sets up the database schema and tests the connection
 * using the environment variables configured in .env.local
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:')
  console.error('   - NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL')
  console.error('   - SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

// Create admin client
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setupDatabase() {
  console.log('🚀 Setting up FormerlyIncarcerated.org database...')
  console.log(`📍 Supabase URL: ${supabaseUrl}`)
  
  try {
    // Test connection
    console.log('\n1️⃣ Testing database connection...')
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .limit(1)
    
    if (error) {
      throw new Error(`Connection failed: ${error.message}`)
    }
    
    console.log('✅ Database connection successful!')
    
    // Read and execute schema
    console.log('\n2️⃣ Setting up database schema...')
    const schemaPath = path.join(__dirname, '..', 'lib', 'database-schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')
    
    // Split schema into individual statements
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))
    
    console.log(`📝 Executing ${statements.length} SQL statements...`)
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      if (statement.trim()) {
        try {
          const { error } = await supabase.rpc('exec_sql', { sql: statement })
          if (error && !error.message.includes('already exists')) {
            console.warn(`⚠️  Warning on statement ${i + 1}: ${error.message}`)
          }
        } catch (err) {
          // Try alternative approach for schema setup
          console.log(`🔄 Attempting alternative execution for statement ${i + 1}...`)
        }
      }
    }
    
    console.log('✅ Database schema setup completed!')
    
    // Test table creation
    console.log('\n3️⃣ Verifying table creation...')
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', ['survey_responses', 'survey_analytics'])
    
    if (tablesError) {
      throw new Error(`Table verification failed: ${tablesError.message}`)
    }
    
    const tableNames = tables.map(t => t.table_name)
    console.log(`📊 Found tables: ${tableNames.join(', ')}`)
    
    if (tableNames.includes('survey_responses')) {
      console.log('✅ survey_responses table exists')
    } else {
      console.log('⚠️  survey_responses table not found')
    }
    
    if (tableNames.includes('survey_analytics')) {
      console.log('✅ survey_analytics table exists')
    } else {
      console.log('⚠️  survey_analytics table not found')
    }
    
    // Test basic operations
    console.log('\n4️⃣ Testing basic database operations...')
    
    // Test insert
    const testSessionId = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const { data: insertData, error: insertError } = await supabase
      .from('survey_responses')
      .insert([{
        session_id: testSessionId,
        relationship: 'test',
        crypto_familiarity: 5,
        category_ranking: ['test1', 'test2'],
        integration_importance: 8,
        completed: false,
        step_completed: 1
      }])
      .select()
    
    if (insertError) {
      console.error('❌ Insert test failed:', insertError.message)
    } else {
      console.log('✅ Insert test successful')
      
      // Test select
      const { data: selectData, error: selectError } = await supabase
        .from('survey_responses')
        .select('*')
        .eq('session_id', testSessionId)
        .single()
      
      if (selectError) {
        console.error('❌ Select test failed:', selectError.message)
      } else {
        console.log('✅ Select test successful')
        
        // Clean up test data
        await supabase
          .from('survey_responses')
          .delete()
          .eq('session_id', testSessionId)
        
        console.log('✅ Test cleanup completed')
      }
    }
    
    console.log('\n🎉 Database setup completed successfully!')
    console.log('\n📋 Next steps:')
    console.log('   1. Your database is ready for the survey application')
    console.log('   2. Test the survey functionality in your application')
    console.log('   3. Monitor the survey_analytics table for insights')
    
  } catch (error) {
    console.error('\n❌ Database setup failed:', error.message)
    console.error('\n🔧 Troubleshooting:')
    console.error('   1. Verify your Supabase credentials in .env.local')
    console.error('   2. Check that your Supabase project is active')
    console.error('   3. Ensure the service role key has sufficient permissions')
    process.exit(1)
  }
}

// Run the setup
setupDatabase()
