import { trackPageView, trackEvent, identifyUser } from '../../analytics'
import { ANALYTICS_CONFIG } from '../ownanalyticsconfig'

export const trackECGPageView = () => {
  trackPageView('ECG Analysis Page', {
    page_name: 'ecg_analysis',
    page_url: window.location.href,
    timestamp: Date.now()
  }).catch(() => {})
}

export const trackFileUpload = (fileName: string, fileSize: number) => {
  trackEvent('ecg_file_uploaded', {
    event_name: 'file_upload',
    file_name: fileName,
    file_size: fileSize,
    timestamp: Date.now()
  }).catch(() => {})
}

export const trackAnalysisStart = () => {
  trackEvent('analysis_started', {
    event_name: 'start_analysis',
    timestamp: Date.now()
  }).catch(() => {})
}

export const trackAnalysisComplete = (condition: string, confidence: number) => {
  trackEvent('analysis_completed', {
    event_name: 'analysis_complete',
    detected_condition: condition,
    confidence_score: confidence,
    timestamp: Date.now()
  }).catch(() => {})
}

export const identifyAnonymousUser = () => {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  identifyUser(ANALYTICS_CONFIG.VITE_ANALYTICS_USER_ID.toString(), {
    distinctId: sessionId,
    userType: 'anonymous',
    visitTime: Date.now(),
    page_url: window.location.href
  }).catch(() => {})
}
