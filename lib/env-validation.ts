/**
 * Environment Variable Validation for FormerlyIncarcerated.org
 * 
 * This module validates and provides type-safe access to environment variables
 */

interface EnvironmentConfig {
  // Supabase Configuration
  supabaseUrl: string
  supabaseAnonKey: string
  supabaseServiceKey?: string
  
  // Site Configuration
  siteUrl: string
  nodeEnv: string
  
  // Optional Analytics
  gaId?: string
  
  // Optional Email Configuration
  smtpHost?: string
  smtpPort?: number
  smtpUser?: string
  smtpPass?: string
}

class EnvironmentValidator {
  private config: EnvironmentConfig | null = null
  private errors: string[] = []

  constructor() {
    this.validate()
  }

  private validate(): void {
    this.errors = []

    // Required Supabase variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl) {
      this.errors.push('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL')
    }
    
    if (!supabaseAnonKey) {
      this.errors.push('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')
    }

    // Validate URL format
    if (supabaseUrl && !this.isValidUrl(supabaseUrl)) {
      this.errors.push('SUPABASE_URL must be a valid URL')
    }

    // Site configuration
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://formerlyincarcerated.org'
    const nodeEnv = process.env.NODE_ENV || 'development'

    // Optional variables
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const gaId = process.env.NEXT_PUBLIC_GA_ID
    
    // Email configuration (all optional)
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS

    // Validate SMTP port if provided
    if (process.env.SMTP_PORT && (isNaN(smtpPort!) || smtpPort! < 1 || smtpPort! > 65535)) {
      this.errors.push('SMTP_PORT must be a valid port number (1-65535)')
    }

    if (this.errors.length === 0) {
      this.config = {
        supabaseUrl: supabaseUrl!,
        supabaseAnonKey: supabaseAnonKey!,
        supabaseServiceKey,
        siteUrl,
        nodeEnv,
        gaId,
        smtpHost,
        smtpPort,
        smtpUser,
        smtpPass
      }
    }
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  public getConfig(): EnvironmentConfig {
    if (this.errors.length > 0) {
      throw new Error(`Environment validation failed:\n${this.errors.join('\n')}`)
    }
    
    if (!this.config) {
      throw new Error('Environment configuration not initialized')
    }
    
    return this.config
  }

  public getErrors(): string[] {
    return [...this.errors]
  }

  public isValid(): boolean {
    return this.errors.length === 0
  }

  public hasSupabaseAdmin(): boolean {
    return this.isValid() && !!this.config?.supabaseServiceKey
  }

  public hasEmailConfig(): boolean {
    if (!this.isValid() || !this.config) return false
    
    return !!(
      this.config.smtpHost &&
      this.config.smtpPort &&
      this.config.smtpUser &&
      this.config.smtpPass
    )
  }

  public hasAnalytics(): boolean {
    return this.isValid() && !!this.config?.gaId
  }

  public isDevelopment(): boolean {
    return this.isValid() && this.config?.nodeEnv === 'development'
  }

  public isProduction(): boolean {
    return this.isValid() && this.config?.nodeEnv === 'production'
  }
}

// Create singleton instance
const envValidator = new EnvironmentValidator()

// Export validation functions
export const validateEnvironment = () => envValidator.getConfig()
export const getEnvironmentErrors = () => envValidator.getErrors()
export const isEnvironmentValid = () => envValidator.isValid()
export const hasSupabaseAdmin = () => envValidator.hasSupabaseAdmin()
export const hasEmailConfig = () => envValidator.hasEmailConfig()
export const hasAnalytics = () => envValidator.hasAnalytics()
export const isDevelopment = () => envValidator.isDevelopment()
export const isProduction = () => envValidator.isProduction()

// Export the config for direct access (throws if invalid)
export const env = envValidator.getConfig()

// Helper function for graceful degradation
export const getConfigSafely = (): EnvironmentConfig | null => {
  try {
    return envValidator.getConfig()
  } catch {
    return null
  }
}

// Development helper to log configuration status
if (typeof window === 'undefined' && envValidator.isDevelopment()) {
  console.log('🔧 Environment Configuration Status:')
  console.log(`   ✅ Supabase URL: ${envValidator.isValid() ? 'Configured' : 'Missing'}`)
  console.log(`   ✅ Supabase Anon Key: ${envValidator.isValid() ? 'Configured' : 'Missing'}`)
  console.log(`   ${envValidator.hasSupabaseAdmin() ? '✅' : '⚠️ '} Supabase Admin: ${envValidator.hasSupabaseAdmin() ? 'Configured' : 'Not configured'}`)
  console.log(`   ${envValidator.hasEmailConfig() ? '✅' : '⚠️ '} Email Config: ${envValidator.hasEmailConfig() ? 'Configured' : 'Not configured'}`)
  console.log(`   ${envValidator.hasAnalytics() ? '✅' : '⚠️ '} Analytics: ${envValidator.hasAnalytics() ? 'Configured' : 'Not configured'}`)
  
  if (!envValidator.isValid()) {
    console.error('❌ Environment validation errors:')
    envValidator.getErrors().forEach(error => console.error(`   - ${error}`))
  }
}
