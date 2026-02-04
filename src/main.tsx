import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'websparks-badge'
import WebSparksAnalytics from 'websparks-analytics-sdk'
import { ANALYTICS_CONFIG } from './ownanalyticsconfig'

const analytics = new WebSparksAnalytics({
  apiKey: ANALYTICS_CONFIG.VITE_ANALYTICS_API_KEY,
  projectId: ANALYTICS_CONFIG.VITE_ANALYTICS_PROJECT_ID,
  userId: ANALYTICS_CONFIG.VITE_ANALYTICS_USER_ID,
  debug: false,
  trackSessionEnd: true,
  trackLocation: true
})

window.analytics = analytics

const handleBeforeUnload = () => {
  if (window.analytics && typeof window.analytics.endSession === 'function') {
    window.analytics.endSession({
      reason: 'browser_close',
      close_method: 'tab_close'
    }).catch(() => {})
  }
}

window.addEventListener('beforeunload', handleBeforeUnload)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
