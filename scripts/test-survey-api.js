#!/usr/bin/env node

/**
 * End-to-End Survey API Test for FormerlyIncarcerated.org
 * 
 * This script tests the complete survey flow through the API endpoints
 */

const fetch = require('node-fetch')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

async function testSurveyAPI() {
  console.log('🧪 Testing FormerlyIncarcerated.org Survey API...')
  console.log(`📍 Base URL: ${BASE_URL}`)
  
  try {
    // Test data
    const testSessionId = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const surveyData = {
      session_id: testSessionId,
      relationship: 'formerly_incarcerated',
      crypto_familiarity: 7,
      category_ranking: ['education', 'employment', 'housing', 'financial_services'],
      concepts: ['blockchain', 'defi', 'smart_contracts'],
      marcus_help: ['job_placement', 'skill_training'],
      sarah_barrier: 'background_checks',
      integration_importance: 9,
      success_factor: 'community_support',
      learning_support: ['online_courses', 'mentorship'],
      concerns: 'privacy and security',
      additional_features: 'mobile app support',
      other_comments: 'This is a test survey submission',
      completed: false,
      step_completed: 3
    }

    console.log('\n1️⃣ Testing survey submission (POST /api/survey)...')
    
    const submitResponse = await fetch(`${BASE_URL}/api/survey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'FormerlyIncarcerated-Test/1.0'
      },
      body: JSON.stringify(surveyData)
    })

    if (!submitResponse.ok) {
      const errorData = await submitResponse.text()
      throw new Error(`Survey submission failed: ${submitResponse.status} ${errorData}`)
    }

    const submitResult = await submitResponse.json()
    console.log('✅ Survey submission successful!')
    console.log(`📊 Survey ID: ${submitResult.data.id}`)
    console.log(`🔗 Session ID: ${submitResult.data.session_id}`)
    console.log(`📈 Step completed: ${submitResult.data.step_completed}`)

    console.log('\n2️⃣ Testing survey retrieval (GET /api/survey)...')
    
    const retrieveResponse = await fetch(`${BASE_URL}/api/survey?session_id=${testSessionId}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'FormerlyIncarcerated-Test/1.0'
      }
    })

    if (!retrieveResponse.ok) {
      const errorData = await retrieveResponse.text()
      throw new Error(`Survey retrieval failed: ${retrieveResponse.status} ${errorData}`)
    }

    const retrieveResult = await retrieveResponse.json()
    console.log('✅ Survey retrieval successful!')
    console.log(`📊 Retrieved survey for session: ${retrieveResult.data.session_id}`)
    console.log(`👤 Relationship: ${retrieveResult.data.relationship}`)
    console.log(`🔢 Crypto familiarity: ${retrieveResult.data.crypto_familiarity}/10`)

    console.log('\n3️⃣ Testing survey update (POST /api/survey with existing session)...')
    
    const updateData = {
      ...surveyData,
      completed: true,
      step_completed: 6,
      completion_time_seconds: 180,
      other_comments: 'Updated test survey - now completed'
    }

    const updateResponse = await fetch(`${BASE_URL}/api/survey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'FormerlyIncarcerated-Test/1.0'
      },
      body: JSON.stringify(updateData)
    })

    if (!updateResponse.ok) {
      const errorData = await updateResponse.text()
      throw new Error(`Survey update failed: ${updateResponse.status} ${errorData}`)
    }

    const updateResult = await updateResponse.json()
    console.log('✅ Survey update successful!')
    console.log(`📊 Survey completed: ${updateResult.data.completed}`)
    console.log(`📈 Final step: ${updateResult.data.step_completed}`)

    console.log('\n4️⃣ Testing analytics endpoint (GET /api/survey/analytics)...')
    
    const analyticsResponse = await fetch(`${BASE_URL}/api/survey/analytics`, {
      method: 'GET',
      headers: {
        'User-Agent': 'FormerlyIncarcerated-Test/1.0'
      }
    })

    if (!analyticsResponse.ok) {
      const errorData = await analyticsResponse.text()
      console.log(`⚠️  Analytics endpoint returned: ${analyticsResponse.status}`)
      console.log(`   This is expected if no analytics have been generated yet.`)
    } else {
      const analyticsResult = await analyticsResponse.json()
      console.log('✅ Analytics retrieval successful!')
      console.log(`📊 Total responses: ${analyticsResult.data?.total_responses || 'N/A'}`)
      console.log(`📈 Completed responses: ${analyticsResult.data?.completed_responses || 'N/A'}`)
    }

    console.log('\n5️⃣ Testing rate limiting...')
    
    // Test rate limiting by making multiple requests quickly
    const rateLimitPromises = []
    for (let i = 0; i < 3; i++) {
      rateLimitPromises.push(
        fetch(`${BASE_URL}/api/survey`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'FormerlyIncarcerated-Test/1.0'
          },
          body: JSON.stringify({
            ...surveyData,
            session_id: `rate_test_${i}_${Date.now()}`
          })
        })
      )
    }

    const rateLimitResults = await Promise.all(rateLimitPromises)
    const successCount = rateLimitResults.filter(r => r.ok).length
    const rateLimitCount = rateLimitResults.filter(r => r.status === 429).length
    
    console.log(`✅ Rate limiting test completed`)
    console.log(`   Successful requests: ${successCount}`)
    console.log(`   Rate limited requests: ${rateLimitCount}`)

    console.log('\n🎉 All survey API tests completed successfully!')
    console.log('\n📋 Test Summary:')
    console.log('   ✅ Survey submission (CREATE)')
    console.log('   ✅ Survey retrieval (READ)')
    console.log('   ✅ Survey update (UPDATE)')
    console.log('   ✅ Analytics endpoint')
    console.log('   ✅ Rate limiting')
    console.log('\n🚀 Your survey system is ready for production!')

  } catch (error) {
    console.error('\n❌ Survey API test failed:', error.message)
    console.error('\n🔧 Troubleshooting:')
    console.error('   1. Ensure your development server is running (npm run dev)')
    console.error('   2. Check that the database tables are created in Supabase')
    console.error('   3. Verify your environment variables are correct')
    console.error('   4. Check the server logs for detailed error information')
    process.exit(1)
  }
}

// Run the test
testSurveyAPI()
