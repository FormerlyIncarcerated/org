import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface SurveyResponse {
  id?: string
  created_at?: string
  updated_at?: string
  session_id: string
  ip_address?: string
  user_agent?: string
  
  // Survey data
  relationship: string
  crypto_familiarity: number
  category_ranking: string[]
  concepts: string[]
  marcus_help: string[]
  sarah_barrier: string
  integration_importance: number
  success_factor: string
  learning_support: string[]
  concerns: string
  additional_features: string
  other_comments: string
  
  // Metadata
  completion_time_seconds?: number
  completed: boolean
  step_completed: number
}

export interface SurveyAnalytics {
  id?: string
  created_at?: string
  
  // Response metrics
  total_responses: number
  completed_responses: number
  average_completion_time: number
  
  // Popular responses
  most_common_relationship: string
  average_crypto_familiarity: number
  most_popular_concepts: string[]
  most_common_success_factor: string
  
  // Demographic insights
  formerly_incarcerated_percentage: number
  family_friend_percentage: number
  advocate_percentage: number
  other_percentage: number
}

// Survey response functions
export const surveyService = {
  // Create a new survey response
  async createSurveyResponse(data: Omit<SurveyResponse, 'id' | 'created_at' | 'updated_at'>) {
    const { data: response, error } = await supabase
      .from('survey_responses')
      .insert([data])
      .select()
      .single()

    if (error) {
      console.error('Error creating survey response:', error)
      throw error
    }

    return response
  },

  // Update an existing survey response
  async updateSurveyResponse(id: string, data: Partial<SurveyResponse>) {
    const { data: response, error } = await supabase
      .from('survey_responses')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating survey response:', error)
      throw error
    }

    return response
  },

  // Get survey response by session ID
  async getSurveyBySessionId(sessionId: string) {
    const { data, error } = await supabase
      .from('survey_responses')
      .select('*')
      .eq('session_id', sessionId)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching survey response:', error)
      throw error
    }

    return data
  },

  // Get all survey responses (admin only)
  async getAllSurveyResponses(limit = 100, offset = 0) {
    const { data, error } = await supabase
      .from('survey_responses')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching survey responses:', error)
      throw error
    }

    return data
  },

  // Get survey analytics
  async getSurveyAnalytics() {
    const { data, error } = await supabase
      .from('survey_analytics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching survey analytics:', error)
      throw error
    }

    return data
  },

  // Generate survey analytics (admin function)
  async generateAnalytics() {
    const { data, error } = await supabase.rpc('generate_survey_analytics')

    if (error) {
      console.error('Error generating survey analytics:', error)
      throw error
    }

    return data
  }
}

// Utility functions
export const generateSessionId = () => {
  return `survey_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export const getClientInfo = () => {
  if (typeof window === 'undefined') return {}
  
  return {
    user_agent: navigator.userAgent,
    // Note: IP address will be handled server-side for privacy
  }
}
