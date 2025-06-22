import { createClient } from '@supabase/supabase-js'
import { getConfigSafely, hasSupabaseAdmin } from './env-validation'

// Get environment configuration safely
const envConfig = getConfigSafely()

if (!envConfig) {
  console.error('❌ Supabase configuration failed: Invalid environment variables')
  console.error('Please check your .env.local file and ensure all required variables are set.')
}

// Client for public operations (browser-safe)
export const supabase = envConfig
  ? createClient(envConfig.supabaseUrl, envConfig.supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : null

// Admin client for server-side operations (requires service role key)
export const supabaseAdmin = (envConfig && envConfig.supabaseServiceKey)
  ? createClient(envConfig.supabaseUrl, envConfig.supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null

// Helper to get the appropriate client
export const getSupabaseClient = (useAdmin = false) => {
  if (!envConfig) {
    throw new Error('Supabase not configured. Please check your environment variables.')
  }

  if (useAdmin && supabaseAdmin) {
    return supabaseAdmin
  }

  if (!supabase) {
    throw new Error('Supabase client not initialized. Please check your environment variables.')
  }

  return supabase
}

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
    try {
      const client = getSupabaseClient()
      const { data: response, error } = await client
        .from('survey_responses')
        .insert([{
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) {
        console.error('Error creating survey response:', error)
        throw new Error(`Failed to create survey response: ${error.message}`)
      }

      return response
    } catch (error) {
      console.error('Survey creation error:', error)
      throw error
    }
  },

  // Update an existing survey response
  async updateSurveyResponse(id: string, data: Partial<SurveyResponse>) {
    try {
      const client = getSupabaseClient()
      const { data: response, error } = await client
        .from('survey_responses')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating survey response:', error)
        throw new Error(`Failed to update survey response: ${error.message}`)
      }

      return response
    } catch (error) {
      console.error('Survey update error:', error)
      throw error
    }
  },

  // Get survey response by session ID
  async getSurveyBySessionId(sessionId: string) {
    try {
      const client = getSupabaseClient()
      const { data, error } = await client
        .from('survey_responses')
        .select('*')
        .eq('session_id', sessionId)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error fetching survey response:', error)
        throw new Error(`Failed to fetch survey response: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Survey fetch error:', error)
      throw error
    }
  },

  // Get all survey responses (admin only)
  async getAllSurveyResponses(limit = 100, offset = 0) {
    try {
      const client = getSupabaseClient(true) // Use admin client for this operation
      if (!client) {
        throw new Error('Admin access required. Service role key not configured.')
      }

      const { data, error } = await client
        .from('survey_responses')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        console.error('Error fetching survey responses:', error)
        throw new Error(`Failed to fetch survey responses: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Survey fetch all error:', error)
      throw error
    }
  },

  // Get survey analytics
  async getSurveyAnalytics() {
    try {
      const client = getSupabaseClient()
      const { data, error } = await client
        .from('survey_analytics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching survey analytics:', error)
        throw new Error(`Failed to fetch survey analytics: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Analytics fetch error:', error)
      throw error
    }
  },

  // Generate survey analytics (admin function)
  async generateAnalytics() {
    try {
      const client = getSupabaseClient(true) // Use admin client
      if (!client) {
        throw new Error('Admin access required. Service role key not configured.')
      }

      const { data, error } = await client.rpc('generate_survey_analytics')

      if (error) {
        console.error('Error generating survey analytics:', error)
        throw new Error(`Failed to generate survey analytics: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Analytics generation error:', error)
      throw error
    }
  },

  // Test database connection
  async testConnection() {
    try {
      const client = getSupabaseClient()
      const { data, error } = await client
        .from('survey_responses')
        .select('count(*)')
        .limit(1)

      if (error) {
        console.error('Database connection test failed:', error)
        return { success: false, error: error.message }
      }

      return { success: true, message: 'Database connection successful' }
    } catch (error) {
      console.error('Connection test error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
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
