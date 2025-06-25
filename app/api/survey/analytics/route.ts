import { NextRequest, NextResponse } from 'next/server'
import { surveyService } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const analytics = await surveyService.getSurveyAnalytics()
    
    if (!analytics) {
      // Generate analytics if none exist
      const newAnalytics = await surveyService.generateAnalytics()
      
      return NextResponse.json({
        success: true,
        data: newAnalytics,
        generated: true
      })
    }

    return NextResponse.json({
      success: true,
      data: analytics,
      generated: false
    })

  } catch (error) {
    console.error('Survey analytics API error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // This endpoint regenerates analytics (admin only in production)
    const analytics = await surveyService.generateAnalytics()
    
    return NextResponse.json({
      success: true,
      data: analytics,
      message: 'Analytics regenerated successfully'
    })

  } catch (error) {
    console.error('Survey analytics generation error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}
