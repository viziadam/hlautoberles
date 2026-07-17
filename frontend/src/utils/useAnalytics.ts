import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useConsent } from '@/context/ConsentContext'
import { sendPageview } from '@/utils/ga4'

export const useAnalytics = () => {
  const location = useLocation()
  const {
    analyticsAllowed,
    consentReady,
  } = useConsent()

  useEffect(() => {
    if (!consentReady || !analyticsAllowed) {
      return
    }

    sendPageview(location.pathname)
  }, [
    analyticsAllowed,
    consentReady,
    location.pathname,
  ])
}
