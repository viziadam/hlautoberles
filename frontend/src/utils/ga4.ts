import env from '@/config/env.config'
import { absoluteUrl } from '@/config/site.config'
import { hasAnalyticsConsent } from '@/utils/consent'

type EventParameters = Record<
  string,
  string | number | boolean | undefined | object[]
>

let initialized = false

const ensureGtag = () => {
  window.dataLayer = window.dataLayer || []

  window.gtag = window.gtag || function gtag(
    ...args: unknown[]
  ) {
    window.dataLayer.push(args)
  }
}

export const init = () => {
  if (
    initialized
    || !env.isProduction
    || !env.GOOGLE_ANALYTICS_ENABLED
    || !env.GOOGLE_ANALYTICS_ID
    || !hasAnalyticsConsent()
  ) {
    return false
  }

  ensureGtag()

  if (!document.getElementById('ga4-script')) {
    const script = document.createElement('script')
    script.id = 'ga4-script'
    script.async = true
    script.src = (
      'https://www.googletagmanager.com/gtag/js?id='
      + encodeURIComponent(env.GOOGLE_ANALYTICS_ID)
    )

    document.head.appendChild(script)
  }

  window.gtag('js', new Date())
  window.gtag('config', env.GOOGLE_ANALYTICS_ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  })

  initialized = true
  return true
}

export const sendEvent = (
  name: string,
  parameters: EventParameters = {},
) => {
  if (!hasAnalyticsConsent()) {
    return false
  }

  if (!initialized && !init()) {
    return false
  }

  window.gtag('event', name, parameters)
  return true
}

export const sendPageview = (path: string) => (
  sendEvent('page_view', {
    page_path: path,
    page_location: absoluteUrl(path),
  })
)
