// Analytics configuration and utilities

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track form submissions
export const trackFormSubmission = (formName: string) => {
  event({
    action: 'form_submit',
    category: 'engagement',
    label: formName,
  })
}

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string) => {
  event({
    action: 'button_click',
    category: 'engagement',
    label: `${buttonName} - ${location}`,
  })
}

// Track survey progress
export const trackSurveyProgress = (step: number, totalSteps: number) => {
  event({
    action: 'survey_progress',
    category: 'survey',
    label: `Step ${step} of ${totalSteps}`,
    value: Math.round((step / totalSteps) * 100),
  })
}

// Track survey completion
export const trackSurveyCompletion = () => {
  event({
    action: 'survey_complete',
    category: 'survey',
    label: 'Web3 Empowerment Survey',
  })
}

// Track page engagement time
export const trackEngagementTime = (page: string, timeInSeconds: number) => {
  event({
    action: 'engagement_time',
    category: 'engagement',
    label: page,
    value: timeInSeconds,
  })
}
