import { NextRequest, NextResponse } from 'next/server'
import { surveyService, generateSessionId, getClientInfo } from '@/lib/supabase'
import { headers } from 'next/headers'

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5 // Max 5 survey submissions per 15 minutes per IP

function getRateLimitKey(ip: string): string {
  return `survey_${ip}`
}

function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const key = getRateLimitKey(ip)
  const now = Date.now()
  const record = rateLimitStore.get(key)

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return { allowed: true }
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, resetTime: record.resetTime }
  }

  record.count++
  return { allowed: true }
}

function getClientIP(request: NextRequest): string {
  // Try various headers for IP address
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  return request.ip || 'unknown'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const clientIP = getClientIP(request)
    
    // Rate limiting
    const rateLimitResult = checkRateLimit(clientIP)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again later.',
          resetTime: rateLimitResult.resetTime 
        },
        { status: 429 }
      )
    }

    // Validate required fields
    const requiredFields = ['relationship', 'crypto_familiarity', 'category_ranking']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Validate data types and ranges
    if (typeof body.crypto_familiarity !== 'number' || 
        body.crypto_familiarity < 1 || 
        body.crypto_familiarity > 10) {
      return NextResponse.json(
        { error: 'crypto_familiarity must be a number between 1 and 10' },
        { status: 400 }
      )
    }

    if (!Array.isArray(body.category_ranking) || body.category_ranking.length === 0) {
      return NextResponse.json(
        { error: 'category_ranking must be a non-empty array' },
        { status: 400 }
      )
    }

    // Generate session ID if not provided
    const sessionId = body.session_id || generateSessionId()
    
    // Prepare survey data
    const surveyData = {
      session_id: sessionId,
      ip_address: clientIP,
      user_agent: request.headers.get('user-agent') || '',
      relationship: body.relationship,
      crypto_familiarity: body.crypto_familiarity,
      category_ranking: body.category_ranking,
      concepts: body.concepts || [],
      marcus_help: body.marcus_help || [],
      sarah_barrier: body.sarah_barrier || '',
      integration_importance: body.integration_importance || 5,
      success_factor: body.success_factor || '',
      learning_support: body.learning_support || [],
      concerns: body.concerns || '',
      additional_features: body.additional_features || '',
      other_comments: body.other_comments || '',
      completion_time_seconds: body.completion_time_seconds,
      completed: body.completed || false,
      step_completed: body.step_completed || 1
    }

    // Check if survey already exists for this session
    const existingSurvey = await surveyService.getSurveyBySessionId(sessionId)
    
    let result
    if (existingSurvey) {
      // Update existing survey
      result = await surveyService.updateSurveyResponse(existingSurvey.id, surveyData)
    } else {
      // Create new survey
      result = await surveyService.createSurveyResponse(surveyData)
    }

    return NextResponse.json({
      success: true,
      data: {
        id: result.id,
        session_id: result.session_id,
        completed: result.completed,
        step_completed: result.step_completed
      }
    })

  } catch (error) {
    console.error('Survey API error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'session_id parameter is required' },
        { status: 400 }
      )
    }

    const survey = await surveyService.getSurveyBySessionId(sessionId)
    
    if (!survey) {
      return NextResponse.json(
        { error: 'Survey not found' },
        { status: 404 }
      )
    }

    // Remove sensitive information
    const { ip_address, user_agent, ...publicData } = survey

    return NextResponse.json({
      success: true,
      data: publicData
    })

  } catch (error) {
    console.error('Survey GET API error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}
