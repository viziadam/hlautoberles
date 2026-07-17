export const CONSENT_STORAGE_KEY = 'hlautoberles-consent-v1'

export interface ConsentPreferences {
  version: 1
  necessary: true
  analytics: boolean
  updatedAt: string
}

const isConsentPreferences = (
  value: unknown,
): value is ConsentPreferences => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as Partial<ConsentPreferences>

  return (
    candidate.version === 1
    && candidate.necessary === true
    && typeof candidate.analytics === 'boolean'
    && typeof candidate.updatedAt === 'string'
  )
}

export const readConsent = (): ConsentPreferences | null => {
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY)

    if (!stored) {
      return null
    }

    const parsed = JSON.parse(stored) as unknown

    return isConsentPreferences(parsed)
      ? parsed
      : null
  } catch {
    return null
  }
}

export const writeConsent = (
  analytics: boolean,
): ConsentPreferences => {
  const consent: ConsentPreferences = {
    version: 1,
    necessary: true,
    analytics,
    updatedAt: new Date().toISOString(),
  }

  localStorage.setItem(
    CONSENT_STORAGE_KEY,
    JSON.stringify(consent),
  )

  return consent
}

export const hasAnalyticsConsent = () => (
  readConsent()?.analytics === true
)

export const applyGoogleConsent = (
  analytics: boolean,
) => {
  window.gtag?.('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

const expireCookie = (
  name: string,
  domain?: string,
) => {
  const domainPart = domain
    ? `; domain=${domain}`
    : ''

  document.cookie = (
    `${name}=; Max-Age=0; path=/${domainPart}; SameSite=Lax`
  )
}

export const clearAnalyticsCookies = () => {
  const cookieNames = document.cookie
    .split(';')
    .map((cookie) => cookie.split('=')[0]?.trim())
    .filter(Boolean)

  const analyticsCookies = cookieNames.filter((name) => (
    name === '_gid'
    || name === '_gat'
    || name.startsWith('_ga')
  ))

  for (const name of analyticsCookies) {
    expireCookie(name)
    expireCookie(name, window.location.hostname)
    expireCookie(name, `.${window.location.hostname}`)
  }
}
