import env from '@/config/env.config'
import { hasAnalyticsConsent } from '@/utils/consent'

let initialized = false

type ClarityQueue = {
  (...args: unknown[]): void
  q: unknown[][]
}

const ensureClarityQueue = () => {
  if (window.clarity) {
    return
  }

  const clarity = ((...args: unknown[]) => {
    clarity.q.push(args)
  }) as ClarityQueue

  clarity.q = []
  window.clarity = clarity
}

export const updateClarityConsent = (
  analytics: boolean,
) => {
  if (!window.clarity) {
    return
  }

  window.clarity('consentv2', {
    ad_Storage: 'denied',
    analytics_Storage: analytics
      ? 'granted'
      : 'denied',
  })

  if (!analytics) {
    window.clarity('consent', false)
  }
}

export const initClarity = () => {
  if (
    initialized
    || !env.isProduction
    || !env.CLARITY_ENABLED
    || !env.CLARITY_PROJECT_ID
    || !hasAnalyticsConsent()
  ) {
    return false
  }

  ensureClarityQueue()
  updateClarityConsent(true)

  const script = document.createElement('script')
  script.id = 'clarity-script'
  script.async = true
  script.src = (
    `https://www.clarity.ms/tag/${encodeURIComponent(
      env.CLARITY_PROJECT_ID,
    )}`
  )

  document.head.appendChild(script)
  initialized = true

  return true
}
